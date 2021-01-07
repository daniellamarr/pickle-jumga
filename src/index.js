import express from 'express';
import bodyParser from 'body-parser';

const server = express();

server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

server.use('', (req, res) => res.send({
  message: 'Welcome to pickle-jumga'
}));

const port = process.env.PORT || 1900;

server.listen(port);

export default server;
