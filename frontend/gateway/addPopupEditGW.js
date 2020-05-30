
/** 
 * @summary: add Edit gateway modal to main page
 * @example: showEditGateway(),...
*/
window.showEditGateway = function(id){

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
                                        <a href="#tab3" data-toggle="tab" onclick="displayTagTable('${id}');">Create Tag</a>
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
                                                                    id="type-plc" onchange="changeTypeTag()">
                                                                <option value="external" selected>External</option>
                                                                <option value="internal">Internal</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row internal-plc form-group hidden">
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
                                                <div class="row external-plc">
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
                                                <div class="row form-group external-plc">
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
                                                        <div class="row">
                                                        <div class="col-md-4">
                                                            <ul class="pagination pagination-info" id="pagination-plc">
                                                                <p>Showing 1 to * of * entries</p>
                                                            </ul>
                                                        </div>
                                                        <div class="col-md-4 col-md-offset-4 text-right">
                                                            <ul class="pagination pagination-info">
                                                                <li>
                                                                    <a href="javascript:void(0);" id="first-plc"><<</a>
                                                                </li>
                                                                <li class="active">
                                                                    <a href="javascript:void(0);" id="back-plc">1</a>
                                                                </li>
                                                                <li class="">
                                                                    <a href="javascript:void(0);" id="current-plc">2</a>
                                                                </li>
                                                                <li class="">
                                                                    <a href="javascript:void(0);" id="next-plc">3</a>
                                                                </li>
                                                                <li>
                                                                    <a href="javascript:void(0);" id="last-plc">>></a>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
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
                                                        <div class="row">
                                                        <div class="col-md-4">
                                                            <ul class="pagination pagination-info" id="pagination-tag">
                                                                <p>Showing 1 to * of * entries</p>
                                                            </ul>
                                                        </div>
                                                        <div class="col-md-4 col-md-offset-4 text-right">
                                                            <ul class="pagination pagination-info">
                                                                <li>
                                                                    <a href="javascript:void(0);" id="first-tag"><<</a>
                                                                </li>
                                                                <li class="active">
                                                                    <a href="javascript:void(0);" id="back-tag">1</a>
                                                                </li>
                                                                <li class="">
                                                                    <a href="javascript:void(0);" id="current-tag">2</a>
                                                                </li>
                                                                <li class="">
                                                                    <a href="javascript:void(0);" id="next-tag">3</a>
                                                                </li>
                                                                <li>
                                                                    <a href="javascript:void(0);" id="last-tag">>></a>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
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
        console.log('Click here: ', target);
        if (target == 'modal,fade'){
            removeEditGateway();
        }
    });
    
    renderPLCTable(id);

    disableFloatingLabel();
    addEvent2Pagination();
}

window.removeEditGateway = function(){
    console.log("remove editgateway+")
    $('#showEditGateway').remove();
    $('#editGateway').remove();
    $('.modal-backdrop').remove();
}


// This function init input with label-floating (Disable float label when render)
window.disableFloatingLabel = function(){
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


window.addEvent2Pagination = function() {
    console.log('add success event')
    // Handle page navigation action
    $('#first-plc').click(function () {
        console.log(numRowPLC)
        for (let i = 1; i <= numRowPLC; i++) {
            if (i <= 10) $(`.plc-${i}`).show();
            else $(`.plc-${i}`).hide();
        }

        if (numRowPLC <= 20) {
            $('#back-plc').html('1');
            $('#current-plc').html('2');
            $('#next-plc').parent().hide();
            $('#back-plc').parent().addClass('active');
            $('#current-plc').parent().removeClass('active');
        } else {
            $('#back-plc').html('1');
            $('#current-plc').html('2');
            $('#next-plc').parent().show();
            $('#next-plc').html('3');
            $('#back-plc').parent().addClass('active');
            $('#current-plc').parent().removeClass('active');
            $('#next-plc').parent().removeClass('active');
        }
        $('#pagination-plc p').text(`Showing 1 to 10 of ${numRowPLC} entries`);
    })

    $('#back-plc').click(function () {
        if (numRowPLC <= 20) {
            for (let i = 1; i <= numRowPLC; i++) {
                if (i <= 10) $(`.plc-${i}`).show();
                else $(`.plc-${i}`).hide();
            }

            $('#back-plc').parent().show();
            $('#current-plc').parent().show();
            $('#back-plc').parent().addClass('active');
            $('#current-plc').parent().removeClass('active');
            $('#pagination-plc p').text(`Showing 1 to 10 of ${numRowPLC} entries`);
        } else {
            let current = parseInt($('#back-plc').html());

            for (let i = 1; i <= numRowPLC; i++) {
                if (i <= current * 10 && i > current * 10 - 10)
                    $(`.plc-${i}`).show();
                else
                    $(`.plc-${i}`).hide();
            }

            if (current > 1) { // Rotate pagination
                $('#back-plc').html(current - 1);
                $('#current-plc').html(current);
                $('#next-plc').html(current + 1);
                $('#back-plc').parent().removeClass('active');
                $('#current-plc').parent().addClass('active');
                $('#next-plc').parent().removeClass('active');
                $('#pagination-plc p').text(`Showing ${current * 10 - 9} to ${current * 10} of ${numRowPLC} entries`);
            } else {         // Don't rotate pagination
                $('#back-plc').parent().addClass('active');
                $('#current-plc').parent().removeClass('active');
                $('#next-plc').parent().removeClass('active');
                $('#pagination-plc p').text(`Showing 1 to 10 of ${numRowPLC} entries`);
            }

        }

    })

    $('#current-plc').click(function () {
        let current = parseInt($('#current-plc').html());
        if (current == 2) {
            for (let i = 1; i <= numRowPLC; i++) {
                if (i > 10 && i <= 20) $(`.plc-${i}`).show();
                else $(`.plc-${i}`).hide();
            }

            $('#back-plc').parent().removeClass('active');
            $('#current-plc').parent().addClass('active');
            $('#next-plc').parent().removeClass('active');
            $('#pagination-plc p').text(`Showing 11 to ${(numRowPLC > 20) ? '20' : numRowPLC} of ${numRowPLC} entries`);
        } else if (current == Math.ceil(numRowPLC / 10) - 1) {
            for (let i = 1; i <= numRowPLC; i++) {
                if (i <= current * 10 && i > current * 10 - 10) $(`.plc-${i}`).show();
                else $(`.plc-${i}`).hide();
            }

            $('#back-plc').parent().removeClass('active');
            $('#current-plc').parent().addClass('active');
            $('#next-plc').parent().removeClass('active');
            $('#pagination-plc p').text(`Showing ${current * 10 - 9} to ${current * 10} of ${numRowPLC} entries`);
        }
    })

    $('#next-plc').click(function () {
        let current = parseInt($('#next-plc').html());

        for (let i = 1; i <= numRowPLC; i++) {
            if (i <= current * 10 && i > current * 10 - 10) $(`.plc-${i}`).show();
            else $(`.plc-${i}`).hide();
        }

        if (current == 3 && numRowPLC <= 30) { // Don't rotate pagination
            $('#back-plc').parent().removeClass('active');
            $('#current-plc').parent().removeClass('active');
            $('#next-plc').parent().addClass('active');
            $('#pagination-plc p').text(`Showing ${current * 10 - 9} to ${numRowPLC} of ${numRowPLC} entries`);
        } else if (current >= 3 && current < Math.ceil(numRowPLC / 10)) {         // Rotate pagination
            $('#back-plc').html(current - 1);
            $('#current-plc').html(current);
            $('#next-plc').html(current + 1);
            $('#back-plc').parent().removeClass('active');
            $('#current-plc').parent().addClass('active');
            $('#next-plc').parent().removeClass('active');
            $('#pagination-plc p').text(`Showing ${current * 10 - 9} to ${current * 10} of ${numRowPLC} entries`);
        } else {
            $('#back-plc').parent().removeClass('active');
            $('#current-plc').parent().removeClass('active');
            $('#next-plc').parent().addClass('active');
            $('#pagination-plc p').text(`Showing ${current * 10 - 9} to ${numRowPLC} of ${numRowPLC} entries`);
        }

    })

    $('#last-plc').click(function () {
        for (let i = 1; i <= numRowPLC; i++) {
            if (i > 10 * Math.floor(numRowPLC / 10)) $(`.plc-${i}`).show();
            else $(`.plc-${i}`).hide();
        }

        if (numRowPLC <= 20) {
            $('#back-plc').parent().show();
            $('#back-plc').html('1');
            $('#current-plc').parent().show();
            $('#current-plc').html('2');
            $('#next-plc').parent().hide();
            $('#back-plc').parent().removeClass('active');
            $('#current-plc').parent().addClass('active');
        } else {
            $('#back-plc').parent().show();
            $('#back-plc').html(Math.ceil(numRowPLC / 10) - 2);
            $('#current-plc').parent().show();
            $('#current-plc').html(Math.ceil(numRowPLC / 10) - 1);
            $('#next-plc').parent().show();
            $('#next-plc').html(Math.ceil(numRowPLC / 10));
            $('#back-plc').parent().removeClass('active');
            $('#current-plc').parent().removeClass('active');
            $('#next-plc').parent().addClass('active');
        }
        $('#pagination-plc p').text(`Showing ${10 * Math.floor(numRowPLC / 10) + 1} to ${numRowPLC} of ${numRowPLC} entries`);
    })


    // Handle page navigation action
    $('#first-tag').click(function () {
        console.log(numRowTag)
        for (let i = 1; i <= numRowTag; i++) {
            if (i <= 10) $(`.tag-${i}`).show();
            else $(`.tag-${i}`).hide();
        }

        if (numRowTag <= 20) {
            $('#back-tag').html('1');
            $('#current-tag').html('2');
            $('#next-tag').parent().hide();
            $('#back-tag').parent().addClass('active');
            $('#current-tag').parent().removeClass('active');
        } else {
            $('#back-tag').html('1');
            $('#current-tag').html('2');
            $('#next-tag').parent().show();
            $('#next-tag').html('3');
            $('#back-tag').parent().addClass('active');
            $('#current-tag').parent().removeClass('active');
            $('#next-tag').parent().removeClass('active');
        }
        $('#pagination-tag p').text(`Showing 1 to 10 of ${numRowTag} entries`);
    })

    $('#back-tag').click(function () {
        if (numRowTag <= 20) {
            for (let i = 1; i <= numRowTag; i++) {
                if (i <= 10) $(`.tag-${i}`).show();
                else $(`.tag-${i}`).hide();
            }

            $('#back-tag').parent().show();
            $('#current-tag').parent().show();
            $('#back-tag').parent().addClass('active');
            $('#current-tag').parent().removeClass('active');
            $('#pagination-tag p').text(`Showing 1 to 10 of ${numRowTag} entries`);
        } else {
            let current = parseInt($('#back-tag').html());

            for (let i = 1; i <= numRowTag; i++) {
                if (i <= current * 10 && i > current * 10 - 10)
                    $(`.tag-${i}`).show();
                else
                    $(`.tag-${i}`).hide();
            }

            if (current > 1) { // Rotate pagination
                $('#back-tag').html(current - 1);
                $('#current-tag').html(current);
                $('#next-tag').html(current + 1);
                $('#back-tag').parent().removeClass('active');
                $('#current-tag').parent().addClass('active');
                $('#next-tag').parent().removeClass('active');
                $('#pagination-tag p').text(`Showing ${current * 10 - 9} to ${current * 10} of ${numRowTag} entries`);
            } else {         // Don't rotate pagination
                $('#back-tag').parent().addClass('active');
                $('#current-tag').parent().removeClass('active');
                $('#next-tag').parent().removeClass('active');
                $('#pagination-tag p').text(`Showing 1 to 10 of ${numRowTag} entries`);
            }

        }

    })

    $('#current-tag').click(function () {
        let current = parseInt($('#current-tag').html());
        if (current == 2) {
            for (let i = 1; i <= numRowTag; i++) {
                if (i > 10 && i <= 20) $(`.tag-${i}`).show();
                else $(`.tag-${i}`).hide();
            }

            $('#back-tag').parent().removeClass('active');
            $('#current-tag').parent().addClass('active');
            $('#next-tag').parent().removeClass('active');
            $('#pagination-tag p').text(`Showing 11 to ${(numRowTag > 20) ? '20' : numRowTag} of ${numRowTag} entries`);
        } else if (current == Math.ceil(numRowTag / 10) - 1) {
            for (let i = 1; i <= numRowTag; i++) {
                if (i <= current * 10 && i > current * 10 - 10) $(`.tag-${i}`).show();
                else $(`.tag-${i}`).hide();
            }

            $('#back-tag').parent().removeClass('active');
            $('#current-tag').parent().addClass('active');
            $('#next-tag').parent().removeClass('active');
            $('#pagination-tag p').text(`Showing ${current * 10 - 9} to ${current * 10} of ${numRowTag} entries`);
        }
    })

    $('#next-tag').click(function () {
        let current = parseInt($('#next-tag').html());

        for (let i = 1; i <= numRowTag; i++) {
            if (i <= current * 10 && i > current * 10 - 10) $(`.tag-${i}`).show();
            else $(`.tag-${i}`).hide();
        }

        if (current == 3 && numRowTag <= 30) { // Don't rotate pagination
            $('#back-tag').parent().removeClass('active');
            $('#current-tag').parent().removeClass('active');
            $('#next-tag').parent().addClass('active');
            $('#pagination-tag p').text(`Showing ${current * 10 - 9} to ${numRowTag} of ${numRowTag} entries`);
        } else if (current >= 3 && current < Math.ceil(numRowTag / 10)) {         // Rotate pagination
            $('#back-tag').html(current - 1);
            $('#current-tag').html(current);
            $('#next-tag').html(current + 1);
            $('#back-tag').parent().removeClass('active');
            $('#current-tag').parent().addClass('active');
            $('#next-tag').parent().removeClass('active');
            $('#pagination-tag p').text(`Showing ${current * 10 - 9} to ${current * 10} of ${numRowTag} entries`);
        } else {
            $('#back-tag').parent().removeClass('active');
            $('#current-tag').parent().removeClass('active');
            $('#next-tag').parent().addClass('active');
            $('#pagination-tag p').text(`Showing ${current * 10 - 9} to ${numRowTag} of ${numRowTag} entries`);
        }

    })

    $('#last-tag').click(function () {
        for (let i = 1; i <= numRowTag; i++) {
            if (i > 10 * Math.floor(numRowTag / 10)) $(`.tag-${i}`).show();
            else $(`.tag-${i}`).hide();
        }

        if (numRowTag <= 20) {
            $('#back-tag').parent().show();
            $('#back-tag').html('1');
            $('#current-tag').parent().show();
            $('#current-tag').html('2');
            $('#next-tag').parent().hide();
            $('#back-tag').parent().removeClass('active');
            $('#current-tag').parent().addClass('active');
        } else {
            $('#back-tag').parent().show();
            $('#back-tag').html(Math.ceil(numRowTag / 10) - 2);
            $('#current-tag').parent().show();
            $('#current-tag').html(Math.ceil(numRowTag / 10) - 1);
            $('#next-tag').parent().show();
            $('#next-tag').html(Math.ceil(numRowTag / 10));
            $('#back-tag').parent().removeClass('active');
            $('#current-tag').parent().removeClass('active');
            $('#next-tag').parent().addClass('active');
        }
        $('#pagination-tag p').text(`Showing ${10 * Math.floor(numRowTag / 10) + 1} to ${numRowTag} of ${numRowTag} entries`);
    })
}