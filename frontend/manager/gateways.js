import io from 'socket.io-client';
import {SOCKET_URL} from '../../env';
import {fetchGateways} from './dataContainer';
import {showSuccessNotification} from '../utils';

fetchGateways("/gateway/json/list/gateways");

let socket = io(SOCKET_URL);
let email, lastPing = {};

socket.on('connect', function(){
    console.log('Socket connected');
    document.getElementById('check-connection').querySelector('i').classList.add('connected');
    document.getElementById('check-connection').querySelector('i').classList.remove('disconnected');
})

socket.on('disconnect', function(){
    console.log('Socket disconnect');
    document.getElementById('check-connection').querySelector('i').classList.remove('connected');
    document.getElementById('check-connection').querySelector('i').classList.add('disconnected');
})

socket.on('status', function(msg){
    let {gatewayId, state} = msg;

    lastPing[gatewayId] = Date.now();
    document.getElementById(gatewayId).value = state;
    if (state === 'ERROR'){
        document.getElementById(gatewayId).style.color = 'red';
    }else{
        document.getElementById(gatewayId).style.color = 'green';
    }

    if (state === 'ON UPDATE'){
        showSuccessNotification("Update Gateway Config Success.", 200);
    }else if (state === 'ON RESET'){
        showSuccessNotification("Reset Gateway Success.", 200);
    }
})


let interId = setInterval(function(){
    if (window.sessionUser){
        email = window.sessionUser.email;
        socket.emit('registerRoom', {'roomId': email, 'isBrowser': true});
        clearInterval(interId);
    }
}, 1000)

setInterval(function(){
    for (let gatewayId in lastPing){
        if (!lastPing[gatewayId] || Date.now() - lastPing[gatewayId] > 10000){
            document.getElementById(gatewayId).value = 'OFFLINE';
            document.getElementById(gatewayId).style.color = 'black';
        }
    }
}, 15000)

window.resetGateway = function(gatewayId){
    socket.emit('control', {'command': 'reset', 'gatewayId': gatewayId});
}

window.forceGatewayUpdate = function(gatewayId){
    socket.emit('control', {'command': 'forceUpdate', 'gatewayId': gatewayId});
}



