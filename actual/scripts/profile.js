/**
 * Created by User on 11/12/2016.
 */

var db = new PouchDB('http://localhost:5984/userdata');
var curr_sess;

var printCurrSess = function() {
    db.getSession(function(err, response) {
        if(err) {
            alert("network error")
        }
        else if(!response.userCtx.name) {
            alert("No one logged in")
        }
        else {
            document.getElementById("sess_id").innerHTML = response.userCtx.name;
            curr_sess = response.userCtx.name;
            //Init database
            db.get(curr_sess, function(err, doc) {
                if (err) {
                    db.put({
                        _id: curr_sess, stocks: [],
                    }, function(err, response) {
                        if (err) { return console.log(err); }
                        if(response.ok) {
                            alert("Data added and created new")
                        }
                    });
                    return console.log(err); }
                alert("Data exists, loading")
                updateTable();
            });
        }
    })
};

var doLogout = function() {
    db.logout(function(err, response) {
        if(err) {
            alert("Network error")
        }
        if(response.ok) {
            alert("Logout successful");
            window.location = "../actual/userlogin.html"
        }
    })
};

var addOrder = function() {
    db.get(curr_sess, function(err, doc){
        if(err) {
            alert("get an admin")
            return console.log(err);
        }
        var tempStocks = doc.stocks;
        var newEntry = {
            stocks:document.getElementById( 'stockSymbol' ).value,
            order:document.getElementById( 'orders' ).value
        };
        alert(JSON.stringify(newEntry))
        tempStocks.push(newEntry);
        db.put({
            _id: curr_sess,
            _rev: doc._rev,
            stocks: tempStocks,
        }, function(err, response) {
            if(err) {
                return console.log(err);
            }
            updateTable();
        })
    })
};

var updateTable = function() {
    db.get(curr_sess, function(err, doc){
        if(err) {
            alert("data err");
            return console.log(err);
        }
        $("#stockData > tbody > tr").remove();
        var tempStocks = doc.stocks;
        tempStocks.forEach(function(stock) {
            $("#stockData > tbody:last-child").append("<tr><td>" + stock.stocks + "</td><td>" + stock.order + "</td></tr>")
        })


    })
};

$("#orderAdd").on("click", function() {
    addOrder();
})