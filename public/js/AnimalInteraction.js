let socket = io();

//reset array
socket.emit('resetArray');
//-------------------------------------      HARE POSITION        ------------------------------------------------------//
//get the area around an animal in which the player can interact


harePos = document.querySelector('#hare1').getAttribute('position');
//get the minimum and maxumum x positions for interaction
hareX1 = harePos.x - 2;     hareX2 = harePos.x + 2;
//get the minimum and maxumum z positions for interaction
hareZ1 = harePos.z - 2;     hareZ2 = harePos.z + 2;
//--------------------------------------      FOX POSITION        ------------------------------------------------------//
//get the area around an animal in which the player can interact

foxPos = document.querySelector('#fox1').getAttribute('position');
//get the minimum and maxumum x positions for interaction
foxX1 = foxPos.x - 2;     foxX2 = foxPos.x + 2;
//get the minimum and maxumum z positions for interaction
foxZ1 = foxPos.z - 2;     foxZ2 = foxPos.z + 2;
//-------------------------------------      FROG POSITION        -----------------------------------------------------//
//get the area around an animal in which the player can interact

frogPos = document.querySelector('#frog1').getAttribute('position');
//get the minimum and maxumum x positions for interaction
frogX1 = frogPos.x - 2;     frogX2 = frogPos.x + 2;
//get the minimum and maxumum z positions for interaction
frogZ1 = frogPos.z - 2;     frogZ2 = frogPos.z + 2;
//--------------------------------      WOODPECKER POSITION        ----------------------------------------------------//
//get the area around an animal in which the player can interact

woodpeckerPos = document.querySelector('#woodpecker1').getAttribute('position');
//get the minimum and maxumum x positions for interaction
woodpeckerX1 = woodpeckerPos.x - 2;     woodpeckerX2 = woodpeckerPos.x + 2;
//get the minimum and maxumum z positions for interaction
woodpeckerZ1 = woodpeckerPos.z - 2;     woodpeckerZ2 = woodpeckerPos.z + 2;
//-------------------------------------      FISH POSITION        -----------------------------------------------------//
//get the area around an animal in which the player can interact

fishPos = document.querySelector('#fish1').getAttribute('position');
//get the minimum and maxumum x positions for interaction
fishX1 = fishPos.x - 2;     fishX2 = fishPos.x + 2;
//get the minimum and maxumum z positions for interaction
fishZ1 = fishPos.z - 2;     fishZ2 = fishPos.z + 2;

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
    
    var countr = 0;
    for (var i = 0; i < animalsFound.length; i++){
        if (animalsFound[i] == true){
            countr++;
        }
        console.log("counter", countr);

        if (countr == 5){
            console.log("winner");
            window.location.href = 'Menu.html';
        }
    }

});
//----------------------------------       INTERACTION CHECK       -----------------------------------------------------//
//when the player interacts with an animal do something
document.addEventListener('keyup', function(e){

    //console.log(e.keyCode);
    if (e.keyCode == 69){
        //get the players camera position to check if they are within the interaction area
        playerPos = document.querySelector('#playerCam').getAttribute('position');

        //check if position matches for the Hare
        if (playerPos.x >= hareX1 && playerPos.x <= hareX2){
            if (playerPos.z >= hareZ1 && playerPos.z <= hareZ2){
                console.log('sending information to the server');
                animalsFound.splice(0, 1, true);
                console.log("animalsFound", animalsFound);
                socket.emit('newArray', animalsFound);

                const Context_AF = this;
                Context_AF.soundElem = document.querySelector('#Carrot');
                Context_AF.soundElem.components['sound'].stopSound();
                Context_AF.soundElem.components['sound'].playSound();
            }
        }


        //check if position matches for the fox
        if (playerPos.x >= foxX1 && playerPos.x <= foxX2){
            if (playerPos.z >= foxZ1 && playerPos.z <= foxZ2){
                console.log('sending information to the server');
                animalsFound.splice(1, 1, true);
                console.log("animalsFound", animalsFound);
                socket.emit('newArray', animalsFound);

                const Context_AF = this;
                Context_AF.soundElem = document.querySelector('#Yip');
                Context_AF.soundElem.components['sound'].stopSound();
                Context_AF.soundElem.components['sound'].playSound();
            }
        }

        //check if position matches for the frog
        if (playerPos.x >= frogX1 && playerPos.x <= frogX2){
            if (playerPos.z >= frogZ1 && playerPos.z <= frogZ2){
                console.log('sending information to the server');
                animalsFound.splice(2, 1, true);
                console.log("animalsFound", animalsFound);
                socket.emit('newArray', animalsFound);

                const Context_AF = this;
                Context_AF.soundElem = document.querySelector('#Croak');
                Context_AF.soundElem.components['sound'].stopSound();
                Context_AF.soundElem.components['sound'].playSound();

            }
        }
        console.log(playerPos.x, playerPos.z);
        console.log(woodpeckerPos.x, woodpeckerPos.z);
        //check if position matches for the woodpecker
        if (playerPos.x >= woodpeckerX1 && playerPos.x <= woodpeckerX2){
            if (playerPos.z >= woodpeckerZ1 && playerPos.z <= woodpeckerZ2){
                console.log('sending information to the server');
                animalsFound.splice(3, 1, true);
                console.log("animalsFound", animalsFound);
                socket.emit('newArray', animalsFound);

                const Context_AF = this;
                Context_AF.soundElem = document.querySelector('#Chirp');
                Context_AF.soundElem.components['sound'].stopSound();
                Context_AF.soundElem.components['sound'].playSound();

            }
        }

        //check if position matches for the fish
        if (playerPos.x >= fishX1 && playerPos.x <= fishX2){
            if (playerPos.z >= fishZ1 && playerPos.z <= fishZ2){
                console.log('sending information to the server');
                animalsFound.splice(4, 1, true);
                console.log("animalsFound", animalsFound);
                socket.emit('newArray', animalsFound);

                const Context_AF = this;
                Context_AF.soundElem = document.querySelector('#Bubble');
                Context_AF.soundElem.components['sound'].stopSound();
                Context_AF.soundElem.components['sound'].playSound();
            }
        }
    }
});