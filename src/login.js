$('button[type=submit]').click(function(event){
    let isEmailValid, isPasswordValid;

    isEmailValid    =  isEmail($("input[name=email]").val());
    isPasswordValid = !$("input[name=password]").parent().hasClass("has-error") && $("input[name=password]").val().trim().length >= 6;
    
    if (!isEmailValid){
        $("input[name=email]").parent().addClass("has-error");
        showNotification("top", "right", "danger", "<big>ERROR:</big>  Invalid <b>email</b>, please enter again.");
    }
    if (!isPasswordValid){
        $("input[name=password]").parent().addClass("has-error");
        showNotification("top", "right", "danger", "<big>ERROR:</big>  Invalid <b>password</b>, please enter again. Minimum of 6 characters.");
    }
    
    if (isEmailValid && isPasswordValid){
        console.log("form submit")
    }else{
        event.preventDefault();
    }
   
})

function isEmail(email){
    const regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}


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
}