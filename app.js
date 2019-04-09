const express   = require('express');
const app       = express();
const http      = require('http');
const server    = http.createServer(app);
const socketIO  = require('socket.io')(server); //hello I am new


//convenience vars
const LISTEN_PORT = 8080;

//middleware This set out base html to emerge from the publicm folder
app.use(express.static(__dirname + '/public'));

//set a route
app.get('/', function(req, res){
    res.sendFile(__dirname + 'public/index.html');
});
app.get('/Interaction', function(req, res){
    res.sendFile(__dirname + 'public/Interaction.html');
});
app.get('/LogBook', function(req, res){
    res.sendFile(__dirname + 'public/LogBook.html');
});
app.get('/Menu', function(req, res){
    res.sendFile(__dirname + 'public/Menu.html');
});

//-----------------------------------------     Variables       ------------------------------------------------------//
//Array for the animals

//                  [rabbit, frog,   woodpecker,  fox,    fish]
var animalsFound =  [false,  false,  false,       false,  false];


//--------------------------------------       SOCKET STUFF        ---------------------------------------------------//
//websocket stuff
socketIO.on('connection', function(socket) {
    console.log(socket.id + ' has connected!');

    socketIO.sockets.emit('SendAnimalArray', animalsFound);
    // //resetArray
    // socket.on('resetArray', function() {
    //     for (var i = 0; i < Array1.length; i++){
    //         animalsFound.splice(i, 1, false);
    //     }
    //     socketIO.sockets.emit('SendAnimalArray', animalsFound);
    // });

    //make the new array
    socket.on('newArray', function(Array1) {
        for (var i = 0; i < Array1.length; i++){
            animalsFound.shift();
        }
        //display the array
        for (var i = 0; i < Array1.length; i++){
            animalsFound.push(Array1[i]);
        }
        console.log(animalsFound);
        socketIO.sockets.emit('SendAnimalArray', animalsFound);


    });


});

//finally, start server
server.listen(LISTEN_PORT);

console.log("Listening on port: " + LISTEN_PORT); //print statement to console/terminal