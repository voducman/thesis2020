const LocalStrategy = require('passport-local').Strategy;
const User          = require('../models/User');
const Utils         = require('../controller/Utils');
const fs            = require('fs');
const path          = require('path');

module.exports = function(passport){
    
    passport.serializeUser(function(user, done){
        done(null, user.id);
    })

    passport.deserializeUser(function(id, done){
        User.findById(id, function(err, user){
            done(err, user);
        })
    })

    passport.use('local-signin', new LocalStrategy({
        // By default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true      // allows us to pass back the entire request to the callback

    }, function(req, email, password, done){  // callback with email and password
        console.log(req.body);
        // Find a user whose email is the same as the forms email
        // We are checking to see if the user trying to login already exists
        User.findOne({'local.email': email}, function(err, user){
            // If there are any errors, return the error before anything else
            if (err)  return done(err);

            // If no user is found, return the message
            if (!user)  return done(null, false); // req.flash is the way to set flashdata using connect-flash

            // If the user is found but the password is wrong
            if (!user.validPassword(password)){
                return done(null, false); // create the loginMessage and save it to session as flashdata
            }    
          
            return done(null, user);
        })
    }));

    passport.use('local-signup', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true 

    }, function(req, email, password, done){
        // Check username/email/password are valid?
        
        let isEmail, isPasswd, isUsername, isTermCond;
        isEmail    = Utils.isEmailValid(email);
        console.log("step 1 - check email  " + isEmail)
        isPasswd   = Utils.isPasswordValid(password);
        console.log("step 2 - check password  " + isPasswd)
        isUsername = Utils.isUsernameValid(req.body['name']);
        console.log("step 3 - check username  " + isUsername)
        isTermCond = Utils.isTermConditionValid(req.body['optionsCheckboxes']);
        console.log("step 4 - check term and condition  " + isTermCond)

        if (!isEmail || !isPasswd || !isUsername || !isTermCond){
            console.log("User's infomations are not valid")
            return done(null, false);
        }

        process.nextTick(function() {
            User.findOne({ 'local.email' :  email }, function(err, user) {
                if (err)
                    return done(err);
                if (user) {
                    return done(null, false);
                } else {
                    let newUser               = new User();
                    newUser.local.email       = email;
                    newUser.local.password    = newUser.generateHash(password);
                    newUser.local.username    = req.body["name"];
                    newUser.local.termCond    = true;
                    newUser.save(function(err) {
                        if (err){
                            throw err;
                        }
                            
                        try{
                            fs.mkdirSync(path.join(__dirname, '../public/userdata', email));
                            fs.mkdirSync(path.join(__dirname, '../public/userdata', email, 'avatar')); 
                            fs.mkdirSync(path.join(__dirname, '../public/userdata', email, 'symbol')); 
                        }catch(e){
                            console.log("Create userdata folder get ERROR.")
                        }
                        
                        return done(null, newUser);
                    });
                }
            });    
        });   
    }))
}
