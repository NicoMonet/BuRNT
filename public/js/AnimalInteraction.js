let socket = io();

//reset array
socket.emit('resetArray');
//------------------------------------      PENGUIN POSITION        ----------------------------------------------------//
//get the area around an animal in which the player can interact


penguinPos = document.querySelector('#penguin1').getAttribute('position');
//get the minimum and maxumum x positions for interaction
PenguinX1 = penguinPos.x - 2;     PenguinX2 = penguinPos.x + 2;
//get the minimum and maxumum z positions for interaction
PenguinZ1 = penguinPos.z - 2;     PenguinZ2 = penguinPos.z + 2;
//--------------------------------------      FOX POSITION        ------------------------------------------------------//
//get the area around an animal in which the player can interact

foxPos = document.querySelector('#fox1').getAttribute('position');
//get the minimum and maxumum x positions for interaction
foxX1 = foxPos.x - 2;     foxX2 = foxPos.x + 2;
//get the minimum and maxumum z positions for interaction
foxZ1 = foxPos.z - 2;     foxZ2 = foxPos.z + 2;

//----------------------------------        RECEIVE ANIMALS FOUND       ------------------------------------------------//
var animalsFound = [false, false, false, false, false];
socket.emit('newArray', animalsFound);

socket.on('SendAnimalArray', function(Array1) {
    console.log("in coming array", Array1);
    for (var i = 0; i < Array1.length; i++){
        animalsFound.shift();
    }
    for (var i = 0; i < Array1.length; i++){
        animalsFound.push(Array1[i]);
    }
    
});
//console.log("animalsFound", animalsFound);
//----------------------------------       INTERACTION CHECK       -----------------------------------------------------//
//when the player interacts with an animal do something

// document.getElementById("penguin1").addEventListener("click", function(){
// });

document.addEventListener('keyup', function(e){

    //console.log(e.keyCode);
    if (e.keyCode == 69){
        //get the players camera position to check if they are within the interaction area
        playerPos = document.querySelector('#playerCam').getAttribute('position');

        //check if position matches for the penguin
        if (playerPos.x >= PenguinX1 && playerPos.x <= PenguinX2){
            if (playerPos.z >= PenguinZ1 && playerPos.z <= PenguinZ2){
                console.log('sending information to the server');
                animalsFound.splice(0, 1, true);
                console.log("animalsFound", animalsFound);
                socket.emit('newArray', animalsFound);
            }
        }


        //check if position matches for the fox
        if (playerPos.x >= foxX1 && playerPos.x <= foxX2){
            if (playerPos.z >= foxZ1 && playerPos.z <= foxZ2){
                console.log('sending information to the server');
                animalsFound.splice(1, 1, true);
                console.log("animalsFound", animalsFound);
                socket.emit('newArray', animalsFound);
            }
        }
    }
});