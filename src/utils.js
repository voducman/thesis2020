const ReceiveForm = require('../models/form/CommonReceiveForm');

function showNotification(from, align, type, message){

    $.notify({
        icon: "add_alert",
        message: message

    },{
        type: type,
        timer: 2000,
        placement: {
            from: from,
            align: align
        },
        z_index: 2000,
    });
};

/**
 * Show a fail notification about response of request
 * @param {string} message
 * @param {number} code
 */
function showFailNotification(message, code = 406){

    $.notify({
        icon: "add_alert",
        message: `<b>FAIL</b>: ${message} [HTTP Code: ${code}]`

    },{
        type: 'warning',
        timer: 2000,
        placement: {
            from: 'top',
            align: 'right'
        },
        z_index: 2000,
    });
};

/**
 * Show a error notification about response of request
 * @param {string} message
 * @param {number} code
 */
function showErrorNotification(message, code = 500){

    $.notify({
        icon: "add_alert",
        message: `<b>ERROR</b>: ${message} [HTTP Code: ${code}]`

    },{
        type: 'danger',
        timer: 2000,
        placement: {
            from: 'top',
            align: 'right'
        },
        z_index: 2000,
    });
};

/**
 * Show a success notification about response of request
 * @param {string} message
 * @param {number} code
 */
function showSuccessNotification(message, code = 200){

    $.notify({
        icon: "add_alert",
        message: `<b>SUCCESS</b>: ${message} [HTTP Code: ${code}]`

    },{
        type: 'success',
        timer: 2000,
        placement: {
            from: 'top',
            align: 'right'
        },
        z_index: 2000,
    });
};

function fortmatTime(time){
    let date = new Date(time);
    let year = date.getFullYear();
    let month = date.getMonth();
    let date_ = date.getDate();
    let hour  = date.getHours();
    let min   = date.getMinutes();
    let second = date.getSeconds();
    return `${hour}:${min}:${second} ${date_}/${month}/${year}`;
}

function parseResponse(responseObj, textStatus){
    
}

/**
 * Send Ajax request to server, 
 * then show notification about status of response
 * @param {string} requestURL
 * @param {string} method
 * @param {object} [data={}]
 * @returns {Promise<ReceiveForm>}
 */
function sendAjaxToServer(requestURL, method = "GET", data = {}) {
    console.debug({requestURL, method, data})
    let receiveForm, code;

    const parseResponse = function(responseObj, httpCode){

        if (receiveForm){
            code = httpCode;
        }else{
            receiveForm = new ReceiveForm(JSON.parse(responseObj));
            code = httpCode;
        }
    }

    return new Promise((resolve, reject) => {
        $.ajax({
            url: requestURL,
            method: method,
            data: data,
            contentType: "application/json",
            statusCode: {
                200: function(responseObj, textStatus){
                    parseResponse(responseObj, 200);
                    showSuccessNotification(receiveForm.getMessage(), code);
                },

                404: function(responseXHR, textStatus){
                    parseResponse(responseXHR.responseText, 404);
                    showFailNotification(receiveForm.getMessage(), code);
                },

                406: function(responseXHR, textStatus){
                    parseResponse(responseXHR.responseText, 406);
                    showFailNotification(receiveForm.getMessage(), code);
                },

                500: function(responseXHR, textStatus){
                    parseResponse(responseXHR.responseText, 500);
                    showErrorNotification(receiveForm.getMessage(), code);
                },
            }
        })
            .done(function (response) {
                if (!receiveForm){
                    receiveForm = new ReceiveForm(JSON.parse(response));
                }

                return resolve(receiveForm);
            })
            .fail(function (e) {
                if (!e.responseText){
                    showErrorNotification("SERVER OR NETWORK GET ERROR", e.status);
                }

                return reject(null);
            })
    })
}


/** 
 * @summary to look-up a beautiful text from rough text
 * @example Message("s7") return: "ETHERNET S7" | Message("modbus") return "MODBUS TCP"
 */

 function Message(text){
    const table = {
        "s7": "ETHERNET S7",
        "modbus": "MODBUS TCP",
        "opcua": "OPC UA",
        "siemens": "SIEMENS",
        "schneider": "SCHNEIDER",
        "mitsubishi": "MITSUBISHI",
        "s7-300": "S7-300",
        "s7-1200": "S7-1200",
        "s7-1500": "S7-1500",

        "1": "TRUE",
        "true": "TRUE",
        "0": "FALSE",
        "false": "FALSE",

        "hd": "HD Ready [1280 x 720]",
        'fhd': "FHD [1920 x 1080]",
        "qhd": "QHD [2560 x 1440]"
    }

    let result = table[text] || String(text).toUpperCase();
    return result;
 }


 module.exports = {
    showNotification, 
    fortmatTime,
    Message,
    showFailNotification,
    showErrorNotification,
    showSuccessNotification,
    sendAjaxToServer
 }