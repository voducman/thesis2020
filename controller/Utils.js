module.exports = {
    getNameFromEmail: function(email){
        const mailCheck = /([\w]+)@gmail.com/; 
        const results = mailCheck.exec(email);
        //console.log(results);
        if (results){
            return results[1];
        } else{
            return "invalid name"
        }
    },

    isEmailValid: function(email){
        if (typeof email == 'undefined'){
            return false;
        };
        const regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return regex.test(email);
    },

    isUsernameValid: function(username){
        if (typeof username == 'undefined'){
            return false;
        }
        return (username.trim().length >= 5);
    },

    isPasswordValid: function(password){
        if (typeof password == 'undefined'){
            return false;
        }
        return (password.trim().length >= 6);
    },

    isTermConditionValid: function(term){
        return (term == 'on');
    },

    isLoggedIn: function(req, res, next){
        if (req.isAuthenticated()) {
            return next();
        }
        res.redirect("/login");
    }
}

