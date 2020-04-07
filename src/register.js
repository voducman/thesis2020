$('#sign-up').click(function(){
    let isUsernameValid, isEmailValid, isPasswordValid, isTermCondition;

    isUsernameValid = !$("input[name=name]").parent().hasClass("has-error") && $("input[name=name]").val().trim().length >= 5;

    isEmailValid    =  isEmail($("input[name=email]").val());
    isPasswordValid = !$("input[name=password]").parent().hasClass("has-error") && $("input[name=password]").val().trim().length >= 6;
    isTermCondition = $("input[name=optionsCheckboxes").prop('checked');

    if (!isUsernameValid){ 
        $("input[name=name]").parent().addClass("has-error");
        showNotification("top", "right", "danger", "<big>ERROR:</big>  Invalid <b>username</b>, please enter again. Minimum of 5 characters.");
    }
    if (!isEmailValid){
        $("input[name=email]").parent().addClass("has-error");
        showNotification("top", "right", "danger", "<big>ERROR:</big>  Invalid <b>email</b>, please enter again.");
    }
    if (!isPasswordValid){
        $("input[name=password]").parent().addClass("has-error");
        showNotification("top", "right", "danger", "<big>ERROR:</big>  Invalid <b>password</b>, please enter again. Minimum of 6 characters.");
    }

    if (!isTermCondition){
        showNotification("top", "right", "warning", "<big>WARNING:</big>  <b>Term & Condition</b> are not valid, please check it to continue.");
    }
    

    if (isUsernameValid && isEmailValid && isPasswordValid && isTermCondition ){
        $.ajax({
            url: "/register",
            type: "POST",
            data: $("#register-form").serialize(),
            success: function(result,status,xhr){
                // to-do check is done?
                console.log(result);
                // sweet alert 2 of Creative Team
                swal({ title:"Sign Up Success", text: "You clicked the button to Sign In!", type: "success", buttonsStyling: false, confirmButtonClass: "btn btn-success go-login-page"})
                $('.go-login-page').click(function(){
                    window.location = "/login";
                });
            },
            error: function(xhr,status,error){
                console.log("Form submit get an error!");
                showNotification("top", "right", "danger", "<big>ERROR:</big> Used <b>Email</b>, re-enter another email to continue.");
            }
        })
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