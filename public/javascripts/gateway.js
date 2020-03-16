// A collection of gateways
let data = {
    external: [],
    internal: []
};

// Prototype data of gateway
function Gateway(id, name, long, lat, pos, des, scanTime){
    this.id = id;
    this.name = name;
    this.longitude = long;
    this.latitude = lat;
    this.position = pos;
    this.description = des;
    this.scanTime = scanTime;
    this.PLCnum = 0;
    this.Tagnum = 0;
    this.createdTime = Date.now();
    this.modified = Date.now();
    this.status = false;
    this.PLCs = [];

}

Gateway.prototype.updatePLCnTag = function(){
    let tagCount = 0;

    this.PLCnum = this.PLCs.length;

    if (this.PLCs.length > 0){
        this.Tagnum = this.PLCs.forEach(function(plc, index){
            tagCount += plc.Tags.length;
        });
    }
    
}



function PLC(producer, type, name, IPaddrr, protocol, des){
    this.producer = producer;
    this.type = type;
    this.name = name;
    this.IPaddrress = IPaddrr;
    this.protocol = protocol;
    this.description = des;
    this.Tags = [];
    this.modified = Date.now();
    this.createdTime = Date.now();
}



function Tag(name, type, scale, offset, min, max, des, unit, memAddrr, dataType, history, alarm){
    this.name = name;
    this.type = type;
    this.scale = scale;
    this.offset = offset;
    this.minimum = min;
    this.maximum = max;
    this.description = des;
    this.unit = unit;
    this.memoryAdd = memAddrr;
    this.dataType = dataType;
    this.deadband = 0;
    this.createdTime = Date.now();

    this.value = 0;
    this.timeStamp = null;
    // UNCERTAIN, GOOD or BAD
    this.quality = null;


    this.history = history;
    // Put alarm object here
    this.alarm = alarm;

}




/**
 * @summary: Event listener function
 * @example: create-new button, save-button
 */


function addPopupCreateNew(){
    let popup = `
    <button class="hidden" id="showAddGateway" type="button" class="btn btn-info btn-lg" data-toggle="modal" data-target="#addGateway">Open Modal</button>
    <div class="modal fade" id="addGateway" tabindex="-1" role="dialog" aria-labelledby="Modal-label">
        <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-body">
                <fieldset class="form-group table-bordered">
                    <legend style="width: auto; margin-left: 30px;">&nbsp;Gateway Informations&nbsp;</legend>
                    <div class="row">
                        <div class="col-md-5" style="margin-left: 5%;">
                        <div class="form-group label-floating">
                            <label class="control-label">ID *</label>
                            <input name="id" type="text" class="form-control" required tabindex="1">
                        </div>
                        </div>
                        <div class="col-md-5 col-md-offset-1">
                        <div class="form-group label-floating">
                            <label class="control-label">Name *</label>
                            <input name="name" type="text" class="form-control" required tabindex="2">
                        </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-11" style="margin-left: 5%;">
                        <div class="form-group label-floating">
                            <label class="control-label">Adress * (Ex: <i>197 Ly Thuong Kiet, District 10, Ho Chi Minh City, Vietnam</i>)</label>
                            <input name="address" type="text" class="form-control" required tabindex="3">
                        </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-3" style="margin-left: 5%;">
                            <div class="form-group label-floating">
                                <label class="control-label">Scan Time *</label>
                                <input name="scan-time" type="number" class="form-control" min="500" max="1000*3600" required tabindex="4">
                            </div>
                        </div>
                        <div class="col-md-3 col-md-offset-1">
                            <div class="form-group label-floating">
                                <label class="control-label">Longtitude *</label>
                                <input name="longitude" type="number" class="form-control" required min="0" max="360" step="any" tabindex="5">
                            </div>
                        </div>
                        <div class="col-md-3 col-md-offset-1">
                            <div class="form-group label-floating">
                                <label class="control-label">Latitude *</label>
                                <input name="latitude" type="number" class="form-control" required min="0" max="360" step="any" tabindex="6">
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-11" style="margin-left: 5%;">
                            <div class="form-group label-floating">
                                <label class="control-label">Description</label>
                                <textarea name="description" type="text" class="form-control" rows="4" tabindex="7"></textarea>
                            </div>
                        </div>
                    </div>
                </fieldset>
            </div>
            <div class="modal-footer">
                <button type="button" id="save-btn" class="btn btn-primary btn-round" onclick="createGateway()">&nbsp;Save&nbsp;</button>
                <button type="button" class="btn btn-danger btn-round" data-dismiss="modal" onclick="removeAddGateway()">Close</button>
            </div>
        </div>
        </div>
    </div>
    `;

    $('body').append(popup);
    $('#showAddGateway').click();
    $('#addGateway').click(function(e){
        let target = Array.from(e.target.classList).join();
        console.log(target);
        if (target == 'modal,fade'){
            removeAddGateway();
        }
    });
}


function addPopupEditGateway(){
    let popup = `
    <button class="hidden" id="showEditGateway" type="button" class="btn btn-info btn-lg" data-toggle="modal" data-target="#editGateway">Open Modal</button>
    <div class="modal fade" id="editGateway" tabindex="-1" role="dialog" aria-labelledby="Modal-label">
        <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-body">
                <fieldset class="form-group table-bordered">
                    <legend style="width: auto; margin-left: 30px;">&nbsp;Gateway Informations&nbsp;</legend>
                    <div class="row">
                        <div class="col-md-5" style="margin-left: 5%;">
                        <div class="form-group label-floating">
                            <label class="control-label">ID *</label>
                            <input name="id" type="text" class="form-control" required>
                        </div>
                        </div>
                        <div class="col-md-5 col-md-offset-1">
                        <div class="form-group label-floating">
                            <label class="control-label">Name *</label>
                            <input name="name" type="text" class="form-control" required>
                        </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-11" style="margin-left: 5%;">
                        <div class="form-group label-floating">
                            <label class="control-label">Adress * (Ex: <i>197 Ly Thuong Kiet, District 10, Ho Chi Minh City, Vietnam</i>)</label>
                            <input name="address" type="text" class="form-control" required>
                        </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-3" style="margin-left: 5%;">
                            <div class="form-group label-floating">
                                <label class="control-label">Scan Time *</label>
                                <input name="scan-time" type="number" class="form-control" min="500" max="1000*3600" required>
                            </div>
                        </div>
                        <div class="col-md-3 col-md-offset-1">
                            <div class="form-group label-floating">
                                <label class="control-label">Longtitude *</label>
                                <input name="longitude" type="number" class="form-control" required min="0" max="360" step="any">
                            </div>
                        </div>
                        <div class="col-md-3 col-md-offset-1">
                            <div class="form-group label-floating">
                                <label class="control-label">Latitude *</label>
                                <input name="latitude" type="number" class="form-control" required min="0" max="360" step="any">
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-11" style="margin-left: 5%;">
                            <div class="form-group label-floating">
                                <label class="control-label">Description</label>
                                <textarea name="description" type="text" class="form-control" rows="4"></textarea>
                            </div>
                        </div>
                    </div>
                </fieldset>
            </div>
            <div class="modal-footer">
                <button type="button" id="save-btn" class="btn btn-primary btn-round" onclick="console.log("save button is clicked.")">&nbsp;Save&nbsp;</button>
                <button type="button" class="btn btn-danger btn-round" data-dismiss="modal" onclick="removeEditGateway()">Close</button>
            </div>
        </div>
        </div>
    </div>
    `;

    $('body').append(popup);
    $('#showEditGateway').click();
    $('#editGateway').click(function(e){
        let target = Array.from(e.target.classList).join();
        console.log(target);
        if (target == 'modal,fade'){
            removeAddGateway();
        }
    });
}



function removeAddGateway(){
    $('#showAddGateway').remove();
    $('#addGateway').remove();
    $('.modal-backdrop').remove();
}

function removeEditGateway(){
    $('#showEditGateway').remove();
    $('#editGateway').remove();
    $('.modal-backdrop').remove();
}


 function createGateway(){
     let error = false;
     let {id, name, long, lat, addrr, des, scanTime} = {
         id: $('input[name=id]').val(),
         name: $('input[name=name]').val(),
         long: parseFloat($('input[name=longitude]').val()),
         lat:  parseFloat($('input[name=latitude]').val()),
         addrr: $('input[name=address]').val(),
         des:  $('input[name=description]').val() || "",
         scanTime: parseInt($('input[name=scan-time]').val())
     }

     console.log(long);
     console.log(typeof long);
     console.log(isNaN(long));
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

     if (isNaN(scanTime)){
        $('input[name=scan-time]').parent().addClass('has-error'); error = true;
     }
     
     if (error || isDuplicateGateway(name)){
        // showNotification('top', 'right', 'danger', "Input invalid");
        return;
     }
     
     // Create new Gateway object

     let gateway = new Gateway(id, name, long, lat, addrr, des, scanTime);
     data.external.push(gateway);
     // Render a row of new gateway to table
     renderRow(gateway, data.external.length);
 }

 
function isDuplicateGateway(name){
    let status = false;
    if (data.external.length == 0){
        return false;
    }

    data.external.forEach(function(ele, index){
        if (ele.name === name) status = true;
    })

    return status;

}


// Display PLC table in Edit Gateway popup
function displayPLCTable(){
    hiddenTable();
    $('#PLC-table').removeClass('hidden');
}


// Display Tag table in Edit Gateway popup
function displayTagTable(){
    hiddenTable();
    $('#Tag-table').removeClass('hidden');
    
}

// Hide all table (PLC & Tag) in Edit Gateway popup
function hiddenTable(){
    $('#PLC-table').addClass('hidden');
    $('#Tag-table').addClass('hidden');
}

function showAlarmInput(){
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
  * @summary: functions for render table from data (init from server database)
  * @example: renderRow(), render...
  */

  function renderRow(gateway, index){
    gateway.updatePLCnTag();
    const bgColor = (index% 2 == 0)? `style="background-color: #e7e497;"` : "";
    console.log(bgColor);
    // Index in range of [1...N]
    $('#render-row').append(`
        <tr  ${bgColor}>
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
                    data-original-title="Edit Gateway" title="" onclick="$('#showEditGateway').click()">
                    <i class="material-icons">edit</i>
                </button>
                <button type="button" rel="tooltip" class="btn btn-danger"
                    data-original-title="Delete Gateway" title="">
                    <i class="material-icons">close</i>
                </button>
            </td>
        </tr>
        <tr id="row-${index}" class="collapse" style="background-color: #dddfd4;">
            <td></td>
            <td colspan="7" rowspan="3">                                                      
                    <table>
                        <thead>
                            <caption>This is caption</caption>
                        </thead>
                        <tbody>
                            <tr><th>1</th><th>2</th><th>3</th></tr>
                        <tr><td>abc</td><td>abc</td><td>abc</td></tr>
                        </tbody> 
                    </table>                                                            
            </td>
        </tr>
        <tr></tr>
        <tr></tr>
    `)
  }

