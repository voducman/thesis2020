import {saveAs}            from 'file-saver';
import Worker              from './runtimeSocketIO.worker.js';
import {sendAjaxToServer}  from '../utils';
import {updateAlarmTable}  from './alarmUtil';
import {paginationSetup}   from './alarmUtil';
import {prependLogToTable}   from './logUtil';
import {getExportFilterTime} from './logUtil';


let intervalId = [], runExpCollection;
let totalGatewayAlarms = {};

let worker = new Worker();

worker.onmessage = function(e){
    let command  = e.data.command;
    let message = e.data.message;

    if (command === 'connect'){
        document.getElementById('check-connection').querySelector('i').classList.add('connected');
        document.getElementById('check-connection').querySelector('i').classList.remove('disconnected');
        return;
    }

    if (command === 'disconnect'){
        document.getElementById('check-connection').querySelector('i').classList.remove('connected');
        document.getElementById('check-connection').querySelector('i').classList.add('disconnected');
        return;
    }

    if (command === 'registerRoom'){
        console.info(message);
        return;
    }

    if (command === 'outRoom'){
        console.info(message);
        return;
    }

    if (command === 'read'){
        //console.log(message);
        // message is Tag data array received from gateway
        if (Array.isArray(message)){
            
            message.forEach(function(tag){

                let tagName = tag.name
                if (systemTags[tagName]){
                    eval(`${tagName}            =  tag.value;`);
                    eval(`${tagName}__timestamp =  tag.timestamp;`);
                    eval(`${tagName}__status    =  tag.status;`);
                }
            })
        }
        return;
    }

    if (command === 'alarm'){
        let {gatewayId, alarms} = message;
        totalGatewayAlarms[gatewayId] = alarms;
        let totalAlarms = [];

        for (let gatewayId in totalGatewayAlarms){
            totalAlarms.push(...totalGatewayAlarms[gatewayId]);
        }

        updateAlarmTable(totalAlarms);
        paginationSetup(totalAlarms.length, 'alarm');
        document.getElementById('alarm-counter').textContent = totalAlarms.length;
        return;
    }

    if (command === 'log'){
        let {gatewayId, log} = message;
        console.log(log);
        prependLogToTable(log, gatewayId);
        return;
    }

    if (command === 'exportLog'){
        let blob = new Blob(message,  {type: "text/plain;charset=utf-8"});
        saveAs(blob, 'Logs.txt');
    }
}

window.ackAlarm = function(tagName, isAckAll){
    if (isAckAll){
        worker.postMessage({'command': 'ackAlarm', 'message': [{}] });
    }else{
        worker.postMessage({'command': 'ackAlarm', 'message': [tagName] })
    }
    
}

window.updateLogRealtime = function(isRealtime){

    if (isRealtime){
        worker.postMessage({'command': 'continuousLog', 'message': true});
    }else{
        worker.postMessage({'command': 'continuousLog', 'message': false});
    }
}

window.exportLogs = function(){
    let rangeTime = getExportFilterTime();
    worker.postMessage({'command': 'exportLog', 'message': rangeTime})
}


async function initProcessingRuntime(runningCollection){
    console.log(runningCollection);
    runExpCollection = runningCollection;
    let status = false;
    let email = window.sessionUser.email;

    worker.postMessage({'command': 'registerRoom', 'message': {'roomId': email, 'isBrowser': true}});

    try{
        if (!window.systemTags){
            window.systemTags = await fetchTagSystem();
        }
    }catch(e){
        console.error("Fetch system tags error.");
        window.systemTags = {};
    }

    window.tagChanges = {};
    
    for (let tag in systemTags){

        if (systemTags[tag].type === 'internal'){
            // internal tags
            eval(`window._pre_${tag}       =  null;`);
            eval(`window.${tag}            =  systemTags['${tag}'].value;`);
        }else{
            // external tags
            eval(`window._pre_${tag}       =  null;`);
            eval(`window.${tag}            =  systemTags['${tag}'].value;`);
            eval(`window.${tag}__timestamp =  systemTags['${tag}'].timestamp;`);
            eval(`window.${tag}__status    =  systemTags['${tag}'].status;`);
            tagChanges[tag] = null;
        }

    }

    worker.postMessage({'command': 'read'});

    let interId = setInterval(function(){

        runningCollection['moveExp'].forEach(function(symbol){
            try {
                let value = eval(symbol.moveExp);
                symbol.moveAfterValidateExp(value);
    
            }catch(e){
                console.error(e + '');
            }
        })        

        runningCollection['hiddenExp'].forEach(function(symbol){
            try {
                let value = eval(symbol.hiddenExp);
                symbol.hiddenAfterValidateExp(value);
    
            }catch(e){
                console.error(e + '');
            }
        })      
        
        runningCollection['booleanExp'].forEach(function(symbol){
            try {
                let value = eval(symbol.booleanExp);
                symbol.chageSymbolSetAfterValidateExp(value);
    
            }catch(e){
                console.error(e + '');
            }
        })      

        runningCollection['onColorExp'].forEach(function(symbol){
            try {
                let value = eval(symbol.onColorExp);
                symbol.changeColorAfterValidateExp(value);
    
            }catch(e){
                console.error(e + '');
            }
        })     
        
        if (status){
            status = false;
            runningCollection['flashExp'].forEach(function(symbol){
                try {
                    let value = eval(symbol.flashExp);
                    symbol.flashAfterValidateExp(value);
        
                }catch(e){
                    console.error(e + '');
                }
            })    

        }else{
            status = true;
        }

        runningCollection['numericExp'].forEach(function(symbol){
            try {
                let value = eval(symbol.numericExp);
                symbol.showValueAfterValidateExp(value);
    
            }catch(e){
                console.error(e + '');
            }
        })     

        runningCollection['assignTag'].forEach(function(symbol){
            let symbolType = symbol.id.replace(/-[0-9]+/i, '');

            if (['progress-bar','radial-gauge','speedometer','linear-gauge'].includes(symbolType)){
                try{
                    let value = eval(symbol.assignTag);
                    symbol.setValue(parseFloat(value));
                }catch(e){
                    console.error(e + '');
                }
                return;
            }

            if (['line-chart','bar-chart'].includes(symbolType)){
                try{
                    let tag1 = eval(symbol.assignTag1),
                        tag2 = eval(symbol.assignTag2),
                        tag3 = eval(symbol.assignTag3);
  
                    symbol.pushDatas(parseFloat(tag1), parseFloat(tag2), parseFloat(tag3));
                
                }catch(e){
                    console.error(e + '');
                }
                return;
            }

            if (['pie-chart','donut-chart'].includes(symbolType)){
                try{
                    let tag1 = eval(symbol.assignTag1),
                        tag2 = eval(symbol.assignTag2),
                        tag3 = eval(symbol.assignTag3),
                        tag4 = eval(symbol.assignTag4),
                        tag5 = eval(symbol.assignTag5);
  
                    symbol.pushDatas(parseFloat(tag1), parseFloat(tag2), parseFloat(tag3), parseFloat(tag4), parseFloat(tag5));
                
                }catch(e){
                    console.error(e + '');
                }
                return;
            }

        })
    }, 500);
    intervalId.push(interId);


    // Setup event listener for Button when click
    runningCollection['runExp'].forEach(function(symbol){
        $(`#${symbol.id}`).click(function (e) {
            try {
                // Update pre-tag to compare after click
                for (let tag in systemTags) {
                    eval(`_pre_${tag} = ${tag}`);
                }

                eval(symbol.runExp);
                console.log('click button')

                // Check if value of tag has change?
                // if true, send change value to server to update tag
                // if false, do nothing
                for (let tag in systemTags) {
                    eval(`
                        if (_pre_${tag} !=  ${tag}) tagChanges['${tag}'] = ${tag};
                        else tagChanges['${tag}'] = null;
                    `);
                }
                sendUpdatedTags(tagChanges);
            }catch(e){  
                console.log(e + '');
            }
        })
    })

    runningCollection['runOnExp'].forEach(function(symbol){
        $(symbol.SVG.node.querySelector('input')).change(function(e){

            if (!$(this).prop('checked')) return;
            try{
               
                for (let tag in systemTags) {
                    eval(`_pre_${tag} = ${tag}`);
                }

                eval(symbol.runOnExp);
                console.log('click runOn');

                for (let tag in systemTags) {
                    eval(`
                        if (_pre_${tag} !=  ${tag}) tagChanges['${tag}'] = ${tag};
                        else tagChanges['${tag}'] = null;
                    `);
                }
                sendUpdatedTags(tagChanges);
            }catch(e){  
                console.log(e + '');
            }
        })
    })

    runningCollection['runOffExp'].forEach(function(symbol){
        $(symbol.SVG.node.querySelector('input')).change(function(e){

            if ($(this).prop('checked')) return;
            try{
            
                for (let tag in systemTags) {
                    eval(`_pre_${tag} = ${tag}`);
                }

                eval(symbol.runOffExp);
                console.log('click runOff');

                for (let tag in systemTags) {
                    eval(`
                        if (_pre_${tag} !=  ${tag}) tagChanges['${tag}'] = ${tag};
                        else tagChanges['${tag}'] = null;
                    `);
                }
                sendUpdatedTags(tagChanges);
            }catch(e){  
                console.log(e + '');
            }
        })
    })


    runningCollection['assignTag'].forEach(function(symbol){
        let symbolType = symbol.id.replace(/-[0-9]+/i, '');
        if (symbolType === 'input'){
            $(symbol.SVG.node.querySelector('input')).change(function(e){
                eval(`tagChanges['${symbol.assignTag.trim()}'] = e.target.value || null`);
                sendUpdatedTags(tagChanges);
                setTimeout(function(){
                    $(symbol.SVG.node.querySelector('input')).val(eval(symbol.assignTag));
                }, 3000)
            })
        }

        if (['h-slider','v-slider'].includes(symbolType)){
            symbol.isRun = true;
            let interId = setInterval(function(){
                sendUpdatedTags(tagChanges);
            }, 500);
            intervalId.push(interId);
        }
    })


}


function sendUpdatedTags(updatedTag){
    let update = [];
    for (let tagName in updatedTag){
        let deviceId = getDeviceIdOfTag(tagName, systemTags);
        if (updatedTag[tagName] != null &&  deviceId != null){
            update.push({'name': tagName, 'value': updatedTag[tagName], deviceId});
        }
    }

    if (update.length){
        worker.postMessage({'command': 'write', 'message': update});
        for (let tagName in updatedTag){
            updatedTag[tagName] = null;
        }
    }
}

async function fetchTagSystem(){
    try{
        let gateways, plcs, tags, responseForm, results = {};
        responseForm = await sendAjaxToServer("/gateway/json/list/gateways");
        if (responseForm.success) gateways = responseForm.getData();
        responseForm = await sendAjaxToServer("/gateway/json/list/plcs");
        if (responseForm.success) plcs = responseForm.getData();
        responseForm = await sendAjaxToServer("/gateway/json/list/tags");
        if (responseForm.success) tags = responseForm.getData();

        if (!gateways || !plcs || !tags) return;
        if (Array.isArray(tags)) {
            tags.forEach(function (tag) {
                if (tag.type === 'internal') {
                    results[tagName] = {
                        'status': null,
                        'timestamp': null,
                        'type': 'internal',   
                    }
                } else {
                    let tagName;
                    let gatewayIndex = gateways.findIndex(gw => gw.uniqueId == tag.gatewayId);
                    let plcIndex = plcs.findIndex(plc => plc._id == tag.plcId);
                    if (gatewayIndex == -1 || plcIndex == -1) return;
                    tagName = gateways[gatewayIndex].name + '_' + plcs[plcIndex].name + '_' + tag.name;

                    results[tagName] = {
                        'status': null,
                        'timestamp': null,
                        'type': 'external',
                        'deviceId': tag.gatewayId
                    }

                }
            })
        }

        return results;
    }catch(e){
        return {};
    }
}

function getDeviceIdOfTag(tagName, systemTags){
    for (let name in systemTags){
        if (tagName === name && systemTags[name].type === 'external'){
            return systemTags[name].deviceId;
        }
    }
    return null;
}


export {
    initProcessingRuntime
}