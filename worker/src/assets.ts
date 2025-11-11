// worker/src/assets.ts
export const routes = (app: any) => {
  app.get('/api/assets/avatar', async (c: any) => {
    const seed = (c.req.query('seed') || 'seed').toString()
    const s = Math.min(1024, Math.max(16, parseInt(c.req.query('s') || '128')))
    let h = 2166136261
    for (let i=0;i<seed.length;i++) { h ^= seed.charCodeAt(i); h += (h<<1)+(h<<4)+(h<<7)+(h<<8)+(h<<24) }
    const rnd = () => { h ^= h<<13; h ^= h>>>17; h ^= h<<5; return ((h>>>0)%1000)/1000 }
    const n = 8, px = Math.floor(s/n)
    const palette = ['#0d0d0d','#f5f5f5',`hsl(${Math.floor(rnd()*360)} 70% 55%)`, `hsl(${Math.floor(rnd()*360)} 70% 45%)`]
    let cells = ''
    for (let y=0;y<n;y++){
      for (let x=0;x<Math.ceil(n/2);x++){
        const v = rnd()
        const cidx = v<0.15?0: v<0.3?1: v<0.65?2:3
        const col = palette[cidx]
        const xx = x*px, xx2 = (n-1-x)*px, yy=y*px
        cells += `<rect x="${xx}" y="${yy}" width="${px}" height="${px}" fill="${col}"/>`
        if (x!==n-1-x) cells += `<rect x="${xx2}" y="${yy}" width="${px}" height="${px}" fill="${col}"/>`
      }
    }
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${s}" height="${s}" shape-rendering="crispEdges" viewBox="0 0 ${s} ${s}"><rect width="100%" height="100%" fill="#111"/>${cells}</svg>`
    return new Response(svg, {headers:{'content-type':'image/svg+xml','cache-control':'public, max-age=604800'}})
  })
}
