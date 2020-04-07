/** 
 * @summary: add Edit gateway modal to main page
 * @example: showEditGateway(),...
*/



function showEditGateway(id){

    let gateway = data.getGatewayById(id);

    let editGatewayPopup = `
    <button class="hidden" id="showEditGateway" type="button" class="btn btn-info btn-lg" data-toggle="modal" data-target="#editGateway">Open Modal</button>
    <div class="modal fade" id="editGateway" tabindex="-1" role="dialog" aria-labelledby="Modal-label">
        <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-body">
                <div class="card">
                    <div class="card-content">
                        <div class="row">
                            <div class="col-md-3">
                                <ul class="nav nav-pills nav-pills-rose nav-stacked">
                                    <li class="active">
                                        <a href="#tab1" data-toggle="tab" onclick="hiddenTable();">Gateway</a>
                                    </li>
                                    <li>
                                        <a href="#tab2" data-toggle="tab" onclick="displayPLCTable();">Create PLC</a>
                                    </li>
                                    <li>
                                        <a href="#tab3" data-toggle="tab" onclick="displayTagTable(${id});">Create Tag</a>
                                    </li>
                                </ul>
                                <div class="togglebutton text-center hidden" id="switch-PLC">
                                    <label style="color: black;">
                                        NEW&nbsp;
                                        <input type="checkbox" onchange="changeModePLC()" checked>
                                        <span class="toggle"></span>
                                        &nbsp;EDIT 
                                    </label>
                                </div>
                                <div class="togglebutton text-center hidden" id="switch-Tag">
                                    <label style="color: black;">
                                        NEW&nbsp;
                                        <input type="checkbox" onchange="changeModeTAG()" checked>
                                        <span class="toggle"></span>
                                        &nbsp;EDIT 
                                    </label>
                                </div>
                            </div>
                            <div class="col-md-9">
                                <div class="tab-content">
                                    <div class="tab-pane active" id="tab1">
                                        <fieldset class="form-group table-bordered">
                                            <legend style="width: auto; margin-left: 30px;">&nbsp;Gateway Info&nbsp;[01]</legend>
                                            <div class="row form-group">
                                                <div class="col-md-6">
                                                <div class="form-group label-floating">
                                                    <label class="control-label">Name *</label>
                                                    <input name="name" type="text" class="form-control" required value="${gateway.name}">
                                                </div>
                                                </div>
                                                <div class="col-md-4 col-md-offset-1">
                                                    <div class="form-group label-floating">
                                                        <label class="control-label">Scan Time *</label>
                                                        <input name="scan-time" type="number" class="form-control" min="500" max="1000*3600" required value="${gateway.scanTime}">
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row form-group">
                                                <div class="col-md-11">
                                                <div class="form-group label-floating">
                                                    <label class="control-label">Adress *</label>
                                                    <input name="address" type="text" class="form-control" required value="${gateway.position}">
                                                </div>
                                                </div>
                                            </div>
                                            <div class="row form-group">
                                                <div class="col-md-5">
                                                    <div class="form-group label-floating">
                                                        <label class="control-label">Longtitude *</label>
                                                        <input name="longitude" type="number" class="form-control" required min="0" max="360" step="any" value="${gateway.longitude}">
                                                    </div>
                                                </div>
                                                <div class="col-md-5 col-md-offset-1">
                                                    <div class="form-group label-floating">
                                                        <label class="control-label">Latitude *</label>
                                                        <input name="latitude" type="number" class="form-control" required min="0" max="360" step="any" value="${gateway.latitude}">
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row form-group">
                                                <div class="col-md-11">
                                                    <div class="form-group label-floating">
                                                        <label class="control-label">Description</label>
                                                        <textarea name="description" type="text" class="form-control" rows="4" >${gateway.description}</textarea>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="text-center">
                                                    <button type="button" rel="tooltip" class="btn btn-success btn-round" data-original-title=""
                                                        title="Save" onclick="updateGateway('${id}')">
                                                        <i class="material-icons">save</i>
                                                        Save Change
                                                    </button>
                                                </div>
                                            </div>
                                        </fieldset>
                                    </div>
                                    
                                    <div class="tab-pane" id="tab2" >
                                        <fieldset class="form-group table-bordered">
                                            <legend style="width: auto; margin-left: 30px;">
                                                <a data-toggle="collapse" href="#collapsePLC" class="collapsed" style="color: #333;">
                                                    &nbsp;Adding PLC&nbsp;
                                                    <b class="caret"></b>
                                                </a>
                                            
                                            </legend>
                                            <div class="collapse" id="collapsePLC">
                                                <div class="row form-group" style="margin: 10px;">
                                                    <p class="col-md-2 text-gray">Producer:</p>
                                                    <div class="col-md-5" style="margin-left: -20px; margin-top: -20px;">
                                                        <select class="selectpicker" data-style="select-with-transition" title="Select" data-size="3"
                                                                onchange="changePLCList()"  id="plc-producer">
                                                            <option value="siemens"    >Siemens</option>
                                                            <option value="schneider"  disabled>Schneider</option>
                                                            <option value="mitsubishi" disabled>Mitsubishi</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="row form-group" style="margin: 10px;">
                                                    <p class="col-md-2 text-gray">PLC Type:</p>
                                                    <div class="col-md-5" style="margin-left: -20px; margin-top: -20px;">
                                                        <select class="selectpicker" data-style="select-with-transition" title="Select" data-size="3"
                                                                onchange="changePLCTypeList()" id="plc-type">
                                                            
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="row form-group" style="margin: 10px;">
                                                    <p class="col-md-2 text-gray">Protocol:</p>
                                                    <div class="col-md-5" style="margin-left: -20px; margin-top: -20px;">
                                                        <select class="selectpicker" data-style="select-with-transition" title="Select" data-size="3"
                                                                id="plc-protocol">
                                                            
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="row" style="margin: 10px">
                                                    <div class="col-md-6">
                                                        <div class="form-group label-floating">
                                                            <label class="control-label">PLC Name *</label>
                                                            <input name="name" id="plc-name" type="text" class="form-control" required minlength="2">
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <div class="form-group label-floating">
                                                            <label class="control-label">IP Adress *</label>
                                                            <input name="ip-address" id="plc-address" type="text" class="form-control" required minlength="7" maxlength="15">
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-md-11" style="margin-left: 5%;">
                                                        <div class="form-group label-floating">
                                                            <label class="control-label">Description</label>
                                                            <textarea name="description" id="plc-des" type="text" class="form-control" rows="4"></textarea>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row" id="PLC-new">
                                                    <div class="text-center">
                                                        <button type="button" rel="tooltip" class="btn btn-success btn-round" data-original-title=""
                                                            title="Create New" onclick="createNewPLC('${id}')">
                                                            <i class="material-icons">add_circle</i>
                                                            Create New
                                                        </button>
                                                    </div>
                                                </div>
                                                <div class="row hidden" id="PLC-edit">
                                                    
                                                </div>
                                            </div>
                                        </fieldset>
                                        
                                    </div>
                                    <div class="tab-pane" id="tab3">
                                        <fieldset class="form-group table-bordered">
                                            <legend style="width: auto; margin-left: 30px;">
                                                <a data-toggle="collapse" href="#collapseTag" class="collapsed" style="color: #333;">
                                                    &nbsp;Adding Tag&nbsp;
                                                    <b class="caret"></b>
                                                </a>
                                            </legend>
                                            <div class="collapse" id="collapseTag">
                                                <div class="row">
                                                    <div class="col-md-7 form-group">
                                                        <p class="col-md-2 text-gray">Type:</p>
                                                        <div class="col-md-5" style="margin-top: -20px; margin-left: -5px;">
                                                            <select class="selectpicker" data-style="select-with-transition" title="State" data-size="2"
                                                                    id="type-tag" onchange="changeTypeTag()">
                                                                <option value="external" selected>External</option>
                                                                <option value="internal">Internal</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row internal-tag form-group hidden">
                                                    <div class="row form-group" style="margin-top: -25px;">
                                                        <div class="col-md-5">
                                                            <div class="form-group label-floating">
                                                                <label class="control-label">Name *</label>
                                                                <input name="name" type="text" class="form-control" minlength="4" required>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-3">
                                                            <div class="form-group label-floating">
                                                                <label class="control-label">Scale</label>
                                                                <input name="scale" type="number" class="form-control">
                                                            </div>
                                                        </div>
                                                        <div class="col-md-3">
                                                            <div class="form-group label-floating">
                                                                <label class="control-label">Offset</label>
                                                                <input name="offset" type="number" class="form-control">
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="row form-group">
                                                        <div class="col-md-12">
                                                                <div class="row">
                                                                    <p class="col-md-3 text-gray">Data Type:</p>
                                                                    <div class="col-md-4 col-md-pull-1" style="margin-top: -20px;">
                                                                        <select name="select-datatype" class="selectpicker" data-style="select-with-transition" title="State"
                                                                            data-size="5" data-live-search="true">
                                                                            <option value="int" selected>INT</option>
                                                                            <option value="word">WORD</option>
                                                                            <option value="dword">DWORD</option>
                                                                            <option value="real">REAL</option>
                                                                            <option value="bool">BOOL</option>
                                                                        </select>
                                                                    </div>
                                                                    <div class="col-md-3" style="margin-top: -32px;">
                                                                        <div class="form-group label-floating">
                                                                            <label class="control-label">Unit *</label>
                                                                            <input name="unit" type="text" class="form-control">
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                    </div>
                                                </div>
                                                <div class="row external-tag">
                                                    <div class="col-md-7">
                                                        <div class="row form-group" style="margin-top: 10px;">
                                                            <div class="col-md-12">
                                                                <div class="row">
                                                                    <p class="col-md-3 text-gray">PLC:</p>
                                                                    <div class="col-md-4 col-md-pull-1" style="margin-top: -20px;">
                                                                        <select name="select-plc" class="selectpicker" data-style="select-with-transition" title="State"
                                                                            data-size="5" data-live-search="true">
                                                                           
                                                                        </select>
                                                                    </div>
                                                                    <div class="col-md-5" style="margin-top: -32px;">
                                                                        <div class="form-group label-floating">
                                                                            <label class="control-label">Name *</label>
                                                                            <input name="name" type="text" class="form-control" minlength="4" required>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="row form-group" style="margin-top: 0;">
                                                            <div class="col-md-5">
                                                                <div class="form-group label-floating">
                                                                    <label class="control-label">Scale</label>
                                                                    <input name="scale" type="number" class="form-control" required>
                                                                </div>
                                                            </div>
                                                            <div class="col-md-5 col-md-offset-2">
                                                                <div class="form-group label-floating">
                                                                    <label class="control-label">Offset</label>
                                                                    <input name="offset" type="number" class="form-control" required>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="row form-group" style="margin-top: 0;">
                                                            <div class="col-md-5">
                                                                <div class="form-group label-floating">
                                                                    <label class="control-label">Minimum</label>
                                                                    <input name="minimum" type="number" class="form-control" required>
                                                                </div>
                                                            </div>
                                                            <div class="col-md-5 col-md-offset-2">
                                                                <div class="form-group label-floating">
                                                                    <label class="control-label">Maximum</label>
                                                                    <input name="maximum" type="number" class="form-control" required>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="row form-group" style="margin-top: 10px;">
                                                            <div class="col-md-12">
                                                                <div class="row">
                                                                    <p class="col-md-4 text-gray">Data Type:</p>
                                                                    <div class="col-md-3 col-md-pull-1" style="margin-top: -20px;">
                                                                        <select name="select-datatype" class="selectpicker" data-style="select-with-transition" title="State"
                                                                            data-size="5" data-live-search="true">
                                                                            <option value="int" selected>INT</option>
                                                                            <option value="word">WORD</option>
                                                                            <option value="dword">DWORD</option>
                                                                            <option value="real">REAL</option>
                                                                            <option value="bool">BOOL</option>
                                                                        </select>
                                                                    </div>
                                                                    <div class="col-md-5" style="margin-top: -32px;">
                                                                        <div class="form-group label-floating">
                                                                            <label class="control-label">Unit *</label>
                                                                            <input name="unit" type="text" class="form-control">
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-5" style="margin-top: -25px;">
                                                        <div class="row form-group">
                                                            <div class="col-md-10">
                                                                <div class="checkbox">
                                                                    <label>
                                                                        <input type="checkbox" id="alarm-enable" name="alarm-checkbox"
                                                                            onchange="showAlarmInput()">
                                                                            <span class="checkbox-material"><span class="check"></span></span>
                                                                            Alarm
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="row form-group" style="height:50px; margin: -20px 20px 0 20px; opacity: 0.4;">
                                                            <div class="form-group label-floating">
                                                                <label class="control-label">HIHI *</label>
                                                                <input name="alarm-hihi" type="number" class="form-control alarm-" disabled required>
                                                            </div>
                                                        </div>
                                                        <div class="row form-group" style="height:50px; margin: 0 20px; opacity: 0.4;">
                                                            <div class="form-group label-floating">
                                                                <label class="control-label">HI *</label>
                                                                <input name="alarm-hi" type="number" class="form-control alarm-" disabled required>
                                                            </div>
                                                        </div>
                                                        <div class="row form-group" style="height:50px; margin: 0 20px; opacity: 0.4;">
                                                            <div class="form-group label-floating">
                                                                <label class="control-label">LOW *</label>
                                                                <input name="alarm-low" type="number" class="form-control alarm-" disabled required>
                                                            </div>
                                                        </div>
                                                        <div class="row form-group" style="height:50px; margin: 0 20px; opacity: 0.4;">
                                                            <div class="form-group label-floating">
                                                                <label class="control-label">LOWLOW *</label>
                                                                <input name="alarm-lowlow" type="number" class="form-control alarm-" disabled required>
                                                            </div>
                                                        </div>
                                        
                                                        <div class="row form-group">
                                                            <div class="col-md-5">
                                                                <div class="checkbox">
                                                                    <label>
                                                                        <input type="checkbox" id="trend-enable" name="trend-checkbox">
                                                                        <span class="checkbox-material"><span class="check"></span></span>    
                                                                        Trend
                                                                    </label>
                                                                </div>
                                                            </div>
                                                            <div class="col-md-5">
                                                                <div class="checkbox">
                                                                    <label>
                                                                        <input type="checkbox" id="log-enable" name="log-checkbox">
                                                                        <span class="checkbox-material"><span class="check"></span></span>    
                                                                        Log
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                       
                                                    </div>
                                                </div>
                                                <div class="row form-group external-tag">
                                                    <div class="col-md-4">
                                                        <div class="radio">
                                                            <label>
                                                                <input type="radio" name="select-type" checked value="read">
                                                                <span class="circle"></span>
                                                                <span class="check"></span>
                                                                Read Only
                                                            </label>
                                                             <label>
                                                                <input type="radio" name="select-type" value="readwrite">
                                                                <span class="circle"></span>
                                                                <span class="check"></span>
                                                                Read/Write
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-4">
                                                        <div class="form-group label-floating">
                                                            <label class="control-label">Memory Address *</label>
                                                            <input name="m-address" type="text" class="form-control" required>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-4">
                                                        <div class="form-group label-floating">
                                                            <label class="control-label">Deadband</label>
                                                            <input name="deadband" type="number" class="form-control" min="0" >
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="row form-group">
                                                    <div class="col-md-12">
                                                        <div class="form-group label-floating">
                                                            <label class="control-label">Description</label>
                                                            <textarea id="tag-description" name="description" type="text" class="form-control" rows="4"></textarea>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row" id="Tag-new">
                                                    <div class="text-center">
                                                        <button type="button" rel="tooltip" class="btn btn-success btn-round" data-original-title=""
                                                            title="Create New" onclick="createNewTag('${id}')">
                                                            <i class="material-icons">add_circle</i>
                                                            Create New
                                                        </button>
                                                    </div>
                                                </div>
                                                <div class="row hidden" id="Tag-edit">
                                                   
                                                </div>
                                            </div>
                                        </fieldset>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row hidden" id="PLC-table">
                            <fieldset class="form-group table-bordered">
                                <legend style="width: auto; margin-left: 30px;">
                                    <a data-toggle="collapse" href="#collapsePLC-table" class="collapsed" style="color: #333;">
                                        &nbsp;PLCs Table&nbsp;
                                        <b class="caret"></b>
                                    </a>                                  
                                </legend>
                                <div class="collapse" id="collapsePLC-table">
                                    <div class="row">
                                        <div class="col-md-12">
                                            <div class="card" style="background-color: #f3f9f7; margin-top: 0;">
                                                <div class="card-content">
                                                    <div class="table-responsive">
                                                        <table class="table" style="font-size: small;">
                                                            <thead style="background-color: #a4a4a4; font-weight: 900!important;">
                                                                <tr>
                                                                    <th class="text-center">ID</th>
                                                                    <th class="text-center">Name</th>
                                                                    <th class="text-center">Producer</th>
                                                                    <th class="text-center">Type</th>
                                                                    <th class="text-center">Protocol</th>
                                                                    <th class="text-center">Tag</th>
                                                                    <th class="text-center">IP Adress</th>
                                                                    <th class="text-center">Action</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody id="render-plc">
                                                             
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                            
                                    </div>
                            </fieldset>
                        </div>

                        <div class="row hidden" id="Tag-table">
                            <fieldset class="form-group table-bordered">
                                <legend style="width: auto; margin-left: 30px;">
                                    <a data-toggle="collapse" href="#collapseTag-table" class="collapsed" style="color: #333;">
                                        &nbsp;Tags Table&nbsp;
                                        <b class="caret"></b>
                                    </a>
                                </legend>
                                <div class="collapse" id="collapseTag-table">
                                    <div class="row">
                                        <div class="col-md-12">
                                            <div class="card" style="background-color: #f3f9f7; margin-top: 0;">
                                                <div class="card-content">
                                                    <div class="table-responsive">
                                                        <table class="table" style="font-size: small;">
                                                            <thead style="background-color: #a4a4a4; font-weight: 900!important;">
                                                                <tr>
                                                                    <th class="text-center">ID</th>
                                                                    <th class="text-center">Name</th>
                                                                    <th class="text-center">Type</th>
                                                                    <th class="text-center">Unit</th>
                                                                    <th class="text-center">Address</th>
                                                                    <th class="text-center">Data Type</th>
                                                                    <th class="text-center">Trend</th>
                                                                    <th class="text-center">Log</th>
                                                                    <th class="text-center">Alarm</th>
                                                                    <th class="text-center">Action</th>
                            
                                                                </tr>
                                                            </thead>
                                                            <tbody id="render-tag">
                                                                
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                            
                                    </div>
                            </fieldset>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-danger btn-round" data-dismiss="modal" onclick="removeEditGateway()">Close</button>
            </div>
        </div>
        </div>
    </div>`

    $('body').append(editGatewayPopup);
    $('.selectpicker').selectpicker('render');
    $('#showEditGateway').click();
    $('#editGateway').click(function(e){
        let target = Array.from(e.target.classList).join();
        console.log(target);
        if (target == 'modal,fade'){
            removeEditGateway();
        }
    });
    
    renderPLCTable(id);

    disableFloatingLabel();
}

function removeEditGateway(){
    console.log("remove editgateway+")
    $('#showEditGateway').remove();
    $('#editGateway').remove();
    $('.modal-backdrop').remove();
}


// This function init input with label-floating (Disable float label when render)
function disableFloatingLabel(){
    $('#editGateway .label-floating input').each(function(){
        if ($(this)[0].value.trim().length == 0){
            $(this).parent().addClass('is-empty');
        }else{
            $(this).parent().removeClass('is-empty');
        }
    })

    $('#editGateway .label-floating textarea').each(function(){
        if ($(this)[0].value.trim().length == 0){
            $(this).parent().addClass('is-empty');
        }else{
            $(this).parent().removeClass('is-empty');
        }
    })
}


/* $(function(){
    var plants = [
      {name: 'VAK', coords: [50.0091294, 9.0371812], status: 'closed', offsets: [0, 2]},
      {name: 'MZFR', coords: [49.0543102, 8.4825862], status: 'closed', offsets: [0, 2]},
      {name: 'AVR', coords: [50.9030599, 6.4213693], status: 'closed'},
      {name: 'KKR', coords: [53.1472465, 12.9903674], status: 'closed'},
      {name: 'KRB', coords: [48.513264, 10.4020357], status: 'activeUntil2018'},
      {name: 'KWO', coords: [49.364503, 9.076252], status: 'closed'},
      {name: 'KWL', coords: [52.5331853, 7.2505223], status: 'closed', offsets: [0, -2]},
      {name: 'HDR', coords: [50.1051446, 8.9348691], status: 'closed', offsets: [0, -2]},
      {name: 'KKS', coords: [53.6200685, 9.5306289], status: 'closed'},
      {name: 'KKN', coords: [48.6558015, 12.2500848], status: 'closed', offsets: [0, -2]},
      {name: 'KGR', coords: [54.1417497, 13.6583877], status: 'closed'},
      {name: 'KWB', coords: [49.709331, 8.415865], status: 'closed'},
      {name: 'KWW', coords: [51.6396481, 9.3915617], status: 'closed'},
      {name: 'GKN', coords: [49.0401151, 9.1721088], status: 'activeUntil2022'},
      {name: 'KKB', coords: [53.8913533, 9.2005777], status: 'closed', offsets: [0, -5]},
      {name: 'KKI', coords: [48.5544748, 12.3472095], status: 'activeUntil2022', offsets: [0, 2]},
      {name: 'KKU', coords: [53.4293465, 8.4774649], status: 'closed'},
      {name: 'KNK', coords: [49.1473279, 8.3827739], status: 'closed'},
      {name: 'KKP', coords: [49.2513078, 8.4356761], status: 'activeUntil2022', offsets: [0, -2]},
      {name: 'KKG', coords: [49.9841308, 10.1846373], status: 'activeUntil2018'},
      {name: 'KKK', coords: [53.4104656, 10.4091597], status: 'closed'},
      {name: 'KWG', coords: [52.0348748, 9.4097793], status: 'activeUntil2022'},
      {name: 'KBR', coords: [53.850666, 9.3457603], status: 'closed', offsets: [0, 5]},
      {name: 'KMK', coords: [50.408791, 7.4861956], status: 'closed'},
      {name: 'THTR', coords: [51.6786228, 7.9700232], status: 'closed'},
      {name: 'KKE', coords: [52.4216974, 7.3706389], status: 'activeUntil2022', offsets: [0, 2]}
    ];
  
    new jvm.Map({
      container: $('#worldMap'),
      map: 'world_mill_en',
      markers: plants.map(function(h){ return {name: h.name, latLng: h.coords} }),
      labels: {
          markers: {
            render: function(index){
              return plants[index].name;
            },
            offsets: function(index){
              var offset = plants[index]['offsets'] || [0, 0];
  
              return [offset[0] - 7, offset[1] + 3];
            }
          }
      },
      series: {
        markers: [{
          attribute: 'image',
          scale: {
            'closed': 'https://gamek.mediacdn.vn/zoom/780_295/2019/12/10/ke-ni-nang-hotgirl-lanh-lung-khong-bao-gio-nhoen-mieng-cuoi-anh-295765182-15759552448041350610844.jpg',
            'activeUntil2018': 'https://gamek.mediacdn.vn/zoom/780_295/2019/12/10/ke-ni-nang-hotgirl-lanh-lung-khong-bao-gio-nhoen-mieng-cuoi-anh-295765182-15759552448041350610844.jpg',
            'activeUntil2022': 'https://gamek.mediacdn.vn/zoom/780_295/2019/12/10/ke-ni-nang-hotgirl-lanh-lung-khong-bao-gio-nhoen-mieng-cuoi-anh-295765182-15759552448041350610844.jpg'
          },
          values: plants.reduce(function(p, c, i){ p[i] = c.status; return p }, {}),
          legend: {
            horizontal: true,
            title: 'Nuclear power station status',
            labelRender: function(v){
              return {
                closed: 'Closed',
                activeUntil2018: 'Scheduled for shut down<br> before 2018',
                activeUntil2022: 'Scheduled for shut down<br> before 2022'
              }[v];
            }
          }
        }]
      }
    });
  }); */