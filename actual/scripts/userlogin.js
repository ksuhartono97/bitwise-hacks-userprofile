/**
 * Created by User on 11/12/2016.
 */

var db = new PouchDB('http://localhost:5984/userdata');

var doRegister = function() {
    var userName = document.getElementById( 'registerUsername' ).value;
    var password = document.getElementById( 'registerPassword' ).value;
    db.signup(userName, password, function(err, response) {
        if(err) {
            if(err.name === 'conflict') {
                alert(userName + "already exists, choose another username");
            }
            else if(err.name === 'forbidden') {
                alert("invalid username")
            }
            else {
                alert(err);
            }
        }
        if(response.ok) alert("Registration successful");
    })
};
var doLogin = function() {
    var userName = document.getElementById( 'loginUsername' ).value;
    var password = document.getElementById( 'loginPassword' ).value;

    db.login(userName, password, function(err, response) {
        if(err){
            if(err.name === "unauthorized") {
                alert("name or password incorrect")
            }
            else {
                alert(err);
            }
        }
        if(response.ok) {
            alert("Login successful");
            window.location = "../actual/profile.html"
        }
    });

};

var doLogout = function() {
    db.logout(function(err, response) {
        if(err) {
            alert("Network error")
        }
        if(response.ok) {
            alert("Logout successful");
        }
    })
}
