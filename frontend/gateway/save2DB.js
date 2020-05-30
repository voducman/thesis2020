import {showNotification} from '../utils';

// Add Control+S event to save data to Database on server
$(window).keydown(function(event){
    if (event.which == 83 && event.ctrlKey) {
        putGatewaytoDatabase();
        return false;
        
    }
    return true;
})

/**
* @summary function for put gateway data to MongoDB
 * @example in save button
 */
window.putGatewaytoDatabase = function (){

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
