function GetUserID(){
    var id_input = document.getElementById("id-input");
    var submit_id = document.getElementById("submit-id");
    var get_scholar_id = document.getElementById("get-scholar-id");
    var modal = document.getElementById("myModal");
    var modal_url = document.querySelector("#modal-url");
    var modal_content = document.getElementById("modal-content1");
    var modal_close = document.getElementById("modal-close");
    var user_id ="";
    const options = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(user_id),
    };
    submit_id.addEventListener("click", function(e){
        user_id = id_input.value;
        // console.log(user_id);
        location.href = "/user-setting?user_id=" + user_id;
    });
    get_scholar_id.addEventListener("click", function(e){
        modal.style.display = "block";
    });
    modal_close.onclick = function() {
        modal.style.display = "none";
    }
    modal_url.addEventListener("keypress", function(e){
        if(e.key == 'Enter'){
            if(modal_url.value.match("user=")){
                var user_index = modal_url.value.indexOf("user="); 
                var get_user_id = "";
                for (var i = user_index + 5; i < user_index + 17;i++){
                    get_user_id += modal_url.value[i];
                }
                modal_content.innerHTML = "<div class='modal-close'><i class='fa-solid fa-xmark' id='modal-close1'></i></div><div>Your User ID: " + get_user_id + "</div>"
            }else{
                modal_content.innerHTML = "<div class='modal-close'><i class='fa-solid fa-xmark' id='modal-close1'></i></div><div> The URL is invalid </div>"
            }
        }
        var modal_close1 = document.getElementById("modal-close1");
        modal_close1.onclick = function() {
            modal.style.display = "none";
        }
    })

}

GetUserID();
// FilterKeywords();