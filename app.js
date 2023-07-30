var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));


//index
//app.get("/", function(req,res){res.render("index", {imagini :Imagini});});
app.get("/", function(req,res){
	res.render("index");
});

//chat
app.get("/chat",function(req,res){
    res.render("chat");
});

//info
app.get("/info", function(req, res){
	res.render("info");
});



app.listen(3000, '0.0.0.0' ,function(){
    console.log("server on")
});

var mongo = require('mongodb').MongoClient,
    client = require('socket.io').listen(8080).sockets;

mongo.connect('mongodb://127.0.0.1/Chat', function(err, db){
    if (err) throw err;
    
    client.on('connection', function(socket) {
        
        var col = db.collection('Chat'),
			sendStatus = function(s) {
				socket.emit('status', s);
			};
		
		
		//emit all messages
		col.find().limit(100).sort({_id: 1}).toArray(function(err, res){
			if(err) throw err;
			socket.emit('output', res);
			
		});
        
        //wait for input
        
        socket.on('input', function(data){
            console.log(data);
            var name=data.name,
                message=data.message,
                incorectChar= /^\s*$/;
            
            if(incorectChar.test(name) || incorectChar.test(message)){
                sendStatus('Name and message is required');
            } 
            else{
                //insert in database
                col.insert({name:name, message:message},function(){
					
					//emit latest message to all clients
					
					client.emit('output', [data]);
                
					sendStatus({
						message: "Message sent",
						clear: true
					});
                });
            }
            
             
        });
    });
    
});




