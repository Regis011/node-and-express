import express from "express";
import morgan from 'morgan';
import ConsultRoute from "./routes/ConsultRoute";
import _ from "lodash";
import bodyParser from "body-parser";
import path from "path";
import https from 'https';
import fs from 'fs';
import config from './config/config.js';
import ConsultModel from './config/database.js';

const tlsOptions = {
  key: fs.readFileSync(path.join('key.pem')),
  cert: fs.readFileSync(path.join('cert.pem')),
  passphrase: 'hello'
};

const server = express();

server.use(morgan('tiny'));
server.use(bodyParser.json());
server.use('/static', express.static('public'));

// Views
server.set('views', path.join('views'));
server.set('view engine', 'ejs');

server.use(config.CONSULTS_BASE_URL, ConsultRoute);

server.get('/', (req, res) => {
  ConsultModel.find((err, consults) => {
    if(err) res.status(500).send(err);
    res.render('index', {
      consults: consults
    })
  });
});

server.get('/download/images/:imageName', (req, res) => {
  res.download(path.join('public', 'images', req.params.imageName));
});

server.get(`/route-handlers`, (req, res, next) => {
  // beginnig of route handlers
  // ...
  // ... everyting before response is sent to client is a middleware
  //
  res.send("Route");
  next();
}, (req, res, next) => {
  console.log(`sencond hasdlers`);
  next();
}, (req, res) => {
  console.log(`third hasdlers`);
});

server.listen(config.PORT, () => {
  console.log(`server started on port ${config.PORT}`);
});

https.createServer(tlsOptions, server).listen(config.TLS_PORT, () => {
  console.log(`HTTPS server started on port ${config.TLS_PORT}`);
});
