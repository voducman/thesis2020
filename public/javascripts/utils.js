<<<<<<< HEAD

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
=======
let sessionUser;

$(document).ready(function(){
    $.get("user/infor", function(data, status){
        if (status == 'success'){
            console.log(data);
            sessionUser = data;
            addLockScreen2Page(data.username,"static/assets/img/faces/avatar.jpg");
        }else{
            addLockScreen2Page("username","static/assets/img/faces/avatar.jpg");
        }

        $("#btn-unlock").click(function(event){

            event.preventDefault();
            const dataSend = {
                email: sessionUser.email,
                password: $("input[name=password]").val()
            };
        
            console.log("datasend: ", dataSend);
            $.post("/unlockscreen", dataSend,
                function (data, status, xhr) {
                    console.log("data", data);
                    console.log("status", status);
                    $("#main-view").removeClass("hidden");
                    $("#lock-view").addClass("hidden");

                }).fail(function () {
                    window.location = "/dashboard";
                })
        })
    })
})

$("#lockscreen").click(function(){
    $("#main-view").addClass("hidden");
    $("#lock-view").removeClass("hidden");
    // $("#lockscreen").children(".material-icons").text("lock_open");
    // Add background image to screen
    demo.checkFullPageBackgroundImage();

    // Show card after 1s
    setTimeout(function () {
        // after 1000 ms we add the class animated to the login/register card
        $('.card').removeClass('card-hidden');
    }, 1000);
})

function addLockScreen2Page(username, avatarLink){
    $("body").append($.parseHTML(`
        <div class="wrapper wrapper-full-page hidden" id="lock-view">
            <div class="full-page lock-page" filter-color="black" data-image="static/assets/img/lock.jpeg">
                <!--   you can change the color of the filter page using: data-color="blue | green | orange | red | purple" -->
                <div class="content">
                    <form method="POST" action="#">
                        <div class="card card-profile card-hidden">
                            <div class="card-avatar">
                                <a href="#">
                                    <img class="avatar" src=${avatarLink} alt="User's Avatar">
                                </a>
                            </div>
                            <div class="card-content">
                                <h4 class="card-title">${username}</h4>
                                <div class="form-group label-floating is-empty">
                                    <label class="control-label">Enter Password</label>
                                    <input type="password" name="password" class="form-control">
                                </div>
                            </div>
                            <div class="card-footer">
                                <button id="btn-unlock" class="btn btn-rose btn-round">Unlock</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>`));

>>>>>>> d08db7523eb668d6f439cf239e783dc33e314cd7
}