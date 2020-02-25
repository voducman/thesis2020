
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
        }
    });
};

// Get active class in sidebar
(function(){
    let route = location.pathname.replace('/','');
    // console.log("Current pathname is: ", route);
    $(`.${route}`).addClass("active");
})();