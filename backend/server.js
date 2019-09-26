var Express = require("express");
var BodyParser = require("body-parser");
var PouchDB = require("pouchdb");
 
var app = Express();
 
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));
 
var database = new PouchDB("test");

var tables = new PouchDB("tables");

var users = new PouchDB("users");
 
app.get("/users", function(req, res) {
    users.allDocs({include_docs: true}).then(function(result) {
        res.send(result.rows.map(function(item) {
            return item.doc.username;
        }));
    }, function(error) {
        res.status(400).send(error);
    });
});



app.get("/tables", function(req, res) {
    tables.allDocs({include_docs: true}).then(function(result) {
        res.send(result.rows.map(function(item) {
            return item.doc.name;
        }));
    }, function(error) {
        res.status(400).send(error);
    });
});

app.get("/checkTables", function(req, res) {
    tables.allDocs({include_docs: true}).then(function(result) {
        var empty = true;
        for(i in result.rows){
            if(result.rows[i].doc.name=="1" && result.rows[i].doc.state=="active"){
                res.send("1");
                empty = false;
                break;
            }
            if(result.rows[i].doc.name=="2" && result.rows[i].doc.state=="active"){
                res.send("2");
                empty = false;
                break;
            }
        }
        if(empty){
            res.send("0");
        }
    }, function(error) {
        res.status(400).send(error);
    });
});

app.post("/login", function(req, res) {
    users.allDocs({include_docs: true}).then(function(result) {
        var flag = false;
        for(i in result.rows){
            if(result.rows[i].doc.username == req.body.username && result.rows[i].doc.password == req.body.password){
                flag = true;
                break;
            }
        }
        if(flag){
            res.send("200")
        } else{
            res.send("404")
        }
    }, function(error) {
        res.status(400).send(error);
    });
});
 
app.post("/register", function(req, res) {
    if(!req.body.username) {
        return res.status(400).send({"status": "error", "message": "A `username` is required"});
    } else if(!req.body.password) {
        return res.status(400).send({"status": "error", "message": "A `password` is required"});
    }
    users.post(req.body).then(function(result) {
        res.send(result);
    }, function(error) {
        res.status(400).send(error);
    });
});

app.post("/addTable", function(req, res) {
    if(!req.body.name) {
        return res.status(400).send({"status": "error", "message": "A `name` is required"});
    } else if(!req.body.user) {
        return res.status(400).send({"status": "error", "message": "A `user` is required"});
    } else if(!req.body.state) {
        return res.status(400).send({"status": "error", "message": "A `state` is required"});
    }
    tables.post(req.body).then(function(result) {
        res.send(result);
    }, function(error) {
        res.status(400).send(error);
    });
});

app.post("/reserve", function(req, res) {
    tables.get(req.body.name).then(function(result) {
        return database.remove(result);
    }).then(function(result) {
        tables.post(req.body).then(function(result) {
            res.send(result);
        }, function(error) {
            res.status(400).send(error);
        })
    }, function(error) {
        res.status(400).send(error);
    });
});

app.post("/arrive", function(req, res) {
    tables.get(req.body.name).then(function(result) {
        return database.remove(result);
    }).then(function(result) {
        tables.post(req.body).then(function(result) {
            res.send(result);
        }, function(error) {
            res.status(400).send(error);
        })
    }, function(error) {
        res.status(400).send(error);
    });
});
 
var server = app.listen(3000, function() {
    tables.info().then(function(info) {
        console.log(info);
        console.log("Listening on port %s...", server.address().port);
    });
});
