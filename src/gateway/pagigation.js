
function initPagigation(numrow, prefix){

    for (let i = 1; i < numrow +1; i++){
        if (i < 11){
            $(`.${prefix}-${i}`).show();
        }else{
            $(`.${prefix}-${i}`).hide();
        }
    }

    if (numrow < 10){
        $(`#first-${prefix}`).parent().hide();
        $(`#back-${prefix}`).parent().hide();
        $(`#current-${prefix}`).parent().hide();
        $(`#next-${prefix}`).parent().hide();
        $(`#last-${prefix}`).parent().hide();
        if (numrow == 0) {
            $(`#pagination-${prefix} p`).text(`Showing 0 to ${numrow} of ${numrow} entries`);
        }else{
            $(`#pagination-${prefix} p`).text(`Showing 1 to ${numrow} of ${numrow} entries`);
        }
    }else{
        $(`#pagination-${prefix} p`).text(`Showing 1 to 10 of ${numrow} entries`);
        $(`#back-${prefix}`).parent().show();
        $(`#back-${prefix}`).html('1');
        $(`#current-${prefix}`).parent().show();
        $(`#current-${prefix}`).html('2');
        $(`#first-${prefix}`).parent().show();
        $(`#last-${prefix}`).parent().show();

        if (numrow <= 20){
            $(`#next-${prefix}`).parent().hide();
            $(`#back-${prefix}`).parent().addClass('active');
            $(`#current-${prefix}`).parent().removeClass('active');
        }else{
            $(`#next-${prefix}`).parent().show();
            $(`#next-${prefix}`).html('3');
            $(`#back-${prefix}`).parent().addClass('active');
            $(`#current-${prefix}`).parent().removeClass('active');
            $(`#next-${prefix}`).parent().removeClass('active');
        }
    }
}

module.exports = initPagigation;