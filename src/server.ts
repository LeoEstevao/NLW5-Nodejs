import express from 'express';
import './database/index';

const app = express();

app.listen(8080, () => {
    console.log('Server running');
});

app.get('/', (req, res) => {
    res.send('Rota funcionando');
})

app.post('/users', (req, res) => {
    res.json({message: 'Rota User funcionando'});
})