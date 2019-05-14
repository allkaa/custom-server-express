'use strict';
// This file doesn't go through babel or webpack transformation.
// Make sure the syntax and sources this file requires are compatible with the current node version you are running
// See https://github.com/zeit/next.js/issues/1245 for discussions on Universal Webpack or universal Babel
//const { createServer } = require('http')
const http = require('http');
//process.env.NODE_ENV = 'production'; // Set production environment!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
const dev = process.env.NODE_ENV !== 'production'
if (dev === true) console.log("Development next environment.")
else console.log('Production next environmenet.')
const next = require('next')
/*
The next API is as follows:
next(object_with_opts)
Supported options:
dev (bool) whether to launch Next.js in dev mode - default false
dir (string) where the Next project is located - default '.'
quiet (bool) Hide error messages containing server information - default false
conf (object) the same object you would use in next.config.js - default {}
*/
//const useFileSystemPublicRoutes = false // Disable file-system routing - prevent routing based on files in /pages subdir.
//const ttt = {dev, useFileSystemPublicRoutes} // Object {dev: false, useFileSystemPublicRoutes: false}
//const app = next({ dev, useFileSystemPublicRoutes })
const app = next({ dev })
const handle = app.getRequestHandler()
const { parse } = require('url')

// http://localhost:8081
const hostname = 'localhost';
//const port = process.env.PORT; //  Windows - default port is 1337 for WebApp and 1542 for ConsoleApp;
const port = 3000; // e.g. 8081 for Linux must be set manually;

let dtVar;
dtVar = new Date();
console.log('Begin httpServer main progam script path ' + dtVar.getMinutes() + "." + dtVar.getSeconds() + "." + dtVar.getMilliseconds());

const server = http.createServer();
dtVar = new Date();
console.log('After http.createServer ' + dtVar.getMinutes() + "." + dtVar.getSeconds() + "." + dtVar.getMilliseconds());
server.on('error', (err) => {
  dtVar = new Date();
  //throw err;
  console.log(`httpServer 'error' event - error code:` + " ==> " + dtVar.getMinutes() + "." + dtVar.getSeconds() + "." + dtVar.getMilliseconds());
  console.log(err.code);
  console.log('httpServer error stack:');
  console.log(err.stack);
});
// Begin accepting connections on the specified port and hostname.
// If hostname is omitted, server will accept connections on the unspecified IPv6 address (::) when IPv6 is available,
// or the unspecified IPv4 address (0.0.0.0) otherwise.
// NB! Real listening will start after main program script end!!!!!!!
server.listen(port, hostname, () => {
  // Place holders in template literals are indicated by the $ (Dollar sign) and curly braces e.g. (${expression}).
  console.log(`Server running and listening at https://${hostname}:${port}/ ` + dtVar.getMinutes() + "." + dtVar.getSeconds() + "." + dtVar.getMilliseconds()); // ${expression} is place holders in template literal enclosed by the back-tick (` `) (grave accent) characters.
});

dtVar = new Date();
console.log('Begin app (nextjs) preparing ' + dtVar.getMinutes() + "." + dtVar.getSeconds() + "." + dtVar.getMilliseconds());
app.prepare().then(() => {
  // Promise from next .prepare:
  server.on('request', (req, res) => { // request is <http.IncomingMessage>, response is <http.ServerResponse>
    dtVar = new Date();
    console.log(`httpServer request at:` + " ==> " + dtVar.getMinutes() + "." + dtVar.getSeconds() + "." + dtVar.getMilliseconds());
    //console.log(req.url)
    req.on('error', (err) => {
      // This prints the error message and stack trace to `stderr`.
      console.log(`httpServer request 'error' event - error stack:` + " ==> " + dtVar.getMinutes() + "." + dtVar.getSeconds() + "." + dtVar.getMilliseconds());
      console.error(err.stack);
    });
    res.on('error', (err) => {
      console.log(`httpServer response 'error' event - error code:` + " ==> " + dtVar.getMinutes() + "." + dtVar.getSeconds() + "." + dtVar.getMilliseconds());
      console.error(err);
    });
    // Be sure to pass `true` as the second argument to `url.parse`- to parse the query portion of the URL.
    const parsedUrl = parse(req.url, true)
    const { pathname, query } = parsedUrl
    console.log("req.url ===> " + req.url)
    if (pathname === '/a') {
      app.render(req, res, '/b', query)
    } else if (pathname === '/b') {
      app.render(req, res, '/a', query)
    } else {
      handle(req, res, parsedUrl)
    }
  }) // end of server.on('request'...)
}) // end of app.prepare
dtVar = new Date();
console.log('End app (nextjs) preparing ' + dtVar.getMinutes() + "." + dtVar.getSeconds() + "." + dtVar.getMilliseconds());

dtVar = new Date();
console.log('End httpServer main PROGAM script path after server.listen(port, hostname, callback) initiated ' + dtVar.getMinutes() + "." + dtVar.getSeconds() + "." + dtVar.getMilliseconds());
