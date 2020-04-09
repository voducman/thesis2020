/**
 * @summary: Event listener function
 * @example: create-new button, save-button
 */

window.addPopupCreateNew = function(){
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
                            <label class="control-label">Adress * (Ex: <i>District 10, HCMC, Vietnam</i>)</label>
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


window.removeAddGateway = function(){
    $('#showAddGateway').remove();
    $('#addGateway').remove();
    $('.modal-backdrop').remove();
}