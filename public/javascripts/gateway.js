// A collection of gateways
let data = {
    external: [],
    internal: [],

    getGatewayById: function(id){
        let gateway;
        this.external.forEach(function(ele, index){
            if (ele.id == id) gateway = ele;
        });
        
        return gateway;
    },

    isDuplicateGateway: function(name, id){
        let status = false;
        if (data.external.length == 0){
            return false;
        }
    
        data.external.forEach(function(ele, index){
            if (ele.id == id) status = true;
        })
    
        return status; 
    },

    updateGatewayById: function(id, newGateway){
        let index = this.external.findIndex(function(gateway){
            return gateway.id == id;
        })
        // id, name, long, lat, addrr, des, scanTime
        this.external[index].updateName(newGateway.name);
        this.external[index].updateLongitude(newGateway.longitude);
        this.external[index].updateLatitude(newGateway.latitude);
        this.external[index].updatePosition(newGateway.position);
        this.external[index].updateDescription(newGateway.description);
        this.external[index].updateScantime(newGateway.scanTime);
        this.external[index].updateModifyTime();

        return [this.external[index], index];
    },

    deleteGatewayById: function(id){
        let index = this.external.findIndex(function(gateway){
            return gateway.id == id;
        })
        // Remove element at index
        this.external.splice(index, 1);
        console.log(this.external);
    },

    isDuplicatePLC: function(id, newPLC){
        let result = false;

        let index = this.external.findIndex(function(gateway){
            return gateway.id == id;
        });

        this.external[index].PLCs.forEach(function(plc){
            if (plc.IPaddrress.trim() == newPLC.IPaddrress.trim() || plc.name.trim() == newPLC.name.trim()) result = true;
        })
         
        return result;
    },

    addPLC2GatewayById: function(id, newPLC){
        let index = this.external.findIndex(function(gateway){
            return gateway.id == id;
        });

        if (this.isDuplicatePLC(id, newPLC)) return false;
        else {
            this.external[index].PLCs.push(newPLC);
            return true;
        }
        
    },

    updatePLCByNamenId: function(id, name, newPLC){
        let index = this.external.findIndex(function(gateway){
            return gateway.id == id;
        });

        let indexPLC = this.external[index].PLCs.findIndex(function(plc){
            return plc.name == name;
        })
  
        this.external[index].PLCs[indexPLC].producer    = newPLC.producer;
        this.external[index].PLCs[indexPLC].type        = newPLC.type;
        this.external[index].PLCs[indexPLC].IPaddrress  = newPLC.IPaddrress;
        this.external[index].PLCs[indexPLC].protocol    = newPLC.protocol;
        this.external[index].PLCs[indexPLC].description = newPLC.description;
        this.external[index].PLCs[indexPLC].modified    = Date.now();

    },

    deletePLCByNamenId: function(id, name){
        let index = this.external.findIndex(function(gateway){
            return gateway.id == id;
        });

        let indexPLC = this.external[index].PLCs.findIndex(function(plc){
            return plc.name == name;
        });

        this.external[index].PLCs.splice(indexPLC, 1);
        return true;
    },

     /**
     * @param {string} gwId: id of gateway which include PLC' name
     * @param {string} plcName: name of PLC which include Tag to add
     */
    isDuplicateExternalTag: function(gwId, plcName, tagName){
        console.log(arguments)
        let index = this.external.findIndex(function(gateway){
            return gateway.id == gwId;
        });
        console.log('index: ' + index)
        
        let indexPLC = this.external[index].PLCs.findIndex(function(plc){
            return plc.name == plcName;
        })

        console.log('indexPLC: ' + indexPLC)

        if (indexPLC == -1) return false;

        let resutl = data.external[index].PLCs[indexPLC].Tags.findIndex((tag) => tag.name == tagName);
        if (resutl == -1) return false;
        return true;
    },

    addTag2PLCByIdName: function(gwId, plcName, tag){
        let index = this.external.findIndex(function(gateway){
            return gateway.id == gwId;
        });

        let indexPLC = this.external[index].PLCs.findIndex(function(plc){
            return plc.name == plcName;
        })

        if (this.isDuplicateExternalTag(gwId, plcName, tag.name)){
            return false;
        }

        data.external[index].PLCs[indexPLC].Tags.push(tag);
        return true;
    },
    /**
     * @param {string} gwId: id of gateway which include PLC' name
     * @param {string} plcName: name of PLC to add tag
     */
    updateTag2PLCByIdName: function(gwId, plcName, newTag){

    },

     /**
     * @param {string} gwId: id of gateway which include PLC' name
     * @param {string} plcName: name of PLC to add tag
     * @param {string} tagName: name of Tag to delete
     */
    deleteTagByIdName: function(gwId, plcName, tagName){
        let index = this.external.findIndex(function(gateway){
            return gateway.id == gwId;
        });

        let indexPLC = this.external[index].PLCs.findIndex(function(plc){
            return plc.name == plcName;
        })

        let indexTag = data.external[index].PLCs[indexPLC].Tags.findIndex((tag) => tag.name == tagName);
        data.external[index].PLCs[indexPLC].Tags.splice(indexTag, 1);
    },

    isDuplicateInternalTag: function(tagName){
        if (typeof data.internal.find((tag) => tag.name == tagName) == 'undefined'){
            return false;
        }
        return true;
    },

    addInternalTag: function(tagName, scale, offset, dataType, unit, description){
        if (this.isDuplicateInternalTag()){
            return false;
        }
        data.internal.push({
            name: tagName, scale, offset, dataType, unit, description
        })
        return true;
    },

    updateInternalTag: function(tagName, scale, offset, dataType, unit){
        if (!this.isDuplicateInternalTag()) return false;
        let index = data.internal.findIndex((tag)=> tag.name == tagName);
        data.internal.splice(index, 1, {
            tagName, scale, offset, dataType, unit 
        });
    },

    deleteInteralTag: function(tagName){
        let index = data.internal.findIndex((tag)=> tag.name == tagName);
        if (index == -1) return false;
    
        data.internal.splice(index, 1);
        return true;
    },

    getInternalTagByName: function(tagName){
        let index = data.internal.findIndex((tag) => tag.name == tagName);
        if (index == -1) return false;
        return data.internal[index];
    }

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

Gateway.prototype.getPLCByName = function(name){
    let index = this.PLCs.findIndex(function(plc){
        return plc.name == name;
    })

    return this.PLCs[index];
}

Gateway.prototype.getPLCList = function(){
    return this.PLCs.map((plc)=> plc.name);
}

Gateway.prototype.updateModifyTime = function(){
    this.modified = Date.now();
}

Gateway.prototype.updateName = function(name){
    this.name = name;
}

Gateway.prototype.updateLongitude = function(long){
    this.longitude = long;
}

Gateway.prototype.updateLatitude = function(lat){
    this.latitude = lat;
}

Gateway.prototype.updatePosition = function(address){
    this.position = address;
}

Gateway.prototype.updateDescription = function(des){
    this.description = des;
}

Gateway.prototype.updateScantime = function(scantime){
    this.scanTime = scantime;
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

PLC.prototype.getTagByName = function(tagName){
    let index = this.Tags.findIndex((tag) => tag.name == tagName);
    if (index == -1) return false;
    return this.Tags[index];
}



function Tag(name, scale, offset, min, max, des, unit, memAddrr, dataType, dband, trend, log, alarm){
    this.name = name;
    this.scale = scale;
    this.offset = offset;
    this.minimum = min;
    this.maximum = max;
    this.description = des;
    this.unit = unit;
    this.memoryAdd = memAddrr;
    this.dataType = dataType;
    this.deadband = (!isNaN(dband))? dband:0;
    this.createdTime = Date.now();

    this.trend = trend;
    this.log = log;
    // Put alarm object here
    this.alarm = alarm;

    this.value = 0;
    this.timeStamp = null;
    // UNCERTAIN, GOOD or BAD
    this.quality = null;

}

/**
 * @summary function will self-call when render page
 */
(function(){
    $.get({
        url: '/gateway/fetch',
    }).done(function(result){
        console.log('Fetch Success: ', result);
        if (result == false){
            console.log('Fetch error at server');
            return;
        }

        // Update remote data to current data structure
        result.data.external.forEach(function(gw){

            let gateway = new Gateway(gw.id, gw.name, gw.longitude, gw.latitude, gw.position, gw.description, gw.scanTime);
            gateway.createdTime = gw.createdTime;
            gateway.modified    = gw.modified;

            gw.PLCs.forEach(function(plc){
                let plc_ = new PLC(plc.producer, plc.type, plc.name, plc.IPaddrress, plc.protocol, plc.description);
                plc_.createdTime = plc.createdTime;
                plc_.modified    = plc.modified;

                plc.Tags.forEach(function(tg){
                    let tag = new Tag(tg.name, tg.scale, tg.offset, tg.minimum, 
                        tg.maximum, tg.description, tg.unit, tg.memoryAdd,
                        tg.dataType, tg.deadband, tg.trend, tg.log, tg.alarm);
                    tag.createdTime = tg.createdTime;

                    plc_.Tags.push(tag);
                })

                gateway.PLCs.push(plc_);
            })
            data.external.push(gateway);
        })

        result.data.internal.forEach(function(internalTag, index){
            data.internal.push(internalTag);
        })

        console.log('Data is: ', data);
        //function renderRow(gateway, index)
        data.external.forEach(function(gatew, index){
            renderRow(gatew, index+1);
        })

    }).fail(function(error){
        console.log('Fetch Fail: ', error);
    })
})()


/**
 * @summary function for put gateway data to MongoDB
 * @example in save button
 */
function putGatewaytoDatabase(){

    let putData = {
        external: JSON.stringify(data.external),
        internal: JSON.stringify(data.internal)
    }

    console.log(putData)
    $.ajax({
        url: '/gateway/save',
        method: 'PUT',
        data: putData
    })
    .done(function(result){
        console.log("Save result: ", result);
        if (result.includes('error')){
            showNotification("top", "right", "warning", `Save to Server FAIL with Return code: <b>${result}</b>`);
        }else{
            showNotification("top", "right", "success", `Save to Server SUCCESS with Return code: <b>${result}</b>`);
        }
    })
    .fail(function(error){
        console.log('Save fail: ', error);
        showNotification("top", "right", "danger", `Error when call <b>/gateway/save</b>`);
    })
}


$(window).keydown(function(event){
    if (event.which == 83 && event.ctrlKey) {
        putGatewaytoDatabase();
        return false;
        
    }
    return true;
})
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
                    <div class="row form-group">
                        <div class="col-md-5">
                            <div class="form-group label-floating is-empty">
                                <label class="control-label">ID *</label>
                                <input name="id" type="text" class="form-control" required tabindex="1">
                            </div>
                        </div>
                        <div class="col-md-5 col-md-offset-1">
                            <div class="form-group label-floating is-empty">
                                <label class="control-label">Name *</label>
                                <input name="name" type="text" class="form-control" required tabindex="2">
                            </div>
                        </div>
                    </div>
                    <div class="row form-group">
                        <div class="col-md-11">
                        <div class="form-group label-floating is-empty">
                            <label class="control-label">Adress * (Ex: <i>197 Ly Thuong Kiet, District 10, Ho Chi Minh City, Vietnam</i>)</label>
                            <input name="address" type="text" class="form-control" required tabindex="3">
                        </div>
                        </div>
                    </div>
                    <div class="row form-group">
                        <div class="col-md-3">
                            <div class="form-group label-floating is-empty">
                                <label class="control-label">Scan Time *</label>
                                <input name="scan-time" type="number" class="form-control" min="500" max="1000*3600" required tabindex="4">
                            </div>
                        </div>
                        <div class="col-md-3 col-md-offset-1">
                            <div class="form-group label-floating is-empty">
                                <label class="control-label">Longtitude *</label>
                                <input name="longitude" type="number" class="form-control" required min="0" max="360" step="any" tabindex="5">
                            </div>
                        </div>
                        <div class="col-md-3 col-md-offset-1">
                            <div class="form-group label-floating is-empty">
                                <label class="control-label">Latitude *</label>
                                <input name="latitude" type="number" class="form-control" required min="0" max="360" step="any" tabindex="6">
                            </div>
                        </div>
                    </div>
                    <div class="row form-group">
                        <div class="col-md-11">
                            <div class="form-group label-floating is-empty">
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


function removeAddGateway(){
    $('#showAddGateway').remove();
    $('#addGateway').remove();
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
     // Render a row of new gateway to table
     renderRow(gateway, data.external.length);
 }

function updateGateway(id){

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
     showNotification('top', 'right', 'success', "Update Gateway is success");
}


// Display PLC table in Edit Gateway popup
function displayPLCTable(){
    hiddenTable();
    $('#PLC-table').removeClass('hidden');
    // Reset Switch (new & edit) to create new
    $('#switch-PLC input')[0].checked = false;
    changeModePLC();

}


// Display Tag table in Edit Gateway popup
function displayTagTable(id){
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
function hiddenTable(){
    $('#PLC-table').addClass('hidden');
    $('#Tag-table').addClass('hidden');
    $('#switch-PLC').addClass('hidden');
    $('#switch-Tag').addClass('hidden');
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


function changeModePLC(){
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

function changeModeTAG(){
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

function refreshPLCInput(){
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

function refreshTagInput(){
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


function deleteGateway(id){
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


function changePLCList(){
    let producer = $('#plc-producer').val();
    console.log(producer);
    switch(producer){
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



function changePLCTypeList(){
    let PLCType = $('#plc-type').val();
    console.log(PLCType)
    switch(PLCType){
        case 's7-1500': 
            $('#plc-protocol').empty();
            $('#plc-protocol').append(`
                <option value="modbus">Modbus TCP</option>
                <option value="opcua">OPC UA</option>
                <option value="s7">Ethernet S7</option>
            `)
            break;
        case 's7-300' :
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


function createNewPLC(id){
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

function updatePLC(id, name){
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
function editCurrentPLC(id, name){
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
function deleteCurrentPLC(id, name){

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


/**
 * @summary: function for interacting in Tag page of popup
 */
function changeTypeTag(){
    let typeTag = $('#type-tag').val();
    // console.log(typeVar)
    if (typeTag == 'internal'){
        showInternalInput();
    }else{
        showExternalInput();
    }
}

function showInternalInput(){
    $('.internal-tag').removeClass('hidden');
    $('.external-tag').each(function(){
        $(this).addClass('hidden');
    })
}

function showExternalInput(){
    $('.internal-tag').addClass('hidden');
    $('.external-tag').each(function(){
        $(this).removeClass('hidden');
    })
}

function createNewTag(id) {
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


function deleteCurrentTag(gwId, plcName, tagName){
    
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


function editCurrentTag(gwId, plcName, tagName){
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
                title="Update Tag" onclick="updateTag('${gwId}', '${plcName}', '${tagName}')">
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
 /**
  * @summary: functions for render table from data (init from server database)
  * @example: renderRow(), render...
  */

  // Render a row of table Gateway
  function renderRow(gateway, index){

    gateway.updatePLCnTag();
    const bgColor = (index% 2 == 0)? `style="background-color: #e7e497;"` : "";
  
    // Index in range of [1...N]
    $('#render-row').append(`
        <tr  ${bgColor} id="gateway-${gateway.id}">
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

  // Re-render a row of table Gateway
  function reRenderRow(htmlId, gateway, index){

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

 
  // Render a row of table Gateway
  function renderPLCRow(plc, index, id){

    const bgColor = (index% 2 == 0)? `style="background-color: #e7e497;"` : "";
  
    // Index in range of [1...N]
    $('#render-plc').append(`
        <tr ${bgColor} id="plc-${plc.name}">
            <td class="text-center">${(index<10)?"0"+index:index}</td>
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
   * @paraam id: id of gateway include this PLCs
   */
  function renderPLCTable(id){
      // Remove old PLC table
    $('#render-plc').empty();
    data.getGatewayById(id).PLCs.forEach(function(plc, index){
        renderPLCRow(plc, index+1, id);
    })
  }

  function renderTagRow(tag, type, index, gwId, plcName){
    const bgColor = (index% 2 == 0)? `style="background-color: #e7e497;"` : "";
    $('#render-tag').append(`
        <tr ${bgColor} id="tag-${tag.name}">
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
  function renderTagTable(gwId){
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
  }