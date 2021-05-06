import { http } from './http';
import './websocket/client';

// This will run both app/http and io/websocket server
http.listen(8080, () => {
// app.listen(8080, () => {
    console.log('Server running');
});