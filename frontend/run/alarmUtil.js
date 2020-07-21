import moment from 'moment';

export const updateAlarmTable = function(alarms){
    $('#alarm-table').empty();
    if (Array.isArray(alarms)){
        alarms.forEach(function(alarm, index){
            let row = createRowAlarmTable(alarm, index + 1);
            $('#alarm-table').append(row);
        })
    }
}

function createRowAlarmTable(alarm, index){
    //const isFirstRender = (index < 11)? '' : 'display: none;';
    return `
        <tr class="alarm ${alarm.tagName}" id="row-${index}" 
            style="background-color: ${(alarm.state)? '#9aff9a': '#d6d3d3'};"
            onmouseover="this.style.backgroundColor = 'white';"
            onmouseout="this.style.backgroundColor = '${(alarm.state)? '#9aff9a': '#d6d3d3'}';"
        >
            <td class="text-center">${(index < 10) ? "0" + index : index}</td>
            <td class="text-center">${alarm.tagName}</td>
            <td class="text-center">${(alarm.hihi)? 'ANALOG':'DIGITAL'}</td>
            <td class="text-center">${alarm.value}</td>
            <td class="text-center">${alarm.hihi}</td>
            <td class="text-center">${alarm.hi}</td>
            <td class="text-center">${alarm.low}</td>
            <td class="text-center">${alarm.lowlow}</td>
            <td class="text-center">${moment(alarm.timestamp).format('DD/MM/YYYY h:mm:ss A')}</td>
            <td class="text-center">${(alarm.ack)? 'ACK':'UnACK'}</td>
            <td class="td-actions text-center">
                <button type="button" rel="tooltip" class="btn btn-danger"
                    data-original-title="Acknowledge" onclick="ackAlarm('${alarm.tagName}')">
                    <i class="material-icons">verified_user</i>
                </button>
            </td>
        </tr>
    `
}


export const paginationSetup = function(numOfRow, tableId){
    $(`#${tableId} #first`).off('click');
    $(`#${tableId} #back`).off('click');
    $(`#${tableId} #current`).off('click');
    $(`#${tableId} #next`).off('click');
    $(`#${tableId} #last`).off('click');


    if (numOfRow < 10){
        $(`#${tableId} #first`).parent().hide();
        $(`#${tableId} #back`).parent().hide();
        $(`#${tableId} #current`).parent().hide();
        $(`#${tableId} #next`).parent().hide();
        $(`#${tableId} #last`).parent().hide();
        $(`#${tableId} #pagination p`).text(`Showing 1 to ${numOfRow} of ${numOfRow} entries`);
    }else{
        $(`#${tableId} #pagination p`).text(`Showing 1 to 10 of ${numOfRow} entries`);
        if (numOfRow <= 20){
            $(`#${tableId} #back`).parent().show();
            $(`#${tableId} #back`).html('1');
            $(`#${tableId} #current`).parent().show();
            $(`#${tableId} #current`).html('2');
            $(`#${tableId} #next`).parent().hide();
            $(`#${tableId} #back`).parent().addClass('active');
            $(`#${tableId} #current`).parent().removeClass('active');
        }else{
            $(`#${tableId} #back`).parent().show();
            $(`#${tableId} #back`).html('1');
            $(`#${tableId} #current`).parent().show();
            $(`#${tableId} #current`).html('2');
            $(`#${tableId} #next`).parent().show();
            $(`#${tableId} #next`).html('3');
            $(`#${tableId} #back`).parent().addClass('active');
            $(`#${tableId} #current`).parent().removeClass('active');
            $(`#${tableId} #next`).parent().removeClass('active');
        }
    }

    $(`#${tableId} #first`).click(function(){
        for (let i = 1; i<= numOfRow; i++){
            if (i <= 10) $(`#row-${i}`).show();
            else         $(`#row-${i}`).hide();
        }
    
        if (numOfRow <= 20) {
            $(`#${tableId} #back`).html('1');
            $(`#${tableId} #current`).html('2');
            $(`#${tableId} #next`).parent().hide();
            $(`#${tableId} #back`).parent().addClass('active');
            $(`#${tableId} #current`).parent().removeClass('active');
        }else{
            $(`#${tableId} #back`).html('1');
            $(`#${tableId} #current`).html('2');
            $(`#${tableId} #next`).parent().show();
            $(`#${tableId} #next`).html('3');
            $(`#${tableId} #back`).parent().addClass('active');
            $(`#${tableId} #current`).parent().removeClass('active');
            $(`#${tableId} #next`).parent().removeClass('active');
        }
        $(`#${tableId} #pagination p`).text(`Showing 1 to 10 of ${numOfRow} entries`);
    })
    
    $(`#${tableId} #back`).click(function(){    
        if (numOfRow <= 20) {
            for (let i = 1; i<= numOfRow; i++){
                if (i <= 10) $(`#row-${i}`).show();
                else         $(`#row-${i}`).hide();
            }
    
            $(`#${tableId} #back`).parent().show();
            $(`#${tableId} #current`).parent().show();
            $(`#${tableId} #back`).parent().addClass('active');
            $(`#${tableId} #current`).parent().removeClass('active');
            $(`#${tableId} #pagination p`).text(`Showing 1 to 10 of ${numOfRow} entries`);
        }else{
            let current = parseInt( $(`#${tableId} #back`).html());
    
            for (let i = 1; i<= numOfRow; i++){
                if (i <= current*10 && i > current*10-10) $(`#row-${i}`).show();
                else         $(`#row-${i}`).hide();
            }
    
            if (current > 1){ 
                $(`#${tableId} #back`).html(current-1);
                $(`#${tableId} #current`).html(current);
                $(`#${tableId} #next`).html(current+1);
                $(`#${tableId} #back`).parent().removeClass('active');
                $(`#${tableId} #current`).parent().addClass('active');
                $(`#${tableId} #next`).parent().removeClass('active');
                $(`#${tableId} #pagination p`).text(`Showing ${current*10-9} to ${current*10} of ${numOfRow} entries`);
            }else{         // Don't rotate pagination
                $(`#${tableId} #back`).parent().addClass('active');
                $(`#${tableId} #current`).parent().removeClass('active');
                $(`#${tableId} #next`).parent().removeClass('active');
                $(`#${tableId} #pagination p`).text(`Showing 1 to 10 of ${numOfRow} entries`);
            }
            
        }
        
    })
    
    $(`#${tableId} #current`).click(function(){
        let current = parseInt($(`#${tableId} #current`).html());
        if (current == 2){
            for (let i = 1; i<= numOfRow; i++){
                if ( i > 10 && i <= 20) $(`#row-${i}`).show();
                else         $(`#row-${i}`).hide();
            }
    
            $(`#${tableId} #back`).parent().removeClass('active');
            $(`#${tableId} #current`).parent().addClass('active');
            $(`#${tableId} #next`).parent().removeClass('active');
            $(`#${tableId} #pagination p`).text(`Showing 11 to ${(numOfRow>20)? '20': numOfRow} of ${numOfRow} entries`);
        }else if(current == Math.ceil(numOfRow/10)-1){
            for (let i = 1; i<= numOfRow; i++){
                if (i <= current*10 && i > current*10-10) $(`#row-${i}`).show();
                else         $(`#row-${i}`).hide();
            }
    
            $(`#${tableId} #back`).parent().removeClass('active');
            $(`#${tableId} #current`).parent().addClass('active');
            $(`#${tableId} #next`).parent().removeClass('active');
            $(`#${tableId} #pagination p`).text(`Showing ${current*10-9} to ${current*10} of ${numOfRow} entries`);
        }
    })
    
    $(`#${tableId} #next`).click(function(){
        let current = parseInt($(`#${tableId} #next`).html());
    
        for (let i = 1; i <= numOfRow; i++) {
            if (i <= current * 10 && i > current * 10 - 10) $(`#row-${i}`).show();
            else $(`#row-${i}`).hide();
        }
    
        if (current == 3 && numOfRow <= 30) { // Don't rotate pagination
            $(`#${tableId} #back`).parent().removeClass('active');
            $(`#${tableId} #current`).parent().removeClass('active');
            $(`#${tableId} #next`).parent().addClass('active');
            $(`#${tableId} #pagination p`).text(`Showing ${current*10-9} to ${numOfRow} of ${numOfRow} entries`);
        } else if (current >= 3 && current < Math.ceil(numOfRow/10)){         // Rotate pagination
            $(`#${tableId} #back`).html(current - 1);
            $(`#${tableId} #current`).html(current);
            $(`#${tableId} #next`).html(current + 1);
            $(`#${tableId} #back`).parent().removeClass('active');
            $(`#${tableId} #current`).parent().addClass('active');
            $(`#${tableId} #next`).parent().removeClass('active');
            $(`#${tableId} #pagination p`).text(`Showing ${current*10-9} to ${current*10} of ${numOfRow} entries`);
        }else{
            $(`#${tableId} #back`).parent().removeClass('active');
            $(`#${tableId} #current`).parent().removeClass('active');
            $(`#${tableId} #next`).parent().addClass('active');
            $(`#${tableId} #pagination p`).text(`Showing ${current*10-9} to ${numOfRow} of ${numOfRow} entries`);
        }
        
    })
    
    $(`#${tableId} #last`).click(function(){
        for (let i = 1; i<= numOfRow; i++){
            if (i > 10*Math.floor(numOfRow/10)) $(`#row-${i}`).show();
            else         $(`#row-${i}`).hide();
        }
    
        if (numOfRow <= 20) {
            $(`#${tableId} #back`).parent().show();
            $(`#${tableId} #back`).html('1');
            $(`#${tableId} #current`).parent().show();
            $(`#${tableId} #current`).html('2');
            $(`#${tableId} #next`).parent().hide();
            $(`#${tableId} #back`).parent().removeClass('active');
            $(`#${tableId} #current`).parent().addClass('active');
        }else{
            $(`#${tableId} #back`).parent().show();
            $(`#${tableId} #back`).html(Math.ceil(numOfRow/10)-2);
            $(`#${tableId} #current`).parent().show();
            $(`#${tableId} #current`).html(Math.ceil(numOfRow/10)-1);
            $(`#${tableId} #next`).parent().show();
            $(`#${tableId} #next`).html(Math.ceil(numOfRow/10));
            $(`#${tableId} #back`).parent().removeClass('active');
            $(`#${tableId} #current`).parent().removeClass('active');
            $(`#${tableId} #next`).parent().addClass('active');
        }
        $(`#${tableId} #pagination p`).text(`Showing ${10*Math.floor(numOfRow/10)+1} to ${numOfRow} of ${numOfRow} entries`);
    })
}

paginationSetup(3, 'alarm');