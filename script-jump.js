var character = document.getElementById("character");
var block = document.getElementById("block");
var start = document.getElementById("start");
var stop = document.getElementById("stop");

var gameOver = document.querySelector(".oznam");

// audio
let alert = document.getElementById("alert");
let ding = document.getElementById("ding");
const music = document.getElementById("music");
const marioJump = document.getElementById("jump");


// faster game
let speedAnimate = document.querySelector('.animateBlock')//

// style
// style vlastnosti elementu block a character
let blockStyle = getComputedStyle(block);
let characterStyle = getComputedStyle(character);

// character
let characterWidth = parseInt(characterStyle.width)


// move character
let charakterLeft = parseInt(characterStyle.left) //  default 10px


var playGame = false;


// countdown time delay
var delay = 600;
var timeDelay = delay;
var countdown = document.querySelectorAll(".go");

// ukaž skore
let score = 0
let valueScore = document.querySelector("#game-score")



// štart gulišky
start.addEventListener("click", () => {
    playGame = true;
    gameOver.style.display = "none";
    countdown[0].style.display = "block";
    playAudio(music, .2);
    score = 0
    valueScore.textContent = score

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
    
   
})



// stopnutie guličky
function stopGame() {
    block.classList.remove("animateBlock");
    gameOver.style.display = "none";
    timeDelay = delay;
    playGame = false;
    character.style.left = "10px"
    charakterLeft = 10
}

stop.addEventListener("click", stopGame )


// skákanie a formatovanie-(odobratie class animate-jump)
function jump() {
    if ( character.classList != "animate-jump" ) {
        character.classList.add("animate-jump");
    }

    if(playGame) {
        score++
        valueScore.textContent = score
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
        if (charakterLeft < 4) {
            character.style.left = "0px"
            charakterLeft = 0
        } 
    }
}




// kontrola kolizie

// checkBallLeft
// checkPlayerLeft  nova hodnota
// checkPlayerTop

// if (zostane && checkBallLeft >= checkPlayerLeft-{polka šírky gulicky}&& checkBallLeft <= checkPlayerLeft+{polka šítky gulicky}
let t = 0

var controlColision = setInterval(() => {
    if (playGame) { 

        let t0 = performance.now()
        // do premennej uložime každích 10ms leftGulička a topPlayer a leftPlayer
        var cheackLeft = parseInt(blockStyle.left);
        var cheackTop = parseInt(characterStyle.top);
        let cheackPlayerLeft = parseInt(characterStyle.left);
        console.log(cheackPlayerLeft);

        // ak sa blok z characterom prekrivaju zastavme hru
        
            
            if(cheackLeft <= charakterLeft + characterWidth*1.5 && cheackTop >= 128 ) {
                stopGame();
                playGame = false;
                gameOver.style.display = "block";
                playAudio(alert, 0.1);
            }
        
        let t1 = performance.now()
        t++
    //console.log( t ,(t1 - t0.toFixed(3)) + 'ms' );
    }
}, 10);


alert.muted = false

// play audio
function playAudio(toto, valueVolume) {
    toto.play()

    // hlasitosť zvuku
    toto.volume = valueVolume;
}

// pause audio
function pauseAudio(pauza) {
    pauza.pause();
}



// odstranenie reklamy endora

function setUp() {

    // odpočitavanie - všetkym v poly dame display none
    for (var i = 0; i < countdown.length; i++) 
    countdown[i].style.display = "none";
    
    gameOver.style.display = "none";
    $('body').children('div').last().css("display","none");

}

    