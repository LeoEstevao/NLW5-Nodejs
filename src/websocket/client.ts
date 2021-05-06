import { io } from '../http';
import { ConnectionsService } from '../services/ConnectionsService';
import { UsersService } from '../services/UsersService';
import { MessagesService } from '../services/MessagesService';

interface IParams {
    text: string;
    email: string;
}

io.on('connect', (socket) => {
    const connectionsService = new ConnectionsService();
    const usersService = new UsersService();
    const messagesService = new MessagesService();
    
    // on = create
    socket.on('client_first_access', async (params) => {
        const socket_id = socket.id;
        const { text, email } = params as IParams;
        let user_id = null;

        
        const userExists = await usersService.findByEmail(email);

        if(!userExists) {
            const user = await usersService.create(email);
            user_id = user.id;

            await connectionsService.create({
                socket_id,
                user_id
            })


        } else {
            user_id = userExists.id;
            
            const connection = await connectionsService.findUserById(userExists.id);

            if(!connection) {
                await connectionsService.create({
                    socket_id,
                    user_id
                });
            } else {
                connection.socket_id = socket_id;
                await connectionsService.create(connection);
            }

        }

        console.log(params);
        await messagesService.create({
            text,
            user_id
        })

    });

});