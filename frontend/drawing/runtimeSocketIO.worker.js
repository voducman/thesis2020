import io from 'socket.io-client';
const socket = io('http://localhost:3000');

socket.on('connect', function () {
    postMessage({'command': 'connect', 'message': null});
 })
 
 socket.on('disconnect', function(reason){
    postMessage({'command': 'disconnect', 'message': null});
 })
 
 socket.on('registerRoom', function(msg){
    postMessage({'command': 'registerRoom', 'message': msg});
 })

 socket.on('outRoom', function(msg){
    postMessage({'command': 'outRoom', 'message': msg});
})


onmessage = function(e){
    let command = e.data.command;
    let message = e.data.message;

    if (command === 'registerRoom'){
        socket.emit('registerRoom', message);
    }

    if (command === 'outRoom'){
        socket.emit('outRoom', message);
    }

    if (command === 'off'){
        socket.off(message);
    }

    if (command === 'read'){
        socket.on('read', function(tags){
            postMessage({'command': 'read', 'message': tags});
        })
    }

    if (command === 'write'){
        socket.emit('write', message);
    }
}

