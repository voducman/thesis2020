import {showNotification, Message, fortmatTime} from '../utils';

window.changePLCList = function () {
    let producer = $('#plc-producer').val();
    console.log(producer);
    switch (producer) {
        case 'siemens':
            $('#plc-type').empty();
            $('#plc-type').append(`
                <option value="S7-300">S7-300</option>
                <option value="s7-1200">S7-1200</option>
                <option value="s7-1500">S7-1500</option>
            `)

            break;
        case 'schneider':
            $('#plc-type').empty()
            break;
        case 'mitsubishi':
            $('#plc-type').empty()
            break;
    }

    $('.selectpicker').selectpicker('refresh');
}


window.changePLCTypeList = function () {
    let PLCType = $('#plc-type').val();
    console.log(PLCType)
    switch (PLCType) {
        case 's7-1500':
            $('#plc-protocol').empty();
            $('#plc-protocol').append(`
                <option value="modbus">Modbus TCP</option>
                <option value="opcua">OPC UA</option>
                <option value="s7">Ethernet S7</option>
            `)
            break;
        case 's7-300':
        case 's7-1200':
            $('#plc-protocol').empty();
            $('#plc-protocol').append(`
                <option value="modbus">Modbus TCP</option>
                <option value="s7">Ethernet S7</option>
            `)
            break;
    }

    $('.selectpicker').selectpicker('refresh');

}



window.createNewPLC = function(id){
    let error = false;
    let [producer, type, name, IPaddrress, protocol, description] = [
        $('#plc-producer').val(), 
        $('#plc-type').val(),
        $('#plc-name').val(),
        $('#plc-address').val(),
        $('#plc-protocol').val(),
        $('#plc-des').val()
    ]

    console.log([producer, type, name, IPaddrress, protocol, description]);
    if (producer.trim() == "" || producer == undefined){
        error = true;
    }
    if (type.trim() == "" || type == undefined){
        error = true;
    }
    if (name.trim().length == 0){
        error = true;
        $('#plc-name').parent().addClass('has-error');
    }
    if (!ipaddr.isValid(IPaddrress.trim())){
        error = true;
        $('#plc-address').parent().addClass('has-error');
    }
    if (protocol.trim().length == 0){
        error = true;
        $('#plc-protocol').parent().addClass('has-error');
    }

    if (error){
        showNotification('top', 'right', 'danger', "This PLC is a DUPLICATE or ERROR, please enter it again");
        return;
    }

    let plc = new PLC(producer, type, name, IPaddrress, protocol, description);
    console.log('PLC:', plc);

    let result = data.addPLC2GatewayById(id, plc);

    if (!result){
        showNotification('top', 'right', 'warning', "This PLC is a DUPLICATE, please enter it again");
        return;
    }
    showNotification('top', 'right', 'success', "This PLC is is added successfully");
    renderPLCTable(id);
}   


window.updatePLC = function(id, name){
    let error = false;
    let [producer, type, IPaddrress, protocol, description] = [
        $('#plc-producer').val(), 
        $('#plc-type').val(),
        $('#plc-address').val(),
        $('#plc-protocol').val(),
        $('#plc-des').val()
    ]

    if (producer.trim() == "" || producer == undefined){
        error = true;
    }
    if (type.trim() == "" || type == undefined){
        error = true;
    }
    if (!ipaddr.isValid(IPaddrress.trim())){
        error = true;
        $('#plc-address').parent().addClass('has-error');
    }
    if (protocol.trim().length == 0){
        error = true;
        $('#plc-protocol').parent().addClass('has-error');
    }

    if (error){
        showNotification('top', 'right', 'danger', "This PLC is a ERROR, please enter it again");
        return;
    }

    let newPLC = new PLC(producer, type, name, IPaddrress, protocol, description);
    console.log('PLC:', newPLC);

    // call function update in data here...
    data.updatePLCByNamenId(id, name, newPLC);
   
    showNotification('top', 'right', 'success', "This PLC is is updated successfully");
    // Re-render PLC table
    renderPLCTable(id);
}   

/**
 * @param id  : id of current Gateway which include this PLC
 * @param name: name of current PLC for edit
 */
window.editCurrentPLC = function(id, name){
    let plc = data.getGatewayById(id).getPLCByName(name);

    $('#plc-producer').val(plc.producer);
    // Render PLC list selection
    changePLCList();
    $('#plc-type').val(plc.type);
    changePLCTypeList();
    $('#plc-protocol').val(plc.protocol);

    $('#plc-name').val(plc.name);
    $('#plc-name').prop('disabled', true);
    $('#plc-address').val(plc.IPaddrress);
    $('#plc-protocol').change();
    $('#plc-des').val(plc.description);

    $('.selectpicker').selectpicker('refresh');
    disableFloatingLabel();

    $('#PLC-edit').empty();
    $('#PLC-edit').append(`
        <div class="text-center">
            <button type="button" rel="tooltip" class="btn btn-success btn-round" data-original-title=""
                title="Update PLC" onclick="updatePLC('${id}', '${name}')">
                <i class="material-icons">save</i>
                Save
            </button>
        </div>
    `)

    $('#switch-PLC').removeClass('hidden');
    $('#switch-PLC input').prop('checked', true);
    // Show Save PLC button after edit
    $('#PLC-new').addClass('hidden');
    $('#PLC-edit').removeClass('hidden');

}

/**
 * @param id  : id of current Gateway which include this PLC
 * @param name: name of current PLC for delete
 */
window.deleteCurrentPLC = function(id, name){

    swal({
        title: 'Are you sure?',
        text: 'You will not be able to recover this PLC!',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, keep it',
        confirmButtonClass: "btn btn-success",
        cancelButtonClass: "btn btn-danger",
        buttonsStyling: false
    }).then(function () {

        data.deletePLCByNamenId(id, name);
        // Delete all row of gateway 
        renderPLCTable(id);

        swal({
            title: 'Deleted!',
            text: 'Your imaginary file has been deleted.',
            type: 'success',
            confirmButtonClass: "btn btn-success",
            buttonsStyling: false
        })
    }, function (dismiss) {
        // dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'
        if (dismiss === 'cancel') {
            swal({
                title: 'Cancelled',
                text: 'Your Gateway is safe :)',
                type: 'error',
                confirmButtonClass: "btn btn-info",
                buttonsStyling: false
            })
        }
    })
}


// Render a row of table Gateway
window.renderPLCRow = function (plc, index, id) {

    const bgColor = (index % 2 == 0) ? `style="background-color: #e7e497;"` : "";

    // Index in range of [1...N]
    $('#render-plc').append(`
        <tr ${bgColor} id="plc-${plc.name}">
            <td class="text-center">${(index < 10) ? "0" + index : index}</td>
            <td class="text-center">${plc.name}</td>
            <td class="text-center">${Message(plc.producer)}</td>
            <td class="text-center">${Message(plc.type)}</td>
            <td class="text-center">${Message(plc.protocol)}</td>
            <td class="text-center">${plc.Tags.length}</td>
            <td class="text-center">${plc.IPaddrress}</td>
            </td>
            <td class="td-actions text-center">
                <button type="button" rel="tooltip" class="btn btn-success"
                    data-original-title="Edit PLC"   title="Edit PLC" onclick="editCurrentPLC('${id}', '${plc.name}')">
                    <i class="material-icons">edit</i>
                </button>
                <button type="button" rel="tooltip" class="btn btn-danger"
                    data-original-title="Delete PLC" title="Delete PLC" onclick="deleteCurrentPLC('${id}', '${plc.name}')">
                    <i class="material-icons">close</i>
                </button>
            </td>
        </tr>             
      
    `)
}

/**
 * @param id: id of gateway include this PLCs
 */
window.renderPLCTable = function (id) {
    // Remove old PLC table
    $('#render-plc').empty();
    data.getGatewayById(id).PLCs.forEach(function (plc, index) {
        renderPLCRow(plc, index + 1, id);
    })
}