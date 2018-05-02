const app = require('./app');
const port = {
  http: process.env.PORT || 3000,
  https: process.env.httpsPORT || 5443,
}
// HTTP server
// ========================================================
const httpServer = app.listen(port.http, function() {
  console.log('HTTP server listening on port ' + port.http);
});


// HTTPS server 
// ========================================================
const https = require('https');
const fs = require("fs");
const privateKey = fs.readFileSync('sslcert/key.pem', 'utf8');
const certificate = fs.readFileSync('sslcert/server.crt', 'utf8');
const credentials = { key: privateKey, cert: certificate };

const httpsServer = https.createServer(credentials, app).listen(port.https, () => {
  console.log("HTTPS server listening on port " + port.https);
})