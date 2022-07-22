import http from 'http';
//const http = require('http');
import app from './app.js';
const PORT = process.env.PORT || 9000;

const server = http.createServer(app);

server.listen(PORT);