
// Submit user's data to server
$("#updateProfile").submit(function(e){
    e.preventDefault();

    $.ajax({
        url: "/profile/updateInfo",
        type: "PUT",
        data:  $("#updateProfile").serialize(),
        success: function(result){
           
            swal({
                title: 'Update information success',
                text: "You clicked the button to reload Profile Page",
                type: 'success',
                showCancelButton: true,
                confirmButtonClass: 'btn btn-success',
                cancelButtonClass: 'btn btn-danger',
                buttonsStyling: false
            }).then(function() {
              location.reload();
            });
        },
        
        error: function(error){
            showNotification("top", "right", "danger", "<b>Update</b> profile unsuccess. View log to see the error.")
            console.log("Get an error here: ", error);
        }
    })

})

// Support for load avatar image
document.getElementById("file-input").onchange = function(e) {
    loadImage(
      e.target.files[0],
      function(image) {  
        console.log(image);
        let blobData;
        // image is a canvas element
        // let [image, data] = convertCanvasToImage(img);
        image.toBlob(function(blob){
            console.log("blob: ", blob);
            showImageOnModal(image, blob);
        }, 'image/png');

      },
      { maxWidth:  300,
        maxHeight: 300,
        // when set "canvas: false" - library not working - result still is canvas, so...
        canvas: true,
        crop: true, }
    );
  };


function showImageOnModal(img, data){
    appendContent = `
        <div id="modal">
            <button id="preview-avatar" class="btn btn-raised btn-round btn-info hidden" data-toggle="modal" data-target="#noticeModal">
                Notice modal
            </button>
            <div class="modal fade" id="noticeModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-notice">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true"><i class="material-icons">clear</i></button>
                        <h5 class="modal-title text-danger" id="myModalLabel">Check the uploaded photos. Click <b>Upload</b> to change the avatar</h5>
                    </div>
                    <div class="modal-body">
                        <div class="instruction">
                            <div class="row">
                                <div class="col-md-3"></div>
                                <div class="col-md-6 picture" id="preview-holder">
                                   
                                </div>
                                <div class="col-md-3"></div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer text-center">
                        <button id="btn-upload" type="button" class="btn btn-rose btn-round" data-dismiss="modal">Upload</button>
                    </div>
                </div>
            </div>
        </div>`

    // Remove old modal
    $("#modal" ).remove();    
    // Add new modal to DOM
    $("body").append(appendContent);
    // Clear old image
    $("#preview-holder").html("");
    // Add current image to modal
    $("#preview-holder").append(img);

    $("#preview-avatar").click();

    $("#btn-upload").click(function(){
        let formdata = new FormData();
        formdata.append("avatarImage", data, "avatar.png");
        console.log('get here')

        $.ajax({    
            url: "/profile/updateAvatar",
            type: "PUT",
            processData: false,
            contentType: false,
            data:  formdata,
            success: function(result){
               
                swal({
                    title: 'Update avatar success',
                    text: "You clicked the button to reload Profile Page",
                    type: 'success',
                    showCancelButton: true,
                    confirmButtonClass: 'btn btn-success',
                    cancelButtonClass: 'btn btn-danger',
                    buttonsStyling: false
                }).then(function() {
                  location.reload();
                });
            },
            
            error: function(error){
                showNotification("top", "right", "danger", "<b>Update</b> avatar unsuccess. View log to see the error.")
                console.log("Get an error here: ", error);
            }
        })
    })
}

function convertCanvasToImage(canvas) {
    let image = new Image();
    let data  = canvas.toDataURL("image/png");
	image.src = data;
	return [image, data];
}