const withTypescript = require('@zeit/next-typescript')
module.exports = withTypescript({
  exportPathMap: () => ({
    '/': { page: '/' },
    '/admin': { page: '/admin' },
    '/event': { page: '/event' },
  })
})
