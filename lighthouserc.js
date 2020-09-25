const routers = [
  '/docs/introduce/en'
]

module.exports = {
  ci: {
    collect: {
      url:routers.filter(r => /en$/.test(r)).map(r => `http://localhost:8080${r}/`),
      startServerCommand: 'http-server dist -a localhost',
    },
    assert: {
      preset: 'lighthouse:recommended'
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};
