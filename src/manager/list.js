// const initDataFromServer = require('./initData');
const initDataFromDB = require('./initData');
const Table          = require('./renderTable');

let numRow;
let start = 1;

// Init data from server
initDataFromDB()
.then((data) => {
    numRow = Table.renderGatewayTable(data);
    if (numRow < 10){
        $('#first').parent().hide();
        $('#back').parent().hide();
        $('#current').parent().hide();
        $('#next').parent().hide();
        $('#last').parent().hide();
        $('#pagination p').text(`Showing 1 to ${numRow} of ${numRow} entries`);
    }else{
        $('#pagination p').text(`Showing 1 to 10 of ${numRow} entries`);
        if (numRow <= 20){
            $('#back').parent().show();
            $('#back').html('1');
            $('#current').parent().show();
            $('#current').html('2');
            $('#next').parent().hide();
            $('#back').parent().addClass('active');
            $('#current').parent().removeClass('active');
        }else{
            $('#back').parent().show();
            $('#back').html('1');
            $('#current').parent().show();
            $('#current').html('2');
            $('#next').parent().show();
            $('#next').html('3');
            $('#back').parent().addClass('active');
            $('#current').parent().removeClass('active');
            $('#next').parent().removeClass('active');
        }
    }
})
.catch((err) => console.log('Error: ', err))

$('#first').click(function(){
    for (let i = 1; i<= numRow; i++){
        if (i <= 10) $(`#gateway-${i}`).show();
        else         $(`#gateway-${i}`).hide();
    }

    if (numRow <= 20) {
        $('#back').html('1');
        $('#current').html('2');
        $('#next').parent().hide();
        $('#back').parent().addClass('active');
        $('#current').parent().removeClass('active');
    }else{
        $('#back').html('1');
        $('#current').html('2');
        $('#next').parent().show();
        $('#next').html('3');
        $('#back').parent().addClass('active');
        $('#current').parent().removeClass('active');
        $('#next').parent().removeClass('active');
    }
    $('#pagination p').text(`Showing 1 to 10 of ${numRow} entries`);
})

$('#back').click(function(){    
    if (numRow <= 20) {
        for (let i = 1; i<= numRow; i++){
            if (i <= 10) $(`#gateway-${i}`).show();
            else         $(`#gateway-${i}`).hide();
        }

        $('#back').parent().show();
        $('#current').parent().show();
        $('#back').parent().addClass('active');
        $('#current').parent().removeClass('active');
        $('#pagination p').text(`Showing 1 to 10 of ${numRow} entries`);
    }else{
        let current = parseInt( $('#back').html());

        for (let i = 1; i<= numRow; i++){
            if (i <= current*10 && i > current*10-10) $(`#gateway-${i}`).show();
            else         $(`#gateway-${i}`).hide();
        }

        if (current > 1){ // Rotate pagination
            $('#back').html(current-1);
            $('#current').html(current);
            $('#next').html(current+1);
            $('#back').parent().removeClass('active');
            $('#current').parent().addClass('active');
            $('#next').parent().removeClass('active');
            $('#pagination p').text(`Showing ${current*10-9} to ${current*10} of ${numRow} entries`);
        }else{         // Don't rotate pagination
            $('#back').parent().addClass('active');
            $('#current').parent().removeClass('active');
            $('#next').parent().removeClass('active');
            $('#pagination p').text(`Showing 1 to 10 of ${numRow} entries`);
        }
        
    }
    
})

$('#current').click(function(){
    let current = parseInt($('#current').html());
    if (current == 2){
        for (let i = 1; i<= numRow; i++){
            if ( i > 10 && i <= 20) $(`#gateway-${i}`).show();
            else         $(`#gateway-${i}`).hide();
        }

        $('#back').parent().removeClass('active');
        $('#current').parent().addClass('active');
        $('#next').parent().removeClass('active');
        $('#pagination p').text(`Showing 11 to ${(numRow>20)? '20': numRow} of ${numRow} entries`);
    }else if(current == Math.ceil(numRow/10)-1){
        for (let i = 1; i<= numRow; i++){
            if (i <= current*10 && i > current*10-10) $(`#gateway-${i}`).show();
            else         $(`#gateway-${i}`).hide();
        }

        $('#back').parent().removeClass('active');
        $('#current').parent().addClass('active');
        $('#next').parent().removeClass('active');
        $('#pagination p').text(`Showing ${current*10-9} to ${current*10} of ${numRow} entries`);
    }
})

$('#next').click(function(){
    let current = parseInt($('#next').html());

    for (let i = 1; i <= numRow; i++) {
        if (i <= current * 10 && i > current * 10 - 10) $(`#gateway-${i}`).show();
        else $(`#gateway-${i}`).hide();
    }

    if (current == 3 && numRow <= 30) { // Don't rotate pagination
        $('#back').parent().removeClass('active');
        $('#current').parent().removeClass('active');
        $('#next').parent().addClass('active');
        $('#pagination p').text(`Showing ${current*10-9} to ${numRow} of ${numRow} entries`);
    } else if (current >= 3 && current < Math.ceil(numRow/10)){         // Rotate pagination
        $('#back').html(current - 1);
        $('#current').html(current);
        $('#next').html(current + 1);
        $('#back').parent().removeClass('active');
        $('#current').parent().addClass('active');
        $('#next').parent().removeClass('active');
        $('#pagination p').text(`Showing ${current*10-9} to ${current*10} of ${numRow} entries`);
    }else{
        $('#back').parent().removeClass('active');
        $('#current').parent().removeClass('active');
        $('#next').parent().addClass('active');
        $('#pagination p').text(`Showing ${current*10-9} to ${numRow} of ${numRow} entries`);
    }
    
})

$('#last').click(function(){
    for (let i = 1; i<= numRow; i++){
        if (i > 10*Math.floor(numRow/10)) $(`#gateway-${i}`).show();
        else         $(`#gateway-${i}`).hide();
    }

    if (numRow <= 20) {
        $('#back').parent().show();
        $('#back').html('1');
        $('#current').parent().show();
        $('#current').html('2');
        $('#next').parent().hide();
        $('#back').parent().removeClass('active');
        $('#current').parent().addClass('active');
    }else{
        $('#back').parent().show();
        $('#back').html(Math.ceil(numRow/10)-2);
        $('#current').parent().show();
        $('#current').html(Math.ceil(numRow/10)-1);
        $('#next').parent().show();
        $('#next').html(Math.ceil(numRow/10));
        $('#back').parent().removeClass('active');
        $('#current').parent().removeClass('active');
        $('#next').parent().addClass('active');
    }
    $('#pagination p').text(`Showing ${10*Math.floor(numRow/10)+1} to ${numRow} of ${numRow} entries`);
})


