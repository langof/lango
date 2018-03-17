const withTypescript = require('@zeit/next-typescript')
module.exports = withTypescript({
  exportPathMap: () => ({
    '/': { page: '/' },
    '/about': { page: '/about' }
  })
})
