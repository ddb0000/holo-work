// worker/src/assets.ts
import type { HandlerContext } from './types'

// tiny helpers

// always return a real ArrayBuffer (not SharedArrayBuffer)
const toAB = (u8: Uint8Array): ArrayBuffer => {
  const ab = new ArrayBuffer(u8.byteLength)
  new Uint8Array(ab).set(u8)
  return ab
}

const crc32 = (bytes: Uint8Array) => {
  let c = ~0 >>> 0
  for (let i = 0; i < bytes.length; i++) {
    c ^= bytes[i]
    for (let k = 0; k < 8; k++) c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) >>> 0 : (c >>> 1) >>> 0
  }
  return (~c) >>> 0
}
const u32 = (v: number) => new Uint8Array([ (v>>>24)&255, (v>>>16)&255, (v>>>8)&255, v&255 ])
const chunk = (type: string, data: Uint8Array) => {
  const out = new Uint8Array(8 + 4 + data.length + 4)
  out.set(u32(data.length), 0)
  out.set(new TextEncoder().encode(type), 4)
  out.set(data, 8)
  out.set(u32(crc32(out.subarray(4, 8 + data.length))), 8 + data.length)
  return out
}
async function deflate(raw: Uint8Array) {
  const cs = new CompressionStream('deflate')
  const ab = toAB(raw)
  const s = new Blob([ab]).stream().pipeThrough(cs)
  const out = new Uint8Array(await new Response(s).arrayBuffer())
  return out
}

async function encodePNG(rgba: Uint8ClampedArray, w: number, h: number): Promise<Uint8Array> {
  // scanlines with filter 0
  const scan = new Uint8Array((w*4 + 1) * h)
  for (let y=0; y<h; y++){
    scan[(w*4+1)*y] = 0
    scan.set(rgba.subarray(y*w*4, (y+1)*w*4), (w*4+1)*y + 1)
  }
  const sig = new Uint8Array([137,80,78,71,13,10,26,10])
  const ihdr = new Uint8Array(13)
  ihdr.set(u32(w), 0)
  ihdr.set(u32(h), 4)
  ihdr[8] = 8   // bit depth
  ihdr[9] = 6   // color type RGBA
  ihdr[10] = 0  // compression
  ihdr[11] = 0  // filter
  ihdr[12] = 0  // interlace
  const idat = await deflate(scan)
  const iend = new Uint8Array(0)

  const parts = [sig, chunk('IHDR', ihdr), chunk('IDAT', idat), chunk('IEND', iend)]
  const total = parts.reduce((n,p)=>n+p.length,0)
  const png = new Uint8Array(total)
  let off=0; for (const p of parts){ png.set(p, off); off+=p.length }
  return png
}

export async function handleAvatar({ request, env }: HandlerContext): Promise<Response> {
  const u = new URL(request.url)
  const seed = u.searchParams.get('seed') || 'anon'
  const s = Math.min(parseInt(u.searchParams.get('s')||'128',10), 512)
  const key = `asset:avatar:${seed}:${s}`

  const hit = await env.KV.get(key, 'arrayBuffer')
  if (hit) return new Response(hit, { headers:{'content-type':'image/png','cache-control':'public, max-age=2592000'} })

  const b = new TextEncoder().encode(seed)
  let h = 2166136261 >>> 0; for (const x of b){ h ^= x; h = (h>>>0)*16777619>>>0 }
  const fg = [h&255, (h>>>8)&255, (h>>>16)&255, 255]
  const bg = [0,0,0,0]
  const px = 5, scale = Math.max(1, Math.floor(s/px))
  const w = px*scale, hh = px*scale
  const buf = new Uint8ClampedArray(w*hh*4)

  for (let y=0;y<px;y++){
    for (let x=0;x<px;x++){
      const on = (((h>>>((x%4)*3)) & 7) > 2)  // deterministic-ish
      const xx = x<=2? x : 4-x
      for (let yy=0; yy<scale; yy++){
        for (let xx2=0; xx2<scale; xx2++){
          const i = ((y*scale+yy)*w + (xx*scale+xx2))*4
          const col = on ? fg : bg
          buf[i]=col[0]; buf[i+1]=col[1]; buf[i+2]=col[2]; buf[i+3]=col[3]
        }
      }
    }
  }

  const png = await encodePNG(buf, w, hh)
  // after building `png: Uint8Array`
  const pngAb = toAB(png)

  // cache
  await env.KV.put(key, pngAb, { expirationTtl: 60*60*24*30 })

  // return
  return new Response(pngAb, { headers: { 'content-type': 'image/png' } })

}

// procedural tile: seed-based 8x8 pixel pattern
export const handleTile = async ({ request, env }: HandlerContext) => {
  const u = new URL(request.url)
  const seed = u.searchParams.get('seed') || 'default'
  const s = Math.min(parseInt(u.searchParams.get('s')||'64',10), 256)
  const key = `asset:tile:${seed}:${s}`

  const cached = await env.KV.get(key, 'arrayBuffer')
  if (cached) return new Response(cached, { headers:{'content-type':'image/png','cache-control':'public, max-age=2592000'} })

  // 8x8 deterministic pattern
  const te = new TextEncoder()
  const bytes = te.encode(seed)
  let h = 2166136261 >>> 0
  for (const b of bytes) { h ^= b; h = Math.imul(h, 16777619) >>> 0 }

  const grid = Array.from({length:64}, (_,i)=> ((h>>((i%6))) & 7) > 3)
  const fg = [h&255, (h>>8)&255, (h>>16)&255, 255]
  const bg = [255, 255, 255, 255]

  const px = 8, scale = Math.max(1, Math.floor(s/px))
  const w = px*scale, hgt = px*scale
  const buf = new Uint8ClampedArray(w*hgt*4)

  for (let y=0;y<px;y++){
    for (let x=0;x<px;x++){
      const col = grid[y*8 + x] ? fg : bg
      for (let yy=0; yy<scale; yy++){
        for (let xx2=0; xx2<scale; xx2++){
          const i = ((y*scale+yy)*w + (x*scale+xx2))*4
          buf[i]=col[0]; buf[i+1]=col[1]; buf[i+2]=col[2]; buf[i+3]=col[3]
        }
      }
    }
  }

  const png = await encodePNG(buf, w, hgt)
  const ab = toAB(png)
  await env.KV.put(key, ab, { expirationTtl: 60*60*24*30 })
  return new Response(ab, { headers:{'content-type':'image/png'} })
}

// sprite atlas: combine multiple 5x5 avatars into single atlas
export const handleAtlas = async ({ request, env }: HandlerContext) => {
  const u = new URL(request.url)
  const seeds = (u.searchParams.get('seeds') || 'a,b,c,d').split(',').slice(0, 16)
  const s = Math.min(parseInt(u.searchParams.get('s')||'64',10), 256)
  const key = `asset:atlas:${seeds.join('-')}:${s}`

  const cached = await env.KV.get(key, 'arrayBuffer')
  if (cached) return new Response(cached, { headers:{'content-type':'image/png','cache-control':'public, max-age=2592000'} })

  const cols = Math.ceil(Math.sqrt(seeds.length))
  const rows = Math.ceil(seeds.length / cols)
  const tileSize = Math.max(1, Math.floor(s / cols))
  const w = cols * tileSize
  const hgt = rows * tileSize
  const buf = new Uint8ClampedArray(w*hgt*4)

  for (let idx = 0; idx < seeds.length; idx++) {
    const seed = seeds[idx]
    const te = new TextEncoder()
    const bytes = te.encode(seed)
    let h = 2166136261 >>> 0
    for (const b of bytes) { h ^= b; h = Math.imul(h, 16777619) >>> 0 }

    const row = Math.floor(idx / cols)
    const col = idx % cols
    const baseX = col * tileSize
    const baseY = row * tileSize

    const fg = [h&255, (h>>8)&255, (h>>16)&255, 255]
    const bg = [0,0,0,0]

    // 5x5 per tile
    for (let y=0;y<5;y++){
      for (let x=0;x<5;x++){
        const xx = x<=2? x : 4-x
        const on = (((h>>>((x%4)*3)) & 7) > 2)
        const col_color = on ? fg : bg
        const scaleFactor = Math.max(1, tileSize / 5)
        for (let yy=0; yy<scaleFactor; yy++){
          for (let xx2=0; xx2<scaleFactor; xx2++){
            const px = baseX + (xx*scaleFactor + xx2)
            const py = baseY + (y*scaleFactor + yy)
            if (px < w && py < hgt) {
              const i = (py*w + px)*4
              buf[i]=col_color[0]; buf[i+1]=col_color[1]; buf[i+2]=col_color[2]; buf[i+3]=col_color[3]
            }
          }
        }
      }
    }
  }

  const png = await encodePNG(buf, w, hgt)
  const ab = toAB(png)
  await env.KV.put(key, ab, { expirationTtl: 60*60*24*30 })
  return new Response(ab, { headers:{'content-type':'image/png'} })
}
