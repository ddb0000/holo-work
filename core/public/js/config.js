(function () {
  const h = location.hostname;
  let api;

  if (location.search.includes('local=1')) {
    api = 'http://localhost:8787';
  } else if (h.endsWith('.pages.dev') || h.endsWith('holo-work.com')) {
    api = '';
  } else {
    api = 'https://holo-work.dbarcelloz.workers.dev';
  }

  window.__CONFIG__ = { API_BASE: api };
})();
