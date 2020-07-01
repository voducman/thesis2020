import moment from 'moment';

export const prependLogToTable = function(log, gatewayId){
    let row = createRowLogTable(log, gatewayId);
    $('#log-table').prepend(row);
    if ($('#log-table tr').length > 10){
        $('#log-table tr').last().remove();
    }
}

export const getExportFilterTime = function(){
    let timeFrom = $('#timepickerFrom input').val();
    let timeTo   = $('#timepickerTo input').val();
    return {timeFrom, timeTo};
}

function createRowLogTable(log, gatewayId){
    return `
        <tr class="log" style="max-height: 50px">
            <td class="text-center">${gatewayId}</td>
            <td class="text-center">${moment(log.timestamp).format('DD/MM/YYYY h:mm:ss A')}</td>
            <td class="text-right">
                <textarea rows="2">${log.message}</textarea>
            </td>
        </tr>
    `
}
