const express = require('express');
const path = require('path');
const https = require('https');
const fs = require('fs');
const httpsRedirect = require('express-https-redirect');
const superagent = require('superagent');
const bodyParser = require('body-parser');

const key = fs.readFileSync(path.join(__dirname, 'selfsigned.key'));
const cert = fs.readFileSync(path.join(__dirname, 'selfsigned.crt'));
const options = {
  key: key,
  cert: cert
};


const app = express();
const port = 3000;

// app.use (function (req, res, next) {
//   if (req.secure) {
//     // request was via https, so do no special handling
//     next();
//   } else {
//     // request was via http, so redirect to https
//     res.redirect('https://' + req.headers.host + req.url);
//   }
// });
app.use('/', httpsRedirect(true));
app.use(bodyParser.json());
app.use('/', express.static(path.join(__dirname, 'static_files')));

app.get('/cors_bypass', (req, res) => {
  // console.log(JSON.stringify(req.body));
  // console.log(req.content);
  // Object.keys(req).forEach((k) => {
  //   try{
  //     console.log(k + ',' + JSON.stringify(req[k]) + '\n');
  //   }catch(error){
  //     console.log(k);
  //   }
    
  // });
  console.log(JSON.stringify(req.query));
  superagent.get(req.query.url)
            .then((cors_res) => {
              res.send(cors_res.body);
              res.end()     
            })
            .catch(err => {
              res.sendStatus(500);
              res.end();
            })
})

// app.listen(port, () => console.log(`Example app listening on port ${port}!`))
// https.createServer(options, app).listen(port);
const server = https.createServer(options, app);
server.listen(port, () => {
  console.log("server starting on port : " + port)
});
