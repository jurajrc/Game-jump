var character = document.getElementById("character");
var block = document.getElementById("block");
var start = document.getElementById("start");
var stop = document.getElementById("stop");

var gameOver = document.querySelector(".oznam");

// audio
const alert = document.getElementById("alert");
const ding = document.getElementById("ding");
const music = document.getElementById("music");
const marioJump = document.getElementById("jump");

console.log(alert);

// style
// style vlastnosti elementu block a character
let blockStyle = getComputedStyle(block);
let characterStyle = getComputedStyle(character);

// character
let characterWidth = parseInt(characterStyle.width)


// move character
let charakterLeft = parseInt(characterStyle.left) //  default 10px

//console.log(characterWidth);


var playGame = false;

//console.log(playGame);

var delay = 600;
var timeDelay = delay;

var countdown = document.querySelectorAll(".go");



// štart gulišky
start.addEventListener("click", () => {
    playGame = true;
    gameOver.style.display = "none";
    countdown[0].style.display = "block";
    playAudio(music, 1);

    //console.log(playGame);

    // odčitavanie
    setTimeout(() => {
        countdown[0].style.display = "none";
        countdown[1].style.display = "block";
    }, timeDelay);

    setTimeout(() => {
        countdown[1].style.display = "none";
        countdown[2].style.display = "block";
    }, timeDelay = timeDelay + delay );

    setTimeout(() => {
        countdown[2].style.display = "none";
        countdown[3].style.display = "block";
    }, timeDelay = timeDelay + delay);
    
    setTimeout(() => {
        countdown[3].style.display = "none";
        block.classList.add("animateBlock");
        timeDelay = delay;
    }, timeDelay = timeDelay + 300 );
    
    // Odpočitavanie dlžky hry s ukončením
    // if(playGame === true) {
    //     setTimeout( () => {
    //         stopGame();
    //         alert("Vyhral si jupí")
    //     },10000);
    // }
})



// stopnutie guličky
function stopGame() {
    block.classList.remove("animateBlock");
    gameOver.style.display = "none";
    timeDelay = delay;
    playGame = false;
    //pauseAudio(music);
    character.style.left = "10px"
    charakterLeft = 10
    //console.log(playGame);
}

stop.addEventListener("click", stopGame );



// skákanie a formatovanie-(odobratie class animate-jump)
function jump() {
    if ( character.classList != "animate-jump" ) {
        character.classList.add("animate-jump");
    }
    playAudio(marioJump, 0.05)
    setTimeout(function() {
        character.classList.remove("animate-jump");
    },600);
}

// skakanie na klavesi ArrowUp a W
document.body.addEventListener("keydown", myfunction);

function myfunction(event) {
    if ( event.key === "ArrowUp" || event.key === "w" ) {
        jump();
        //playAudio(marioJump);
        
    }
    if( event.key === "ArrowRight" ) {
        charakterLeft = charakterLeft + 5
        character.style.left = charakterLeft + "px"
        
        if(charakterLeft > 301) {
            charakterLeft = 300
        }
    }
    if( event.key === "ArrowLeft" ) {
        charakterLeft = charakterLeft - 5
        character.style.left = charakterLeft + "px"
        //console.log(charakterLeft);
        if (charakterLeft < 4) {
            character.style.left = "0px"
            charakterLeft = 0
        } 
    }
    //console.log(event.key);
    console.log(charakterLeft);
}


// kontrola kolizie


var controlColision = setInterval(() => {
    if (playGame) { 
        // do premennej uložime každích 10ms left a top 
        var cheackLeft = parseInt(blockStyle.left);
        var cheackTop = parseInt(characterStyle.top);
        //console.log(cheackTop);

        // ak sa blok z characterom prekrivaju zastavme hru
        
        if(cheackLeft <= charakterLeft + characterWidth && cheackTop >= 128 ) {
            
                stopGame();
                playGame = false;
                gameOver.style.display = "block";
                alert.volume = .2
                playAudio(alert, 0.1);
        }

    }
}, 10);

alert.muted = false
// play audio
function playAudio(toto, valueVolume) {
    toto.play()
    toto.volume = valueVolume;
    
}

// pause audio
function pauseAudio(pauza) {
    pauza.pause();
}



// odstranenie reklamy endora

function setUp() {

    // všetkym v poly dame display none
    for (var i = 0; i < countdown.length; i++) 
    countdown[i].style.display = "none";
    
    gameOver.style.display = "none";
    $('body').children('div').last().css("display","none");

}

    