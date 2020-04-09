const Utils       = require('../utils');
const Message     = Utils.Message;
const fortmatTime = Utils.fortmatTime;
let tagStorage = [];

function renderGatewayTable(data){
    
    $('#render-table').empty();

    data.external.forEach(function(gw, index){

        gw.updatePLCnTag();
        const isFirstRender = (index < 10)? '' : 'display: none;';
        const bgColor = (index% 2 == 1)? 'background-color: #e7e497;' : '';
        let rows = `
            <tr  style="${bgColor} ${isFirstRender}" id="gateway-${index+1}">
                <td class="text-center">${(index < 9) ? "0" + ++index : index+1}</td>
                <td class="text-center">${gw.id}</td>
                <td class="text-center">${gw.name}</td>
                <td class="text-center">${gw.latitude}</td>
                <td class="text-center">${gw.longitude}</td>
                <td class="text-center">${gw.PLCnum}</td>
                <td class="text-center">${gw.Tagnum}</td>
                <td class="text-center">${fortmatTime(gw.createdTime)}</td>
                <td class="text-center">${fortmatTime(gw.modified)}</td>
                <td class="text-center"><i class="material-icons ${(gw.status) ? "connected" : "disconnected"}">lens</i></td>
                <td class="td-actions text-center">
                    <button type="button" rel="tooltip" class="btn btn-info"
                        data-original-title="Gateway Info" title="Show Description/Position"
                        data-toggle="collapse" data-target="#row-${index+1}">
                        <i class="material-icons">info</i>
                    </button>
                </td>
            </tr>
            <tr id="row-${index+1}" class="collapse" style="background-color: #dddfd4;">
                <td></td>
                <td colspan="11" rowspan="2">                                                      
                    <div class="row">
                        <div class="col-md-12"><b>Position</b>:  ${gw.position}</div>
                    </div> 
                    <div class="row">
                        <div class="col-md-12"><b>Description</b>:  ${gw.description}</div>
                    </div>                                                       
                </td>
            </tr>
            <tr></tr>
            `
            
            $('#render-table').append(rows);
    })

    return data.external.length;
}

function renderPLCTable(data){
    let index = 0;
    $('#render-table').empty();

    data.external.forEach(function(gw){

        gw.PLCs.forEach(function(plc){
            index++;
            const numTag = plc.Tags.length;
            const isFirstRender = (index < 11)? '' : 'display: none;';
            const bgColor = (index% 2 == 0)? 'background-color: #e7e497;' : '';

            let rows = `
            <tr  style="${bgColor} ${isFirstRender}" id="plc-${index}">
                <td class="text-center">${(index < 10) ? ("0" + index) : index}</td>
                <td class="text-center">${plc.name}</td>
                <td class="text-center">${Message(plc.type)}</td>
                <td class="text-center">${Message(plc.producer)}</td>
                <td class="text-center">${plc.IPaddrress}</td>
                <td class="text-center" style="font-size: x-small">${Message(plc.protocol)}</td>
                <td class="text-center">${numTag}</td>
                <td class="text-center" >${fortmatTime(plc.createdTime)}</td>
                <td class="text-center">${fortmatTime(plc.modified)}</td>
                <td class="text-center">${gw.name}</td>
                <td class="text-center"><i class="material-icons ${(false) ? "connected" : "disconnected"}">lens</i></td>
                <td class="td-actions text-center">
                    <button type="button" rel="tooltip" class="btn btn-info"
                        data-original-title="Gateway Info" title="Show Description/Position"
                        data-toggle="collapse" data-target="#row-${index}">
                        <i class="material-icons">info</i>
                    </button>
                </td>
            </tr>
            <tr id="row-${index}" class="collapse" style="background-color: #dddfd4;">
                <td></td>
                <td colspan="11" rowspan="2">                                                      
                    <div class="row">
                        <div class="col-md-12"><b>Position</b>:  ${gw.position}</div>
                    </div> 
                    <div class="row">
                        <div class="col-md-12"><b>Description</b>:  ${plc.description}</div>
                    </div>                                                       
                </td>
            </tr>
            <tr></tr>`

            $('#render-table').append(rows);
        })
    })

    return index;

}

function renderTagTable(data){
    let tagArray = [];

    $('#render-table').empty();
    
    data.external.forEach(function(gw){
        gw.PLCs.forEach(function(plc, index){      
            plc.Tags.forEach(function(tag){

                tagArray.push({
                    name: tag.name,
                    type: 'EXTERNAL',
                    scale: tag.scale,
                    offset: tag.offset,
                    minimum: tag.minimum,
                    maximum: tag.maximum,
                    unit: tag.unit,
                    memoryAdd: tag.memoryAdd,
                    dataType: tag.dataType,
                    deadband: tag.deadband,
                    trend: tag.trend,
                    log: tag.log,
                    alarm: tag.alarm,
                    plc: plc.name,
                    gateway: gw.name,
                    protocol: plc.protocol,
                    producer: plc.producer,
                    plcType: plc.type,
                    description: tag.description,
                })
            })
        })
    })

    data.internal.forEach((tag) => {
        tagArray.push({
            name: tag.name,
            type: 'INTERNAL',
            scale: tag.scale,
            offset: tag.offset,
            minimum: '---',
            maximum: '---',
            unit: tag.unit,
            memoryAdd: '---',
            dataType: tag.dataType,
            deadband: '---',
            trend: 'FLASE',
            log: 'FALSE',
            alarm: 'FALSE',
            plc: '---',
            gateway: '---',
            protocol: '---',
            producer: '---',
            plcType: '---',
            description: tag.description,
        })
    })
    tagStorage = tagArray;
    renderTag(tagStorage);
    
    let [gwList, plcList] = getInfoFromTagArray(tagStorage);
    gwList.forEach((gwName) => {
        $('#gateway-filter').append(`
            <option value="${gwName}">${gwName}</option>
        `)
    })

    plcList.forEach((plcName) => {
        $('#plc-filter').append(`
            <option value="${plcName}">${plcName}</option>
        `)
    })

    $('.selectpicker').selectpicker('refresh');
    // Select all 
    $('#gateway-filter').selectpicker('selectAll');
    $('#plc-filter').selectpicker('selectAll');
    $('#tag-filter').selectpicker('selectAll');
    

    console.log(tagArray)
    return tagArray.length || 0;
}


function renderTag(tagArray){
    let index = 0;
    
    $('#render-table').empty();
    tagArray.forEach((tag) => {
        index++;
        const isFirstRender = (index < 11) ? '' : 'display: none;';
        const bgColor = (index % 2 == 0) ? 'background-color: #e7e497;' : '';

        let rows = `
            <tr  style="${bgColor} ${isFirstRender}" id="tag-${index}">
                <td class="text-center">${(index < 10) ? ("0" + index) : index}</td>
                <td class="text-center">${tag.name}</td>
                <td class="text-center">${tag.type}</td>
                <td class="text-center">${tag.scale}</td>
                <td class="text-center">${tag.offset}</td>
                <td class="text-center">${tag.minimum}</td>
                <td class="text-center">${tag.maximum}</td>
                <td class="text-center" >${tag.unit}</td>
                <td class="text-center">${tag.memoryAdd}</td>
                <td class="text-center">${Message(tag.dataType)}</td>
                <td class="text-center" >${tag.deadband}</td>
                <td class="text-center" style="font-weight: 400;">${Message(tag.trend)}</td>
                <td class="text-center" style="font-weight: 400;">${Message(tag.log)}</td>
                <td class="text-center" style="font-weight: 400;">${(tag.alarm && tag.alarm != 'FALSE')? 'TRUE' : 'FALSE'}</td>
                <td class="td-actions text-center">
                    <button type="button" rel="tooltip" class="btn btn-info"
                        data-original-title="Gateway Info" title="Show Tag Details"
                        data-toggle="collapse" data-target="#row-${index}">
                        <i class="material-icons">info</i>
                    </button>
                </td>
            </tr>
            <tr id="row-${index}" class="collapse" style="background-color: #dddfd4;">
                <td></td>
                <td colspan="14" rowspan="2">                                                      
                    <div class="row">
                        <div class="col-md-3"><b>PLC Name</b>:  ${tag.plc}</div>
                        <div class="col-md-3"><b>Protocol</b>:  ${Message(tag.protocol)}</div>
                        <div class="col-md-3"><b>Producer</b>:  ${Message(tag.producer)}</div>
                    </div>
                    <div class="row">                       
                        <div class="col-md-3"><b>Gateway</b>:   ${tag.gateway}</div>
                        <div class="col-md-3"><b>PLC Type</b>:  ${Message(tag.plcType)}</div>
                        <div class="col-md-3"><b>Alarm</b>:     ${(tag.alarm && tag.alarm != 'FALSE') ? 'TRUE' : 'FALSE'}</div>
                    </div>
                    <div class="row">              
                        <div class="col-md-3"><b>Alarm</b></div> 
                        <div class="col-md-9">
                        [
                            <b>HIHI</b>:  ${(tag.alarm && tag.alarm != 'FALSE')? tag.alarm.hihi: ''}
                            <b>&nbsp;&nbsp;HI</b>:  ${(tag.alarm && tag.alarm != 'FALSE')? tag.alarm.hi: ''}
                            <b>&nbsp;&nbsp;LOW</b>:  ${(tag.alarm && tag.alarm != 'FALSE')? tag.alarm.low: ''}
                            <b>&nbsp;&nbsp;LOWLOW</b>:  ${(tag.alarm && tag.alarm != 'FALSE')? tag.alarm.lowlow: ''}
                        ] </div> 
                       
                    </div> 
                    <div class="row">
                        <div class="col-md-12"><b>Description</b>:  ${tag.description}</div>
                    </div>                                                       
                </td>
            </tr>
            <tr></tr>`

        $('#render-table').append(rows);
    })
}

function getInfoFromTagArray(tagArray){
    let gatewayList = [];
    let plcList = [];

    tagArray.forEach((tag) => {
        if (tag.gateway != '---' && !gatewayList.includes(tag.gateway)){
            gatewayList.push(tag.gateway);
        }

        if (tag.plc != '---' && !plcList.includes(tag.plc)){
            plcList.push(tag.plc);
        }
    })
    return [gatewayList, plcList];
}

function updateTagTable(){
    // to-do list
    let newTagStorage;
    // B1. Handle tagStorage by [gatewayList, plcList, type]
    let newTagList;
    let gatewayFilter = $('#gateway-filter').val();
    let plcFilter     = $('#plc-filter').val();
    let tagFilter    = $('#tag-filter').val();

    console.log(gatewayFilter, plcFilter, tagFilter)
    // B2. call renderTag(updated tagStorage)
    newTagList = tagStorage.filter((tag) => {
        if (gatewayFilter.includes(tag.gateway) && plcFilter.includes(tag.plc) && tagFilter.includes('EXTERNAL')){
            return true;
        }else if (tag.type == 'INTERNAL' && tagFilter.includes('INTERNAL')){
            return true;
        }
        return false;
    })

    console.log('new storage: ', newTagList);
    renderTag(newTagList);
    return newTagList.length || 0;

}



module.exports = {
    renderGatewayTable,
    renderPLCTable,
    renderTagTable,
    updateTagTable
}