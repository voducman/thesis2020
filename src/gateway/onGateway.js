import {showNotification, fortmatTime, Message} from '../utils';
import vectorMap          from './vectorMap';
import Gateway            from './Gateway';
import PLC                from './PLC';
import Tag                from './Tag';

let numRow;
// Add to Create new button to save new gateway
window.createGateway = function(){

    let error = false;
    let {id, name, long, lat, addrr, des, scanTime} = {
        id: $('input[name=id]').val(),
        name: $('input[name=name]').val(),
        long: parseFloat($('input[name=longitude]').val()),
        lat:  parseFloat($('input[name=latitude]').val()),
        addrr: $('input[name=address]').val(),
        des:  $('textarea[name=description]').val() || "",
        scanTime: parseInt($('input[name=scan-time]').val())
    }

    // Check error on every input tag
    if (id.trim().length == 0){
       $('input[name=id]').parent().addClass('has-error'); error = true;
    }

    if (name.trim().length == 0){
       $('input[name=name]').parent().addClass('has-error'); error = true;
    }

    if (isNaN(long)){
       $('input[name=longitude]').parent().addClass('has-error'); error = true;
    }

    if (isNaN(lat)){
       $('input[name=latitude]').parent().addClass('has-error'); error = true;
    }

    if (addrr.trim().length == 0){
       $('input[name=address]').parent().addClass('has-error'); error = true;
    }

    if (isNaN(scanTime) || scanTime < 500){
       $('input[name=scan-time]').parent().addClass('has-error'); error = true;
    }
    
    if (error || data.isDuplicateGateway(name, id)){
       showNotification('top', 'right', 'warning', "This Gateway is a DUPLICATE or ERROR, please enter it again");
       return;
    }
    
    // Create new Gateway object

    let gateway = new Gateway(id, name, long, lat, addrr, des, scanTime);
    data.external.push(gateway);
    showNotification('top', 'right', 'success', "Adding Gateway is success");
    // Render a row of new gateway to table
    renderRow(gateway, data.external.length);
    vectorMap.renderVectorMap();
    numRow = data.external.length;
    $('#last-gateway').click();
}

window.updateGateway = function(id){

   let error = false;
   let { name, long, lat, addrr, des, scanTime } = {
       name: $('input[name=name]').val(),
       long: parseFloat($('input[name=longitude]').val()),
       lat: parseFloat($('input[name=latitude]').val()),
       addrr: $('input[name=address]').val(),
       des: $('textarea[name=description]').val() || "",
       scanTime: parseInt($('input[name=scan-time]').val())
   }

    // Check error on every input tag
    if (name.trim().length == 0){
       $('input[name=name]').parent().addClass('has-error'); error = true;
    }

    if (isNaN(long)){
       $('input[name=longitude]').parent().addClass('has-error'); error = true;
    }

    if (isNaN(lat)){
       $('input[name=latitude]').parent().addClass('has-error'); error = true;
    }

    if (addrr.trim().length == 0){
       $('input[name=address]').parent().addClass('has-error'); error = true;
    }

    if (isNaN(scanTime) || scanTime < 500){
       $('input[name=scan-time]').parent().addClass('has-error'); error = true;
    }
    
    if (error){
       showNotification('top', 'right', 'danger', "This Gateway is a ERROR, please enter it again");
       return;
    }
    
    // Update Gateway object
    let newGateway = new Gateway(id, name, long, lat, addrr, des, scanTime)
    let [gateway, index] = data.updateGatewayById(id, newGateway);
    console.log("update gateway success in data")
    // Render a row of new gateway to table
    reRenderRow(`gateway-${id}`, gateway, index+1);
    vectorMap.renderVectorMap();
    showNotification('top', 'right', 'success', "Update Gateway is success");
}


window.deleteGateway = function(id){
    console.log(data.external);

    swal({
        title: 'Are you sure?',
        text: 'You will not be able to recover this Gateway!',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, keep it',
        confirmButtonClass: "btn btn-success",
        cancelButtonClass: "btn btn-danger",
        buttonsStyling: false
    }).then(function () {

        data.deleteGatewayById(id);
        // Delete all row of gateway 
        $('#render-row').empty();
        data.external.forEach(function(gateway, index){
            renderRow(gateway, index+1);
        })
        vectorMap.renderVectorMap();

        numRow = data.external.length;
        $('#last-gateway').click();

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
window.renderRow = function(gateway, index){
    numRow = index;
    gateway.updatePLCnTag();
    const isFirstRender = (index < 11) ? '' : 'display: none;';
    const bgColor = (index % 2 == 0) ? 'background-color: #e7e497;' : '';
    // Index in range of [1...N]
    $('#render-row').append(`
        <tr id="gateway-${gateway.id}" class="gateway-${index}" style="${bgColor} ${isFirstRender}">
            <td class="text-center">${(index<10)?"0"+index:index}</td>
            <td>${gateway.name}</td>
            <td>${fortmatTime(gateway.createdTime)}</td>
            <td>${fortmatTime(gateway.modified)}</td>
            <td class="text-center">${gateway.PLCnum}</td>
            <td class="text-center">${gateway.Tagnum}</td>
            <td class="text-center"><i class="material-icons ${(gateway.status)?"connected":"disconnected"}">lens</i>
            </td>
            <td class="td-actions text-center">
                <button type="button" rel="tooltip" class="btn btn-danger"
                    data-original-title="Gateway Info" title=""
                    data-toggle="collapse" data-target="#row-${index}">
                    <i class="material-icons">info</i>
                </button>
                <button type="button" rel="tooltip" class="btn btn-success"
                    data-original-title="Edit Gateway" title="" onclick="showEditGateway('${gateway.id}')">
                    <i class="material-icons">edit</i>
                </button>
                <button type="button" rel="tooltip" class="btn btn-danger"
                    data-original-title="Delete Gateway" title="" onclick="deleteGateway('${gateway.id}')">
                    <i class="material-icons">close</i>
                </button>
            </td>
        </tr>
        <tr id="row-${index}" class="collapse" style="background-color: #dddfd4;">
            <td></td>
            <td colspan="7" rowspan="3">                                                      
                <div class="row">
                    <div class="col-md-4"><b>ID</b>:  ${gateway.id}</div>
                    <div class="col-md-4"><b>Name</b>:  ${gateway.name}</div>
                    <div class="col-md-4"><b>Scan Time</b>:  ${gateway.scanTime}</div>
                </div>  
                <div class="row">
                    <div class="col-md-4"><b>Latitude</b>:  ${gateway.latitude}</div>
                    <div class="col-md-4"><b>Longitude</b>:  ${gateway.longitude}</div>
                    <div class="col-md-4"><b>Create Time</b>:  ${fortmatTime(gateway.createdTime)}</div>
                </div>  
                <div class="row">
                    <div class="col-md-4"><b>Number PLC</b>:  ${gateway.PLCnum}</div>
                    <div class="col-md-4"><b>Number Tag</b>:  ${gateway.Tagnum}</div>
                    <div class="col-md-4"><b>Modified Time</b>:  ${fortmatTime(gateway.modified)}</div>
                </div>  
                <div class="row">
                    <div class="col-md-12"><b>Position</b>:  ${gateway.position}</div>
                </div> 
                <div class="row">
                    <div class="col-md-12"><b>Description</b>:  ${gateway.description}</div>
                </div>                                                       
            </td>
        </tr>
        <tr></tr>
        <tr></tr>
    `)
  }

  // Re-render a row of table Gateway
  window.reRenderRow = function(htmlId, gateway, index){

    // Remove old row of gateway
    $(`#${htmlId}`).empty();

    // Re-render a new row of gateway
    $(`#${htmlId}`).append(`
        <td class="text-center">${(index<10)?"0"+index:index}</td>
        <td>${gateway.name}</td>
        <td>${fortmatTime(gateway.createdTime)}</td>
        <td>${fortmatTime(gateway.modified)}</td>
        <td class="text-center">${gateway.PLCnum}</td>
        <td class="text-center">${gateway.Tagnum}</td>
        <td class="text-center"><i class="material-icons ${(gateway.status)?"connected":"disconnected"}">lens</i>
        </td>
        <td class="td-actions text-center">
            <button type="button" rel="tooltip" class="btn btn-danger"
                data-original-title="Gateway Info" title=""
                data-toggle="collapse" data-target="#row-${index}">
                <i class="material-icons">info</i>
            </button>
            <button type="button" rel="tooltip" class="btn btn-success"
                data-original-title="Edit Gateway" title="" onclick="showEditGateway('${gateway.id}')">
                <i class="material-icons">edit</i>
            </button>
            <button type="button" rel="tooltip" class="btn btn-danger"
                data-original-title="Delete Gateway" title="" onclick="deleteGateway('${gateway.id}')">
                <i class="material-icons">close</i>
            </button>
    `)
  }


  // Handle page navigation action

$('#first-gateway').click(function(){
    console.log(numRow)
    for (let i = 1; i<= numRow; i++){
        if (i <= 10) $(`.gateway-${i}`).show();
        else         $(`.gateway-${i}`).hide();
    }

    if (numRow <= 20) {
        $('#back-gateway').html('1');
        $('#current-gateway').html('2');
        $('#next-gateway').parent().hide();
        $('#back-gateway').parent().addClass('active');
        $('#current-gateway').parent().removeClass('active');
    }else{
        $('#back-gateway').html('1');
        $('#current-gateway').html('2');
        $('#next-gateway').parent().show();
        $('#next-gateway').html('3');
        $('#back-gateway').parent().addClass('active');
        $('#current-gateway').parent().removeClass('active');
        $('#next-gateway').parent().removeClass('active');
    }
    $('#pagination-gateway p').text(`Showing 1 to 10 of ${numRow} entries`);
})

$('#back-gateway').click(function(){    
    if (numRow <= 20) {
        for (let i = 1; i<= numRow; i++){
            if (i <= 10) $(`.gateway-${i}`).show();
            else         $(`.gateway-${i}`).hide();
        }

        $('#back-gateway').parent().show();
        $('#current-gateway').parent().show();
        $('#back-gateway').parent().addClass('active');
        $('#current-gateway').parent().removeClass('active');
        $('#pagination-gateway p').text(`Showing 1 to 10 of ${numRow} entries`);
    }else{
        let current = parseInt( $('#back-gateway').html());

        for (let i = 1; i<= numRow; i++){
            if (i <= current*10 && i > current*10-10) 
                $(`.gateway-${i}`).show();
            else         
                $(`.gateway-${i}`).hide();
        }

        if (current > 1){ // Rotate pagination
            $('#back-gateway').html(current-1);
            $('#current-gateway').html(current);
            $('#next-gateway').html(current+1);
            $('#back-gateway').parent().removeClass('active');
            $('#current-gateway').parent().addClass('active');
            $('#next-gateway').parent().removeClass('active');
            $('#pagination-gateway p').text(`Showing ${current*10-9} to ${current*10} of ${numRow} entries`);
        }else{         // Don't rotate pagination
            $('#back-gateway').parent().addClass('active');
            $('#current-gateway').parent().removeClass('active');
            $('#next-gateway').parent().removeClass('active');
            $('#pagination-gateway p').text(`Showing 1 to 10 of ${numRow} entries`);
        }
        
    }
    
})

$('#current-gateway').click(function(){
    let current = parseInt($('#current-gateway').html());
    if (current == 2){
        for (let i = 1; i<= numRow; i++){
            if ( i > 10 && i <= 20) $(`.gateway-${i}`).show();
            else         $(`.gateway-${i}`).hide();
        }

        $('#back-gateway').parent().removeClass('active');
        $('#current-gateway').parent().addClass('active');
        $('#next-gateway').parent().removeClass('active');
        $('#pagination-gateway p').text(`Showing 11 to ${(numRow>20)? '20': numRow} of ${numRow} entries`);
    }else if(current == Math.ceil(numRow/10)-1){
        for (let i = 1; i<= numRow; i++){
            if (i <= current*10 && i > current*10-10) $(`.gateway-${i}`).show();
            else         $(`.gateway-${i}`).hide();
        }

        $('#back-gateway').parent().removeClass('active');
        $('#current-gateway').parent().addClass('active');
        $('#next-gateway').parent().removeClass('active');
        $('#pagination-gateway p').text(`Showing ${current*10-9} to ${current*10} of ${numRow} entries`);
    }
})

$('#next-gateway').click(function(){
    let current = parseInt($('#next-gateway').html());

    for (let i = 1; i <= numRow; i++) {
        if (i <= current * 10 && i > current * 10 - 10) $(`.gateway-${i}`).show();
        else $(`.gateway-${i}`).hide();
    }

    if (current == 3 && numRow <= 30) { // Don't rotate pagination
        $('#back-gateway').parent().removeClass('active');
        $('#current-gateway').parent().removeClass('active');
        $('#next-gateway').parent().addClass('active');
        $('#pagination-gateway p').text(`Showing ${current*10-9} to ${numRow} of ${numRow} entries`);
    } else if (current >= 3 && current < Math.ceil(numRow/10)){         // Rotate pagination
        $('#back-gateway').html(current - 1);
        $('#current-gateway').html(current);
        $('#next-gateway').html(current + 1);
        $('#back-gateway').parent().removeClass('active');
        $('#current-gateway').parent().addClass('active');
        $('#next-gateway').parent().removeClass('active');
        $('#pagination-gateway p').text(`Showing ${current*10-9} to ${current*10} of ${numRow} entries`);
    }else{
        $('#back-gateway').parent().removeClass('active');
        $('#current-gateway').parent().removeClass('active');
        $('#next-gateway').parent().addClass('active');
        $('#pagination-gateway p').text(`Showing ${current*10-9} to ${numRow} of ${numRow} entries`);
    }
    
})

$('#last-gateway').click(function(){
    for (let i = 1; i<= numRow; i++){
        if (i > 10*Math.floor(numRow/10)) $(`.gateway-${i}`).show();
        else         $(`.gateway-${i}`).hide();
    }

    if (numRow <= 20) {
        $('#back-gateway').parent().show();
        $('#back-gateway').html('1');
        $('#current-gateway').parent().show();
        $('#current-gateway').html('2');
        $('#next-gateway').parent().hide();
        $('#back-gateway').parent().removeClass('active');
        $('#current-gateway').parent().addClass('active');
    }else{
        $('#back-gateway').parent().show();
        $('#back-gateway').html(Math.ceil(numRow/10)-2);
        $('#current-gateway').parent().show();
        $('#current-gateway').html(Math.ceil(numRow/10)-1);
        $('#next-gateway').parent().show();
        $('#next-gateway').html(Math.ceil(numRow/10));
        $('#back-gateway').parent().removeClass('active');
        $('#current-gateway').parent().removeClass('active');
        $('#next-gateway').parent().addClass('active');
    }
    $('#pagination-gateway p').text(`Showing ${10*Math.floor(numRow/10)+1} to ${numRow} of ${numRow} entries`);
})