import io       from 'socket.io-client';
import moment   from'moment';
import {SOCKET_URL} from '../../env';


const socket = io(SOCKET_URL);

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

socket.on('alarm', function(alarms){
    postMessage({'command': 'alarm', 'message': alarms});
})

socket.on('log', function(msg){
    postMessage({'command': 'log', 'message': msg});
})

socket.on('exportLog', function(logs){
    let listLogs = [];
    if (Array.isArray(logs)){
        for (let i=0; i<logs.length; i++){
            listLogs.push('\n' + logs[i].log);
        }

        postMessage({'command': 'exportLog', 'message': listLogs});
    }
})


onmessage = function(e){
    let command = e.data.command;
    let message = e.data.message;

    if (command === 'registerRoom'){
        socket.emit('registerRoom', message);
        return;
    }

    if (command === 'outRoom'){
        socket.emit('outRoom', message);
        return;
    }

    if (command === 'off'){
        socket.off(message);
        return;
    }

    if (command === 'read'){
        socket.on('read', function(tags){
            postMessage({'command': 'read', 'message': tags});
        })
        return;
    }

    if (command === 'write'){
        let writeMsg = {};
        if (!Array.isArray(message)) return;

        message.forEach(tagValue => {
            if (typeof writeMsg[tagValue.deviceId] === 'undefined'){
                writeMsg[tagValue.deviceId] = [{'name': tagValue.name, 'value': tagValue.value}];
            }else{
                writeMsg[tagValue.deviceId].push({'name': tagValue.name, 'value': tagValue.value});
            }
        })

        for (let deviceId in writeMsg){
            socket.emit('write', {'deviceId': deviceId, 'updateTag': writeMsg[deviceId]});
        }
        
        return;
    }

    if (command === 'ackAlarm'){
        socket.emit('ackAlarm', message);
        return;
    }

    if (command === 'continuousLog'){
        socket.emit('control', {'command': 'continuousLog', 'isRealtime': message});
        return;
    }

    if (command === 'exportLog'){
        let timeFrom = message.timeFrom;
        let timeTo = message.timeTo;

        if (!moment(timeFrom, 'MM/DD/YYYY hh:mm A').isValid()){
            timeFrom = moment().format('MM/DD/YYYY hh:mm A');
        }

        if (!moment(timeTo, 'MM/DD/YYYY hh:mm A').isValid()){
            timeTo = moment().format('MM/DD/YYYY hh:mm A');
        }
        socket.emit('control', {'command': 'exportLog', 'rangeTime': {timeFrom, timeTo}});
    }
}

