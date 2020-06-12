import  moment            from 'moment';
import {showErrorOnField} from '../utils';
import {isValidNumber}    from '../utils';
import {isValidString}    from '../utils';
import {isValidIP}        from '../utils';
import constantUtil       from './constantUtil';


export const showAddGatewayPopup = function(){
    $('#addGateway').modal('show');
}

export const showEditGatewayPopup = function(){
    $('#editGateway').modal('show');
}

export const showPLCTableOnPopup = function(isShow){
    if (isShow){
        $('#PLC-table').show();
    }else{
        $('#PLC-table').hide();
    }
}

export const showTagTableOnPopup = function(isShow){
    if (isShow){
        $('#Tag-table').show();
    }else{
        $('#Tag-table').hide();
    }
}

export const showCreatePLCButton = function(isShow){
    let createBtn = $('#edit-plc .save');
    let updateBtn = $('#edit-plc .update');
    if (isShow){
        createBtn.show();
        updateBtn.hide();
    }else{
        createBtn.hide();
        updateBtn.show();
    }
}


export const clearNewGatewayModal = function(){

    $('#addGateway input[name=uniqueId]').val('');
    $('#addGateway input[name=name]').val('');
    $('#addGateway input[name=address]').val('');
    $('#addGateway input[name=scan-time]').val(500);
    $('#addGateway input[name=longitude]').val('');
    $('#addGateway input[name=latitude]').val('');
    $('#addGateway textarea[name=description]').val('');
}

export const clearNewPLCModal = function(){
    $('#editGateway .plc input[name=name]').val('');
    $('#editGateway .plc input[name=ip-address]').val('');
    $('#editGateway .plc textarea[name=description]').val('');
}

export const clearNewTagModal = function(){
    $('#editGateway .internal input[name=name]').val('');
    $('#editGateway .internal input[name=scale]').val(1);
    $('#editGateway .internal input[name=offset]').val(0);

    $('#editGateway .external input[name=name]').val('');
    $('#editGateway .external input[name=scale]').val(1);
    $('#editGateway .external input[name=offset]').val(0);
    $('#editGateway .external input[name=minimum]').val('');
    $('#editGateway .external input[name=maximum]').val('');
    $('#editGateway .external input[name=memory-address]').val('');
    $('#editGateway .external input[name=deadband]').val(0);
    $('#editGateway .external input[name=readOnly]').prop('checked', true);

    $('#editGateway .tag textarea[name=description]').val('');
}

/**
 * @returns {object} - a object including all 
 *  attribute of gateway if values is valid
 */
export const parseGatewayFromModal = function(modalId){
    let isValid = true;
    let uniqueId  = $(`#${modalId} input[name=uniqueId]`).val();
    let name      = $(`#${modalId} input[name=name]`).val();
    let address   = $(`#${modalId} input[name=address]`).val();
    let scanTime  = $(`#${modalId} input[name=scan-time]`).val();
    let longitude = $(`#${modalId} input[name=longitude]`).val();
    let latitude  = $(`#${modalId} input[name=latitude]`).val();
    let description = $(`#${modalId} textarea[name=description]`).val();

    if (!isValidString(uniqueId)) return showErrorOnField(`#${modalId} input[name=uniqueId]`);
    if (!isValidString(name))     return showErrorOnField(`#${modalId} input[name=name]`);
    if (!isValidNumber(scanTime, 500)) return showErrorOnField(`#${modalId} input[name=scan-time]`);
    if (!isValidNumber(longitude)) return showErrorOnField(`#${modalId} input[name=longitude]`);
    if (!isValidNumber(latitude))  return showErrorOnField(`#${modalId} input[name=latitude]`);     
    return {uniqueId, name, address, scanTime, longitude, latitude, description};
}

export const parsePLCFromModal = function(){
    let gatewayId = $(`#editGateway .gateway input[name=uniqueId]`).val();
    let producer  = $(`#editGateway .plc select[name=producer]`).val();
    let type      = $(`#editGateway .plc select[name=type]`).val();
    let protocol  = $(`#editGateway .plc select[name=protocol]`).val();
    let name      = $(`#editGateway .plc input[name=name]`).val();
    let ipAddress = $(`#editGateway .plc input[name=ip-address]`).val();
    let description = $(`#editGateway .plc textarea[name=descripiton]`).val();
    
    if (!isValidString(name, 1)) return showErrorOnField('#editGateway .plc input[name=name]');
    if (!isValidIP(ipAddress))   return showErrorOnField('#editGateway .plc input[name=ip-address]');
    return {gatewayId, producer, type, protocol, name, ipAddress, description};
}

export const parseTagFromModal = function(){

}

export const parseGatewayIdFromModal = function(){
    return $(`#editGateway .gateway input[name=uniqueId]`).val();
}


export const updateTableOnMainPage = function(gateways){
    $('#gateway-main-page').empty();
    if (Array.isArray(gateways)){
        gateways.forEach(function(gateway, index){
            let row = createRowTableOnMainPage(gateway, index + 1);
            $('#gateway-main-page').append(row);
        })
    }
}

export const updateGatewayOnPopup = function(gateway, dataContainerRef){
    clearNewPLCModal();
    clearNewTagModal();
    $('#editGateway .gateway input[name=uniqueId]').val(gateway.uniqueId);
    $('#editGateway .gateway input[name=name]').val(gateway.name);
    $('#editGateway .gateway input[name=scan-time]').val(gateway.scanTime);
    $('#editGateway .gateway input[name=address]').val(gateway.address);
    $('#editGateway .gateway input[name=longitude]').val(gateway.longitude);
    $('#editGateway .gateway input[name=latitude]').val(gateway.latitude);
    $('#editGateway .gateway input[name=description]').val(gateway.description);

    $('#editGateway .gateway button').off();
    $('#editGateway .gateway button').click(async function(){
        let updatedGateway = parseGatewayFromModal('edit-gateway');
        if (updatedGateway){
            dataContainerRef.updateGateway(updatedGateway);
        }
    })
}

export const updatePLCTableOnPupup = function(plcs){
    $('#plc-popup').empty();
    if (Array.isArray(plcs)){
        plcs.forEach(function(plc, index){
            let row = createRowTableOfPLC(plc, index + 1);
            $('#plc-popup').append(row);
        })
    }

}

export const onChangeProducer = function(e){
    let producer = e.target.value;
    let types = constantUtil[producer];
    let selectType     = $('#editGateway .plc select[name=type]');
    let selectProtocol = $('#editGateway .plc select[name=protocol]');
    selectType.empty();
    selectProtocol.empty();

    for (let type in types){
        selectType.append(`<option value=${type}> ${constantUtil.getLabelOfValue(type)} </option>`)
    }
    
    if (Object.keys(types).length){
        constantUtil[producer][Object.keys(types)[0]].forEach(function(protocol){
            selectProtocol.append(`<option value=${protocol}> ${constantUtil.getLabelOfValue(protocol)} </option>`)
        })
    }
}

export const onChangePLCType = function(e){
    let selectProducer = $('#editGateway .plc select[name=producer]');
    let selectProtocol = $('#editGateway .plc select[name=protocol]');
    let producer = selectProducer.val();
    let type = e.target.value;
    selectProtocol.empty();

    if (constantUtil[producer][type]){
        constantUtil[producer][type].forEach(function(protocol){
            selectProtocol.append(`<option value=${protocol}> ${constantUtil.getLabelOfValue(protocol)} </option>`)
        })
    }
    
}

export const onChangeTagType = function(e){
    let tagType = e.target.value;

    if (tagType === 'internal'){
        $('#editGateway .tag .internal').each(function(){
            $(this).css('display', 'block');
        })
        $('#editGateway .tag .external').each(function(element){
            $(this).css('display', 'none');
        })
    }else{
        $('#editGateway .tag .internal').each(function(element){
            $(this).css('display', 'none');
        })
        $('#editGateway .tag .external').each(function(element){
            $(this).css('display', 'block');
        })
    }
}

export const onChangeAlarmEnable = function(e){
    let isEnableAlarm = e.target.checked;
    if (isEnableAlarm){
        $('#editGateway .tag .alarm').show();
    }else{
        $('#editGateway .tag .alarm').hide();
    }
}

export const onChangePLCMode = function(){
    let isEditMode = $('#switch-PLC input').prop('checked');
    console.log(isEditMode);
}

export const onChangeTagMode = function(){
    let isEditMode = $('#switch-Tag input').prop('checked');
    console.log(isEditMode);
}

function createRowTableOnMainPage(gateway, index){

    const bgColor = (index % 2 == 0) ? 'background-color: #e7e497;' : '';
    return `
        <tr id="${gateway.uniqueId}" class="gateway" style="${bgColor}">
            <td class="text-center">${(index<10)?"0"+index:index}</td>
            <td class="uniqueId">${gateway.uniqueId}</td>
            <td>${gateway.name}</td>   
            <td>${moment(gateway.createdTime).format('h:mm:ss A')}</td>
            <td>${moment(gateway.lastModified).format('h:mm:ss A')}</td>
            <td class="text-center status"><i class="material-icons disconnected">lens</i>
            </td>
            <td class="td-actions text-center">
                <button type="button" rel="tooltip" class="btn btn-danger"
                    onclick="countTotalPLCnTag('${gateway.uniqueId}')"
                    data-original-title="Gateway Info" title=""
                    data-toggle="collapse" data-target="#row-${gateway.uniqueId}">
                    <i class="material-icons">info</i>
                </button>
                <button type="button" rel="tooltip" class="btn btn-success"
                    data-original-title="Edit Gateway" title="" onclick="showEditGateway('${gateway.uniqueId}')">
                    <i class="material-icons">edit</i>
                </button>
                <button type="button" rel="tooltip" class="btn btn-danger"
                    data-original-title="Delete Gateway" title="" ondblclick="deleteGateway('${gateway.uniqueId}')">
                    <i class="material-icons">close</i>
                </button>
            </td>
        </tr>
        <tr id="row-${gateway.uniqueId}" class="collapse" style="background-color: #dddfd4;">
            <td></td>
            <td colspan="7" rowspan="3">                                                      
                <div class="row">
                    <div class="col-md-4"><b>UniqueId</b>:  ${gateway.uniqueId}</div>
                    <div class="col-md-4"><b>Name</b>:  ${gateway.name}</div>
                    <div class="col-md-4"><b>Scan Time</b>:  ${gateway.scanTime} ms</div>
                </div>  
                <div class="row">
                    <div class="col-md-4"><b>Latitude</b>:  ${gateway.latitude}</div>
                    <div class="col-md-4"><b>Longitude</b>:  ${gateway.longitude}</div>
                    <div class="col-md-4"><b>Create Time</b>:  ${moment(gateway.createdTime).format('h:mm:ss A')}</div>
                </div>  
                <div class="row">
                    <div class="col-md-4"><b>Total PLC:&nbsp;</b><span class="totalPlc"></span></div>
                    <div class="col-md-4"><b>Total Tag:&nbsp;</b><span class="totalTag"></span></div>
                    <div class="col-md-4"><b>Modified Time</b>:  ${moment(gateway.lastModified).format('h:mm:ss A')}</div>
                </div>  
                <div class="row">
                    <div class="col-md-12"><b>Address</b>:  ${gateway.address}</div>
                </div> 
                <div class="row">
                    <div class="col-md-12"><b>Description</b>:  ${gateway.description}</div>
                </div>                                                       
            </td>
        </tr>
        <tr></tr>
        <tr></tr>`
}

function createRowTableOfPLC(plc, index){
    const bgColor = (index % 2 == 0) ? 'background-color: #e7e497;' : '';
    return `
        <tr id="${plc._id}" class="plc" style="${bgColor}">
            <td class="text-center">${(index < 10) ? "0" + index : index}</td>
            <td class="text-center">${plc.name}</td>
            <td class="text-center">${constantUtil.getLabelOfValue(plc.producer)}</td>
            <td class="text-center">${constantUtil.getLabelOfValue(plc.type)}</td>
            <td class="text-center">${constantUtil.getLabelOfValue(plc.protocol)}</td>
            <td class="text-center">${plc.ipAddress}</td>
            </td>
            <td class="td-actions text-center">
                <button type="button" rel="tooltip" class="btn btn-success"
                    data-original-title="Edit PLC"   title="Edit PLC" onclick="onEditPLC('${plc._id}')">
                    <i class="material-icons">edit</i>
                </button>
                <button type="button" rel="tooltip" class="btn btn-danger"
                    data-original-title="Delete PLC" title="Delete PLC" onclick="onDeletePLC('${plc._id}')">
                    <i class="material-icons">close</i>
                </button>
            </td>
        </tr>   `
}

function createRowTableOfTag(tag, index){

}