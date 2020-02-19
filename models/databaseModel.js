/* Import to handle and interact with database  */

module.exports.checkUNnPW = function(user){

    let check = true;
    let {username, password} = user;

    if (username.trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null){
        check = false;
    }
    
    if (password.trim() == ""){
        check = false;
    }
    return check;
}