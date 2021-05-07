document.querySelector("#start_chat").addEventListener("click", (event) => {
    // method that return websocket server infos
    const socket = io();

    // HTML DOM
    const chat_help = document.getElementById('chat_help');
    chat_help.style.display = 'none';
    
    const chat_in_support = document.getElementById('chat_in_support');
    chat_in_support.style.display = 'block';
    
    const email = document.getElementById('email').value;
    const text = document.getElementById('txt_help').value;
    // END HTML DOM

    socket.on('connect', () => {
        const params = {
            email, 
            text
        }
        socket.emit('client_first_access', params, (call, err) => {
            if(err) {
                console.log(err);
            } else {
                console.log(call);
            }
        })
    });

    socket.on('client_list_all_messages', messages => {
        // console.log(messages)
        let template_client = document.getElementById('message-user-template').innerHTML;
        let template_admin = document.getElementById('admin-template').innerHTML;

        messages.forEach( message => {
            if(message.admin_id === null) {
                const rendered = Mustache.render(template_client, {
                    message: message.text,
                    email
                })

                document.getElementById('messages').innerHTML += rendered;
            }
        })
    })
});
