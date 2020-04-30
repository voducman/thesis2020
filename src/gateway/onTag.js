import gateway from './Gateway';
import PLC     from './PLC';
import Tag     from './Tag';
import {showNotification, Message, fortmatTime} from '../utils';
import initPagigation from './pagigation';

window.numRowTag = 0;

window.showAlarmInput = function(){
    let checked = $('#alarm-enable')[0].checked;
    if (checked){
        $('.alarm-').each(function(){
            $(this).parent().parent().fadeTo(500, 1);
            $(this).prop('disabled', false);
        });

    }else{
        $('.alarm-').each(function(){
            $(this).parent().parent().fadeTo(500, 0.4);
            $(this).prop('disabled', true);
        });
    }
}

/**
 * @summary: function for interacting in Tag page of popup
 */
window.changeTypeTag = function(){
    let typeTag = $('#type-tag').val();
    // console.log(typeVar)
    if (typeTag == 'internal'){
        $('.internal-tag').removeClass('hidden');
        $('.external-tag').each(function(){
            $(this).addClass('hidden');
        })

    }else{
        $('.internal-tag').addClass('hidden');
        $('.external-tag').each(function(){
            $(this).removeClass('hidden');
        })

    }
}

/*
 *******************************************************************************************************************
 *******************************************************************************************************************
 */

window.createNewTag = function(id) {
    let error = false, errorMess = "";
    let type, plc, name, scale, offset, min, max, dataType;
    let unit, alarm, trend, log, access, memAddr, deadband;
    let description, alarmObj;
    
    type = $('#type-tag').val();

    if (type == 'internal'){
        name =     $('.internal-tag input[name=name]').val();
        scale =    $('.internal-tag input[name=scale]').val() ;
        offset =   $('.internal-tag input[name=offset]').val();
        dataType = $('.internal-tag select[name=select-datatype]').val();
        unit =     $('.internal-tag input[name=unit]').val();

        if (name.length == 0) {
            $('.internal-tag input[name=name]').parent().addClass('has-error');
            errorMess = ' Name';
            error = true;
        }
        if (unit.length == 0) {
            $('.internal-tag input[name=unit]').parent().addClass('has-error');
            errorMess += ' Unit';
            error = true;
        }
        if (dataType.length == 0) {
            error = true;
            errorMess += ' DataType';
        }

    }else{
        plc = $('.external-tag select[name=select-plc]').val();
        name =  $('.external-tag input[name=name]').val();
        scale = $('.external-tag input[name=scale]').val();
        offset = $('.external-tag input[name=offset]').val();
        min = $('.external-tag input[name=minimum]').val();
        max = $('.external-tag input[name=maximum]').val();
        dataType = $('.external-tag select[name=select-datatype]').val();
        unit = $('.external-tag input[name=unit]').val();
        alarm = $('#alarm-enable')[0].checked;
        trend = $('#trend-enable')[0].checked;
        log   = $('#log-enable')[0].checked;
        access = $('.external-tag input:radio:checked').val();
        memAddr = $('.external-tag input[name=m-address]').val();
        deadband = $('.external-tag input[name=deadband]').val();

        if (alarm){
            alarmObj = {
                hihi:   $('.external-tag input[name=alarm-hihi]').val(),
                hi:     $('.external-tag input[name=alarm-hi]').val(),
                low:    $('.external-tag input[name=alarm-low]').val(),
                lowlow: $('.external-tag input[name=alarm-lowlow]').val()
            }

            if (!(alarmObj.hihi.length && alarmObj.hi.length && alarmObj.low.length && alarmObj.lowlow.length)){
                errorMess = 'Alarm';
                error = true;
            }
        }

        if (plc.length == 0){
            error = true;
            errorMess += ' PLC';
        }
        if (name.length == 0){
            $('.external-tag input[name=name]').parent().addClass('has-error');
            errorMess += ' Name';
            error = true;
        }
        if (dataType.length == 0){
            error = true;
            errorMess += ' DataType';
        }
        if (unit.length == 0){
            $('.external-tag input[name=unit]').parent().addClass('has-error');
            errorMess += ' Unit';
            error = true;
        }
        if (memAddr.length == 0){
            $('.external-tag input[name=m-address]').parent().addClass('has-error');
            errorMess += ' MemoryAddress ';
            error = true;
        }
          

    }
    description = $('#tag-description').val();
    // For only debug...
    let result = {
        type, plc, name, scale, offset, min, max, dataType,
        unit, alarm, alarmObj, trend, log, access, memAddr,
        deadband, description, alarmObj
    }
    console.log(result);

    if (error){
        showNotification("top", "right", "danger", '<b>ERROR: </b>' + errorMess +' fields are empty.');
        return;
    }
    
    if (type == 'internal'){
        // Create internal tag
        let result = data.addInternalTag(name, scale, offset, dataType, unit, description);
        if (!result) showNotification("top", "right", "danger", "<b>ERROR: </b> Tag is dupliated");
        else         showNotification("top", "right", "success", "<b>SUCCESS: </b> Tag is added to Internal successfully");

    }else{
        // Create external tag
        let newTag = new Tag(name, scale, offset, min, max, description,
                          unit, memAddr, dataType, deadband, trend, 
                          log, alarmObj);
        console.log('Create new Tag: ', newTag)                  
        let result = data.addTag2PLCByIdName(id, plc, newTag);
        if (!result) showNotification("top", "right", "danger", "<b>ERROR: </b> Tag is dupliated");
        else         showNotification("top", "right", "success", "<b>SUCCESS: </b> Tag is added to External successfully");
    }

    renderTagTable(id);

}


window.deleteCurrentTag = function(gwId, plcName, tagName){
    
    if (plcName == '---'){
        // Internal tag
        data.deleteInteralTag(tagName);
    }else{
        // External tag
        data.deleteTagByIdName(gwId, plcName, tagName);
    }
    showNotification('top', 'right', 'warning', '<b>WARNING: </b> Delete tag successfully');
    // Re-render tag table
    renderTagTable(gwId);
}


window.editCurrentTag = function(gwId, plcName, tagName){
    let tag;
    if (plcName == '---'){
        // Internal tag
        tag = data.getInternalTagByName(tagName);
        $('#type-tag').val('internal');
        $('.internal-tag input[name=name]').val(tag.name);
        $('.internal-tag input[name=name]').prop('disabled', true);
        $('.internal-tag input[name=scale]').val(tag.scale) ;
        $('.internal-tag input[name=offset]').val(tag.offset);
        $('.internal-tag select[name=select-datatype]').val(tag.dataType);
        $('.internal-tag input[name=unit]').val(tag.unit);
    
    }else{
        // External tag
        tag = data.getGatewayById(gwId).getPLCByName(plcName).getTagByName(tagName);
        $('#type-tag').val('external');

        $('.external-tag select[name=select-plc]').val(plcName);
        $('.external-tag input[name=name]').val(tag.name);
        $('.external-tag input[name=name]').prop('disabled', true);
        $('.external-tag input[name=scale]').val(tag.scale);
        $('.external-tag input[name=offset]').val(tag.offset);
        $('.external-tag input[name=minimum]').val(tag.minimum);
        $('.external-tag input[name=maximum]').val(tag.maximum);
        $('.external-tag select[name=select-datatype]').val(tag.dataType);
        $('.external-tag input[name=unit]').val(tag.unit);
        
        if (typeof tag.alarm != 'undefined'){
            $('#alarm-enable').prop('checked', true);
            showAlarmInput();
            $('.external-tag input[name=alarm-hihi]').val(tag.alarm.hihi),
            $('.external-tag input[name=alarm-hi]').val(tag.alarm.hi),
            $('.external-tag input[name=alarm-low]').val(tag.alarm.low),
            $('.external-tag input[name=alarm-lowlow]').val(tag.alarm.lowlow);
        }else{
            $('#alarm-enable').prop('checked', false);
            showAlarmInput();
        }
        

        $('#trend-enable').prop('checked', tag.trend);
        $('#log-enable').prop('checked', tag.log);

        if (tag.access == 'read'){
            $('.external-tag input:radio[value=read]').prop('checked', true);
        }else{
            $('.external-tag input:radio[value=readwrite]').prop('checked', true);
        }

        $('.external-tag input[name=m-address]').val(tag.memoryAdd);
        $('.external-tag input[name=deadband]').val(tag.deadband);
    }

    $('#tag-description').val(tag.description);

    $('#Tag-edit').empty();
    $('#Tag-edit').append(`
        <div class="text-center">
            <button type="button" rel="tooltip" class="btn btn-success btn-round" data-original-title=""
                title="Update Tag" onclick="updateTag('${gwId}', '${plcName}')">
                <i class="material-icons">save</i>
                Save
            </button>
        </div>
    `)

    $('#type-tag').prop('disabled', true);
    // Show switch tag [new - edit] mode
    $('#switch-Tag').removeClass('hidden');
    $('#switch-Tag input').prop('checked', true);
    // Show save button/ hide create new button
    $('#Tag-new').addClass('hidden');
    $('#Tag-edit').removeClass('hidden');   

    changeTypeTag();
    $('.selectpicker').selectpicker('refresh');
    disableFloatingLabel();
    console.log(tag);

}

window.updateTag = function(gwId, plcName){
    let error = false, errorMess = "";
    let type, plc, name, scale, offset, min, max, dataType;
    let unit, alarm, trend, log, access, memAddr, deadband;
    let description, alarmObj;

    description = $('#tag-description').val();

    if (plcName == '---'){
        // Update internal tag
        name =     $('.internal-tag input[name=name]').val();
        scale =    $('.internal-tag input[name=scale]').val() ;
        offset =   $('.internal-tag input[name=offset]').val();
        dataType = $('.internal-tag select[name=select-datatype]').val();
        unit =     $('.internal-tag input[name=unit]').val();

        if (name.length == 0) {
            $('.internal-tag input[name=name]').parent().addClass('has-error');
            errorMess = ' Name';
            error = true;
        }
        if (unit.length == 0) {
            $('.internal-tag input[name=unit]').parent().addClass('has-error');
            errorMess += ' Unit';
            error = true;
        }
        if (dataType.length == 0) {
            error = true;
            errorMess += ' DataType';
        }

        
    }else{
        // Update external tag
        name =  $('.external-tag input[name=name]').val();
        scale = $('.external-tag input[name=scale]').val();
        offset = $('.external-tag input[name=offset]').val();
        min = $('.external-tag input[name=minimum]').val();
        max = $('.external-tag input[name=maximum]').val();
        dataType = $('.external-tag select[name=select-datatype]').val();
        unit = $('.external-tag input[name=unit]').val();
        alarm = $('#alarm-enable')[0].checked;
        trend = $('#trend-enable')[0].checked;
        log   = $('#log-enable')[0].checked;
        access = $('.external-tag input:radio:checked').val();
        memAddr = $('.external-tag input[name=m-address]').val();
        deadband = $('.external-tag input[name=deadband]').val();

        if (alarm){
            alarmObj = {
                hihi:   $('.external-tag input[name=alarm-hihi]').val(),
                hi:     $('.external-tag input[name=alarm-hi]').val(),
                low:    $('.external-tag input[name=alarm-low]').val(),
                lowlow: $('.external-tag input[name=alarm-lowlow]').val()
            }

            if (!(alarmObj.hihi.length && alarmObj.hi.length && alarmObj.low.length && alarmObj.lowlow.length)){
                errorMess = 'Alarm';
                error = true;
            }
        }

        if (name.length == 0){
            $('.external-tag input[name=name]').parent().addClass('has-error');
            errorMess += ' Name';
            error = true;
        }
        if (dataType.length == 0){
            error = true;
            errorMess += ' DataType';
        }
        if (unit.length == 0){
            $('.external-tag input[name=unit]').parent().addClass('has-error');
            errorMess += ' Unit';
            error = true;
        }
        if (memAddr.length == 0){
            $('.external-tag input[name=m-address]').parent().addClass('has-error');
            errorMess += ' MemoryAddress ';
            error = true;
        }
          
    }
    
    if (error){
        showNotification("top", "right", "danger", '<b>ERROR: </b>' + errorMess +' fields are empty.');
        return;
    }
    
    if (plcName == '---'){
        data.updateInternalTag(name, scale, offset, dataType, unit, description);
        showNotification("top", "right", "success", "<b>SUCCESS: </b> Tag is updated to Internal successfully");

    }else{
        let newTag = new Tag(name, scale, offset, min, max, description,
                          unit, memAddr, dataType, deadband, trend, 
                          log, alarmObj);
        data.updateTag2PLCByIdName(gwId, plcName, newTag);               
        showNotification("top", "right", "success", "<b>SUCCESS: </b> Tag is updated to External successfully");
    }

    renderTagTable(gwId);
}

/*
 *******************************************************************************************************************
 *******************************************************************************************************************
 */


window.renderTagRow = function(tag, type, index, gwId, plcName){

    const isFirstRender = (index < 11) ? '' : 'display: none;';
    const bgColor = (index % 2 == 0) ? 'background-color: #e7e497;' : '';
    $('#render-tag').append(`
        <tr id="tag-${tag.name}"  class="tag-${index}" style="${bgColor} ${isFirstRender}">
            <td class="text-center">${(index<10)?"0"+index:index}</td>
            <td class="text-center">${tag.name}</td>
            <td class="text-center">${type}</td>
            <td class="text-center">${tag.unit.toUpperCase()}</td>
            <td class="text-center">${(tag.memoryAdd)? tag.memoryAdd.toUpperCase() : '---'}</td>
            <td class="text-center">${tag.dataType.toUpperCase()}</td>
            <td class="text-center">${(tag.trend)? Message(tag.trend) : '---'}</td>
            <td class="text-center">${(tag.log)? Message(tag.log) : '---'}</td>
            <td class="text-center">${(tag.alarm)? 'TRUE' : '---'}</td>
            <td class="td-actions text-center">
                <button type="button" rel="tooltip" class="btn btn-success"
                    data-original-title="" title="Edit TAG" onclick="editCurrentTag('${gwId}', '${plcName}', '${tag.name}')">
                    <i class="material-icons">edit</i>
                </button>
                <button type="button" rel="tooltip" class="btn btn-danger"
                    data-original-title="" title="Delete TAG" onclick="deleteCurrentTag('${gwId}', '${plcName}', '${tag.name}')">
                    <i class="material-icons">close</i>
                </button>
            </td>
        </tr>`)
  }

  /**
   * @param {string} gwId: id of gateway include this PLC
   * @param {string} plcName: name of Plc include this Tag
   */
  window.renderTagTable = function(gwId){
    let index = 0;
    $('#render-tag').empty();

    // Render rows of external tag
    data.getGatewayById(gwId).PLCs.forEach((plc) => {
        plc.Tags.forEach((tag) => {
            index++;
            renderTagRow(tag, "EXTERNAL", index, gwId, plc.name);
        })
    })

    // Render rows of internal tag
    data.internal.forEach((tag) => {
        index++;
        renderTagRow(tag, "INTERNAL", index, gwId, '---');
    })

    numRowTag = index;
    initPagigation(numRowTag, 'tag');
    console.log('Init pagination here') 
  }

