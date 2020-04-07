require('./data');
require('./addPopupEditGW');
require('./addPopupNewGW');
require('./onGateway');
require('./onPLC');
require('./onTag');

const Gateway = require('./Gateway');
const PLC     = require('./PLC');
const Tag     = require('./Tag');
const initDataFromDB = require('./initData');


initDataFromDB();

// Display PLC table in Edit Gateway popup
window.displayPLCTable = function(){
    hiddenTable();
    $('#PLC-table').removeClass('hidden');
    // Reset Switch (new & edit) to create new
    $('#switch-PLC input')[0].checked = false;
    changeModePLC();

}


// Display Tag table in Edit Gateway popup
window.displayTagTable = function(id){
    hiddenTable();
    $('#Tag-table').removeClass('hidden');
    // Reset Switch (new & edit) to create new
    $('#switch-Tag input').prop('checked', false);
    changeModeTAG();

    // Add PLC list from gateway to create new Tag page
    let gateway = data.getGatewayById(id);
    let plcList = gateway.getPLCList();

    $('.external-tag select[name=select-plc]').empty();
    plcList.forEach((plcName)=>{
        $('.external-tag select[name=select-plc]').append(`
            <option value="${plcName}" selected>${plcName.toUpperCase()}</option>
        `)
    })
    $('.selectpicker').selectpicker('refresh');
    // Show tag table
    renderTagTable(id);

}

// Hide all table (PLC & Tag) in Edit Gateway popup
window.hiddenTable = function(){
    $('#PLC-table').addClass('hidden');
    $('#Tag-table').addClass('hidden');
    $('#switch-PLC').addClass('hidden');
    $('#switch-Tag').addClass('hidden');
}


window.changeModePLC = function(){
    let status = $('#switch-PLC input')[0].checked;

    if (status){
        // PLC in Edit mode
        $('#PLC-new').addClass('hidden');
        $('#PLC-edit').removeClass('hidden');

    }else{
        // PLC in Create New mode
        $('#PLC-new').removeClass('hidden');
        $('#PLC-edit').addClass('hidden');

        setTimeout(function(){
            refreshPLCInput();
        }, 1000)
    }
}

window.changeModeTAG = function(){
    let status = $('#switch-Tag input')[0].checked;

    if (status){
        // Tag in Edit mode
        $('#Tag-new').addClass('hidden');
        $('#Tag-edit').removeClass('hidden');
    }else{
        // Tag in Create New mode
        $('#Tag-new').removeClass('hidden');
        $('#Tag-edit').addClass('hidden');

        $('#type-tag').prop('disabled', false);
        setTimeout(function(){
            refreshTagInput();
        }, 1000)
    }
}

window.refreshPLCInput = function(){
    // Hidden switch NEW-EDIT mode
    $('#switch-PLC').addClass('hidden');
    // Enable input PLC's name field
    $('#plc-name').prop('disabled', false);
    // Clear all input fields
    $('#plc-producer').val('');
    $('#plc-type').val('');
    $('#plc-protocol').val('');
    $('#plc-name').val("");
    $('#plc-address').val("");
    $('#plc-des').val("");

    $('.selectpicker').selectpicker('refresh');
    disableFloatingLabel();
}

window.refreshTagInput = function(){
    // Hidden switch NEW-EDIT mode
    $('#switch-Tag').addClass('hidden');
    // Enable name fields of tag page
    $('.external-tag input[name=name]').prop('disabled', false);
    $('.internal-tag input[name=name]').prop('disabled', false);
    // Clear all input fields
    $('.internal-tag input[name=name]').val('');
    $('.internal-tag input[name=scale]').val('') ;
    $('.internal-tag input[name=offset]').val('');
    $('.internal-tag select[name=select-datatype]').val('');
    $('.internal-tag input[name=unit]').val('');

    $('.external-tag select[name=select-plc]').val('');
    $('.external-tag input[name=name]').val('');
    $('.external-tag input[name=scale]').val('');
    $('.external-tag input[name=offset]').val('');
    $('.external-tag input[name=minimum]').val('');
    $('.external-tag input[name=maximum]').val('');
    $('.external-tag select[name=select-datatype]').val('');
    $('.external-tag input[name=unit]').val('');
    $('#alarm-enable').prop('checked', false);
    $('.external-tag input[name=alarm-hihi]').val('');
    $('.external-tag input[name=alarm-hi]').val('');
    $('.external-tag input[name=alarm-low]').val('');
    $('.external-tag input[name=alarm-lowlow]').val('');
    $('#trend-enable').prop('checked', false);
    $('#log-enable').prop('checked', false);
    $('.external-tag input:radio[value=read]').prop('checked', true);
    $('.external-tag input:radio[value=readwrite]').prop('checked', false);
    $('.external-tag input[name=m-address]').val('');
    $('.external-tag input[name=deadband]').val('');
    $('#tag-description').val('');

    $('#alarm-enable').prop('checked', false);
    showAlarmInput();

    $('.selectpicker').selectpicker('refresh');
    disableFloatingLabel();
}

