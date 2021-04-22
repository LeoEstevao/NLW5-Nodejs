import express from 'express';

import './database/index';
import { routes } from './routes';
const app = express();

app.use(express.json());

app.use(routes);


app.get('/', (req, res) => {
    res.send('Rota funcionando');
})

app.post('/users', (req, res) => {
    res.json({message: 'Rota User funcionando'});
})
app.listen(8080, () => {
    console.log('Server running');
});
