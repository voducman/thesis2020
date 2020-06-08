import io from 'socket.io-client';
let intervalId = [], runExpCollection;

const socket = io('localhost:3000/development');

socket.on('connect', function () {
   document.getElementById('check-connection').querySelector('i').classList.add('connected');
   document.getElementById('check-connection').querySelector('i').classList.remove('disconnected');
})

socket.on('disconnect', function(reason){
    document.getElementById('check-connection').querySelector('i').classList.remove('connected');
    document.getElementById('check-connection').querySelector('i').classList.add('disconnected');
})

socket.on('registerRoom', function(msg){
    console.info(msg);
})

socket.on('outRoom', function(msg){
    console.info(msg);
})


function initProcessingRuntime(runningCollection){
    console.log(runningCollection);
    runExpCollection = runningCollection;
    let status = false;
    let email = window.sessionUser.email;
    socket.emit('registerRoom', email);

    const symtemTags = {
        'Bump_Speed': {
            'value': null, 
            'timestamp': null,
            'status': null,
            'dataType': 'integer',
        },
        'Bump_Pressure': {
            'value': null, 
            'timestamp': null,
            'status': null,
            'dataType': 'float',
        }
    }

    window.tagChanges = {
        'Bump_Speed': null,
        'Bump_Pressure': null
    }
    
    for (let tag in symtemTags){
        eval(`window._pre_${tag}       =  null;`);
        eval(`window.${tag}            =  symtemTags['${tag}'].value;`);
        eval(`window.${tag}__timestamp =  symtemTags['${tag}'].timestamp;`);
        eval(`window.${tag}__status    =  symtemTags['${tag}'].status;`);
    }

    socket.on('read', function(data){
        
        
        if (Array.isArray(data)){
            data.forEach(function(tag){

                let tagName = Object.keys(tag)[0];
                if (symtemTags[tagName]){
                    eval(`${tagName}            =  tag['${tagName}'].value;`);
                    eval(`${tagName}__timestamp =  tag['${tagName}'].timestamp;`);
                    eval(`${tagName}__status    =  tag['${tagName}'].status;`);
                }
            })
        }
    })

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
                for (let tag in symtemTags) {
                    eval(`_pre_${tag} = ${tag}`);
                }

                eval(symbol.runExp);
                console.log('click button')

                // Check if value of tag has change?
                // if true, send change value to server to update tag
                // if false, do nothing
                for (let tag in symtemTags) {
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
               
                for (let tag in symtemTags) {
                    eval(`_pre_${tag} = ${tag}`);
                }

                eval(symbol.runOnExp);
                console.log('click runOn');

                for (let tag in symtemTags) {
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
            
                for (let tag in symtemTags) {
                    eval(`_pre_${tag} = ${tag}`);
                }

                eval(symbol.runOffExp);
                console.log('click runOff');

                for (let tag in symtemTags) {
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


function stopProcessingRuntime(){
    let email = window.sessionUser.email;
    socket.emit('outRoom', email);
    socket.off('data');
    intervalId.forEach(function(id){
        clearInterval(id);
    })

    for (let expType in runExpCollection){
        if (!Array.isArray(runExpCollection[expType])) continue;
        runExpCollection[expType].forEach(function(symbol){
            symbol.updateSymbol();
        })
    }

    runExpCollection['hiddenExp'].forEach(function(symbol){
        symbol.hiddenAfterValidateExp(false);
    })   

    // Remove all click event on button symbols
    runExpCollection['runExp'].forEach(function(symbol){
        $(`#${symbol.id}`).off('click');
    })

    runExpCollection['runOnExp'].forEach(function(symbol){
        $(symbol.SVG.node.querySelector('input')).off('change');
    })

    runExpCollection['runOffExp'].forEach(function(symbol){
        $(symbol.SVG.node.querySelector('input')).off('change');
    })

    runExpCollection['assignTag'].forEach(function(symbol){
        let symbolType = symbol.id.replace(/-[0-9]+/i, '');
        if (symbolType === 'input'){
            $(symbol.SVG.node.querySelector('input')).off('change');
        }

        if (['h-slider','v-slider'].includes(symbolType)){
            symbol.isRun = false;
        }
    })


    runExpCollection = null;
}

function sendUpdatedTags(updatedTag){
    let isUpdate = false;
    for (let tagName in updatedTag){
        if (updatedTag[tagName] != null){
            isUpdate = true;
        }
    }

    if (isUpdate){
        socket.emit('write', updatedTag);
        console.log('Write success: ', updatedTag);
        for (let tagName in updatedTag){
            updatedTag[tagName] = null;
        }
    }
}


export {
    initProcessingRuntime,
    stopProcessingRuntime
}