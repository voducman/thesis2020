import moment          from 'moment';
import constantUtil from '../gateway/constantUtil';
const getLabelOfValue = constantUtil.getLabelOfValue;
const tableContainer = $('#render-table');

export const renderGatewayTable = function(gateways){
    if (Array.isArray(gateways)){
        
        tableContainer.empty();
        gateways.forEach(function (gateway, index){
            let  row = generateRowOfGatewayTable(gateway, index+1);
            tableContainer.append(row);
        })

        return;
    }
    return console.error("Gateways parameter is not a Array.");
}

export const renderPLCTable = function(plcs){
    if (Array.isArray(plcs)){

        tableContainer.empty();
        plcs.forEach(function (plc, index){
            let  row = generateRowOfPLCTable(plc, index+1);
            tableContainer.append(row);
        })

        return;
    }
    return console.error("PLCs parameter is not a Array.");
}

export const renderTagTable = function(tags){
    if (Array.isArray(tags)){

        tableContainer.empty();
        tags.forEach(function (tag, index){
            let  row = generateRowOfTagTable(tag, index+1);
            tableContainer.append(row);
        })
        return;
    }
    return console.error("Tags parameter is not a Array.");
}


export const getTagFilter = function(){
    return {
        'gateway': $('#gateway-filter').val(),
        'plc':     $('#plc-filter').val(),
        'tag':     $('#tag-filter').val()
    }
}

export const setupFilter = function(tags){
    let gateways = [], plcs = [];
    if (Array.isArray(tags)){
        tags.forEach(function(tag){
            if (tag.type == 'internal') return;
            if (!gateways.includes(tag.gatewayId)) gateways.push(tag.gatewayId);
            if (!plcs.includes(tag.plcId)) plcs.push(tag.plcId);
        })

        gateways.forEach(function (gateway) {
            $('#gateway-filter').append(`<option value=${gateway}>${gateway}</option>`)
        })

        plcs.forEach(function (plc) {
            $('#plc-filter').append(`<option value=${plc}>${plc}</option>`)
        })

        $('.selectpicker').selectpicker('refresh');
    }
}


function generateRowOfGatewayTable(gateway, index){

    const bgColor = (index% 2 == 0)? 'background-color: #e7e497;' : '';
    const isFirstRender = (index < 11)? '' : 'display: none;';
    return  `
        <tr  style="${bgColor} ${isFirstRender}" id="row-${index}">
                <td class="text-center">${(index < 9) ? "0" + index : index}</td>
                <td class="text-center">${gateway.uniqueId}</td>
                <td class="text-center">${gateway.name}</td>
                <td class="text-center">${gateway.scanTime}</td>
                <td class="text-center">${gateway.latitude}</td>
                <td class="text-center">${gateway.longitude}</td>
                <td class="text-center">${moment(gateway.createdTime).format('DD/MM/YYYY HH:mm:ss A')}</td>
                <td class="text-center">${moment(gateway.lastModified).format('DD/MM/YYYY HH:mm:ss A')}</td>
                <td class="text-center" style="padding: 0">
                    <button type="button" rel="tooltip" class="btn btn-info btn-sm"
                        data-original-title="Force Gateway Update" onclick="forceGatewayUpdate('${gateway.uniqueId}')">
                        <i class="material-icons">system_update_alt</i>
                    </button>
                </td>
                <td class="text-center" style="padding: 0">
                    <button type="button" rel="tooltip" class="btn btn-danger btn-sm"
                        data-original-title="Reset Gateway" onclick="resetGateway('${gateway.uniqueId}')">
                        <i class="material-icons">new_releases</i>
                    </button>
                </td>
                <td class="text-center"><input type="text" id="${gateway.uniqueId}" value="OFFLINE" readonly style="width: 100px; color: red; font-weight: 600; text-align: center;"></td>
                <td class="td-actions text-center">
                    <button type="button" rel="tooltip" class="btn btn-info"
                        data-original-title="Gateway Info" title="Show Description/Position"
                        data-toggle="collapse" data-target="#temp-${index}">
                        <i class="material-icons">info</i>
                    </button>
                </td>
            </tr>
            <tr id="temp-${index}" class="collapse" style="background-color: #dddfd4;">
                <td></td>
                <td colspan="11" rowspan="2">                                                      
                    <div class="row">
                        <div class="col-md-12"><b>Address</b>:  ${gateway.address}</div>
                    </div> 
                    <div class="row">
                        <div class="col-md-12"><b>Description</b>:  ${gateway.description}</div>
                    </div>                                                       
                </td>
            </tr>
        <tr></tr>`
}

function generateRowOfPLCTable(plc, index){
   
    const bgColor = (index% 2 == 0)? 'background-color: #e7e497;' : '';
    const isFirstRender = (index < 11)? '' : 'display: none;';
    return `
            <tr  style="${bgColor} ${isFirstRender}" id="row-${index}">
                <td class="text-center">${(index < 10) ? ("0" + index) : index}</td>
                <td class="text-center">${plc.name}</td>
                <td class="text-center">${getLabelOfValue(plc.type)}</td>
                <td class="text-center">${getLabelOfValue(plc.producer)}</td>
                <td class="text-center">${plc.ipAddress}</td>
                <td class="text-center" style="font-size: x-small">${getLabelOfValue(plc.protocol)}</td>
                <td class="text-center">${moment(plc.createdTime).format('DD/MM/YYYY HH:mm:ss A')}</td>
                <td class="text-center">${moment(plc.lastModified).format('DD/MM/YYYY HH:mm:ss A')}</td>
                <td class="text-center">${plc.name}</td>
                <td class="td-actions text-center">
                    <button type="button" rel="tooltip" class="btn btn-info"
                        data-original-title="Gateway Info" title="Show Description/Position"
                        data-toggle="collapse" data-target="#temp-${index}">
                        <i class="material-icons">info</i>
                    </button>
                </td>
            </tr>
            <tr id="temp-${index}" class="collapse" style="background-color: #dddfd4;">
                <td></td>
                <td colspan="11" rowspan="2">                                                      
                    <div class="row">
                        <div class="col-md-12"><b>Description</b>:  ${plc.description}</div>
                    </div>                                                       
                </td>
            </tr>
            <tr></tr>`
}

function generateRowOfTagTable(tag, index){
    
    const bgColor = (index% 2 == 0)? 'background-color: #e7e497;' : '';
    const isFirstRender = (index < 11)? '' : 'display: none;';
    return `
            <tr  style="${bgColor} ${isFirstRender}" id="row-${index}">
                <td class="text-center">${(index < 10) ? ("0" + index) : index}</td>
                <td class="text-center">${tag.name}</td>
                <td class="text-center">${tag.type}</td>
                <td class="text-center">${tag.scale}</td>
                <td class="text-center">${tag.offset}</td>
                <td class="text-center">${tag.minimum}</td>
                <td class="text-center">${tag.maximum}</td>
                <td class="text-center">${tag.memoryAddress}</td>
                <td class="text-center">${tag.dataType}</td>
                <td class="text-center" >${tag.deadBand}</td>
                <td class="text-center" style="font-weight: 400;">${(tag.log)? 'true':'false'}</td>
                <td class="text-center" style="font-weight: 400;">${(tag.alarm)? 'true':'false'}</td>
                <td class="td-actions text-center">
                    <button type="button" rel="tooltip" class="btn btn-info"
                        data-original-title="Gateway Info" title="Show Tag Details"
                        data-toggle="collapse" data-target="#temp-${index}">
                        <i class="material-icons">info</i>
                    </button>
                </td>
            </tr>
            <tr id="temp-${index}" class="collapse" style="background-color: #dddfd4;">
                <td></td>
                <td colspan="15" rowspan="2">                                                      
                    <div class="row">
                        <div class="col-md-3"><b>Created Time</b>: ${moment(tag.createdTime).format('DD:MM:YYYY h:mm:ss A')}</div>
                        <div class="col-md-3"><b>Last Modified</b>: ${moment(tag.lastModified).format('DD:MM:YYYY h:mm:ss A')}</div>
                    </div>
                    <div class="row">              
                        <div class="col-md-3"><b>Alarm</b></div> 
                        <div class="col-md-9">
                        [
                            <b>HIHI</b>:  ${(tag.alarm)? tag.alarm.hihi: ''}
                            <b>&nbsp;&nbsp;HI</b>:  ${(tag.alarm)? tag.alarm.hi: ''}
                            <b>&nbsp;&nbsp;LOW</b>:  ${(tag.alarm)? tag.alarm.low: ''}
                            <b>&nbsp;&nbsp;LOWLOW</b>:  ${(tag.alarm)? tag.alarm.lowlow: ''}
                        ] </div> 
                       
                    </div> 
                    <div class="row">
                        <div class="col-md-12"><b>Description</b>:  ${tag.description}</div>
                    </div>                                                       
                </td>
            </tr>
            <tr></tr>`
}

export const paginationSetup = function(numOfRow){

    if (numOfRow < 10){
        $('#first').parent().hide();
        $('#back').parent().hide();
        $('#current').parent().hide();
        $('#next').parent().hide();
        $('#last').parent().hide();
        $('#pagination p').text(`Showing 1 to ${numOfRow} of ${numOfRow} entries`);
    }else{
        $('#pagination p').text(`Showing 1 to 10 of ${numOfRow} entries`);
        if (numOfRow <= 20){
            $('#back').parent().show();
            $('#back').html('1');
            $('#current').parent().show();
            $('#current').html('2');
            $('#next').parent().hide();
            $('#back').parent().addClass('active');
            $('#current').parent().removeClass('active');
        }else{
            $('#back').parent().show();
            $('#back').html('1');
            $('#current').parent().show();
            $('#current').html('2');
            $('#next').parent().show();
            $('#next').html('3');
            $('#back').parent().addClass('active');
            $('#current').parent().removeClass('active');
            $('#next').parent().removeClass('active');
        }
    }

    $('#first').click(function(){
        for (let i = 1; i<= numOfRow; i++){
            if (i <= 10) $(`#row-${i}`).show();
            else         $(`#row-${i}`).hide();
        }
    
        if (numOfRow <= 20) {
            $('#back').html('1');
            $('#current').html('2');
            $('#next').parent().hide();
            $('#back').parent().addClass('active');
            $('#current').parent().removeClass('active');
        }else{
            $('#back').html('1');
            $('#current').html('2');
            $('#next').parent().show();
            $('#next').html('3');
            $('#back').parent().addClass('active');
            $('#current').parent().removeClass('active');
            $('#next').parent().removeClass('active');
        }
        $('#pagination p').text(`Showing 1 to 10 of ${numOfRow} entries`);
    })
    
    $('#back').click(function(){    
        if (numOfRow <= 20) {
            for (let i = 1; i<= numOfRow; i++){
                if (i <= 10) $(`#row-${i}`).show();
                else         $(`#row-${i}`).hide();
            }
    
            $('#back').parent().show();
            $('#current').parent().show();
            $('#back').parent().addClass('active');
            $('#current').parent().removeClass('active');
            $('#pagination p').text(`Showing 1 to 10 of ${numOfRow} entries`);
        }else{
            let current = parseInt( $('#back').html());
    
            for (let i = 1; i<= numOfRow; i++){
                if (i <= current*10 && i > current*10-10) $(`#row-${i}`).show();
                else         $(`#row-${i}`).hide();
            }
    
            if (current > 1){ 
                $('#back').html(current-1);
                $('#current').html(current);
                $('#next').html(current+1);
                $('#back').parent().removeClass('active');
                $('#current').parent().addClass('active');
                $('#next').parent().removeClass('active');
                $('#pagination p').text(`Showing ${current*10-9} to ${current*10} of ${numOfRow} entries`);
            }else{         // Don't rotate pagination
                $('#back').parent().addClass('active');
                $('#current').parent().removeClass('active');
                $('#next').parent().removeClass('active');
                $('#pagination p').text(`Showing 1 to 10 of ${numOfRow} entries`);
            }
            
        }
        
    })
    
    $('#current').click(function(){
        let current = parseInt($('#current').html());
        if (current == 2){
            for (let i = 1; i<= numOfRow; i++){
                if ( i > 10 && i <= 20) $(`#row-${i}`).show();
                else         $(`#row-${i}`).hide();
            }
    
            $('#back').parent().removeClass('active');
            $('#current').parent().addClass('active');
            $('#next').parent().removeClass('active');
            $('#pagination p').text(`Showing 11 to ${(numOfRow>20)? '20': numOfRow} of ${numOfRow} entries`);
        }else if(current == Math.ceil(numOfRow/10)-1){
            for (let i = 1; i<= numOfRow; i++){
                if (i <= current*10 && i > current*10-10) $(`#row-${i}`).show();
                else         $(`#row-${i}`).hide();
            }
    
            $('#back').parent().removeClass('active');
            $('#current').parent().addClass('active');
            $('#next').parent().removeClass('active');
            $('#pagination p').text(`Showing ${current*10-9} to ${current*10} of ${numOfRow} entries`);
        }
    })
    
    $('#next').click(function(){
        let current = parseInt($('#next').html());
    
        for (let i = 1; i <= numOfRow; i++) {
            if (i <= current * 10 && i > current * 10 - 10) $(`#row-${i}`).show();
            else $(`#row-${i}`).hide();
        }
    
        if (current == 3 && numOfRow <= 30) { // Don't rotate pagination
            $('#back').parent().removeClass('active');
            $('#current').parent().removeClass('active');
            $('#next').parent().addClass('active');
            $('#pagination p').text(`Showing ${current*10-9} to ${numOfRow} of ${numOfRow} entries`);
        } else if (current >= 3 && current < Math.ceil(numOfRow/10)){         // Rotate pagination
            $('#back').html(current - 1);
            $('#current').html(current);
            $('#next').html(current + 1);
            $('#back').parent().removeClass('active');
            $('#current').parent().addClass('active');
            $('#next').parent().removeClass('active');
            $('#pagination p').text(`Showing ${current*10-9} to ${current*10} of ${numOfRow} entries`);
        }else{
            $('#back').parent().removeClass('active');
            $('#current').parent().removeClass('active');
            $('#next').parent().addClass('active');
            $('#pagination p').text(`Showing ${current*10-9} to ${numOfRow} of ${numOfRow} entries`);
        }
        
    })
    
    $('#last').click(function(){
        for (let i = 1; i<= numOfRow; i++){
            if (i > 10*Math.floor(numOfRow/10)) $(`#row-${i}`).show();
            else         $(`#row-${i}`).hide();
        }
    
        if (numOfRow <= 20) {
            $('#back').parent().show();
            $('#back').html('1');
            $('#current').parent().show();
            $('#current').html('2');
            $('#next').parent().hide();
            $('#back').parent().removeClass('active');
            $('#current').parent().addClass('active');
        }else{
            $('#back').parent().show();
            $('#back').html(Math.ceil(numOfRow/10)-2);
            $('#current').parent().show();
            $('#current').html(Math.ceil(numOfRow/10)-1);
            $('#next').parent().show();
            $('#next').html(Math.ceil(numOfRow/10));
            $('#back').parent().removeClass('active');
            $('#current').parent().removeClass('active');
            $('#next').parent().addClass('active');
        }
        $('#pagination p').text(`Showing ${10*Math.floor(numOfRow/10)+1} to ${numOfRow} of ${numOfRow} entries`);
    })
}