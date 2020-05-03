
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


function showFailNotification(message){

    $.notify({
        icon: "add_alert",
        message: `<b>FAIL</b>: ${message}`

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

function showErrorNotification(message){

    $.notify({
        icon: "add_alert",
        message: `<b>ERROR</b>: ${message}`

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

function showSuccessNotification(message){

    $.notify({
        icon: "add_alert",
        message: `<b>SUCCESS</b>: ${message}`

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
    showSuccessNotification
 }