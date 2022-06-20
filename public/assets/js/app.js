const socket = io();

// DOM elements
let messages = document.getElementById('messages');
let username = document.getElementById('username');
let btn_send = document.getElementById('btn_send');
let output = document.getElementById('output');
let actions = document.getElementById('actions');


btn_send.addEventListener('click',function(){   

    socket.emit('chat:message',{
        username: username.value ,
        messages: messages.value
    });
    
});

messages.addEventListener('keypress',function(){
    socket.emit('chat:typing', username.value );
});


socket.on('chat:message',(data)=>{
    output.innerHTML += `<p>
        <strong>${data.username} :</strong> ${data.messages}
    </p>`;
});

socket.on('chat:typing',(data)=>{
    actions.innerHTML = `<p>
        <strong>${data}  is typing a meesage</strong>
    </p>`;
});

