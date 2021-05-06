import express from 'express';
// websocket
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import path from 'path';

import './database/index';
import { routes } from './routes';

const app = express();


// websocket
// Creating http protocol
const http = createServer(app);
// Creating ws protocol
const io = new Server(http);

io.on('connection', (socket: Socket) => {
    // console.log('se conectou', socket.id);
})

// html render
app.use(express.static(path.join(__dirname, '..', 'public')));
app.set('views', path.join(__dirname, '..', 'public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.get('/pages/client', (req, res) => {
    res.render('html/client.html');
})


app.use(express.json());

app.use(routes);


app.get('/', (req, res) => {
    res.send('Rota funcionando');
})

app.post('/users', (req, res) => {
    res.json({message: 'Rota User funcionando'});
})

export { http, io };