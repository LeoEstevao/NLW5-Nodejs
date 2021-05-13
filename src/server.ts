import { http } from './http';
import './websocket/client';
import './websocket/admin';

// This will run both app/http and io/websocket server
http.listen(8080, () => {
// app.listen(8080, () => {
    console.log('Server running');
});