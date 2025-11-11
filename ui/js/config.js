(function(){
  const h = location.hostname
  let api
  
  // local dev override
  if (location.search.includes('local=1')) {
    api = 'http://localhost:8787'
  }
  // any pages domain → use workers.dev for now (DNS not set up yet)
  else if (h.includes('pages.dev') || h.includes('pages')) {
    api = 'https://holo-work.dbarcelloz.workers.dev'
  }
  // fallback
  else {
    api = 'https://holo-work.dbarcelloz.workers.dev'
  }
  
  window.__CONFIG__ = { API_BASE: api }
})()
