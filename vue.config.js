const path = require('path')

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  css: {
    requireModuleExtension: true,
  },
  chainWebpack: (config) => {
    config.resolve.alias.set('@three', resolve('src/assets/threejs'))
  },
}
