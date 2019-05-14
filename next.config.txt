/*
//Object {useFileSystemPublicRoutes: false} will be created as module.exports ref.
module.exports = {
  useFileSystemPublicRoutes: false
}
*/
/*
// Without CSS modules
const withCSS = require('@zeit/next-css')
const zzz = withCSS() // Object {webpack: } created as module.exports ref.
zzz.target = 'serverless' //NB!!! Add property .target to Object {webpack: } only when using deployment with now.
module.exports = zzz
*/

/*
// Without CSS modules
const withCSS = require('@zeit/next-css')
module.exports = withCSS()
*/

//You can also pass a list of options to the css-loader by passing an object called cssLoaderOptions.
// For a list of supported options, refer to the webpack css-loader README.
//https://github.com/webpack-contrib/css-loader#options
/*
// With CSS modules
const withCSS = require('@zeit/next-css')
module.exports = withCSS({
  cssModules: true,
  cssLoaderOptions: {
    importLoaders: 1,
    localIdentName: "[local]___[hash:base64:5]",
  }})
*/

/*
module.exports = {
  target: 'serverless'
}
//*/