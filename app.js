var boxes ;
var gameBoard ;
const text = document.querySelector(".text");
const resetBtn = document.querySelector(".reset");
declare()

const score1 = document.querySelector(".score1"), score2 = document.querySelector(".score2"), scoreD = document.querySelector(".scoreD");


let p1 = 0, p2 = 0, d = 0;

let o = '<img class="o" src="img/o.png"></img>';
let x = '<img class="x" src="img/x.png"></img>';
let steps = 0;

var playerOne = [];
var playerTwo = [];
let playerTurn = true

var audioX = new Audio('sounds/x.mp3');
var audioO = new Audio('sounds/o.mp3');
var audioW = new Audio('sounds/won.mp3')

const clone1 = gameBoard.cloneNode(true);
let clone = clone1.cloneNode(true)
clone.classList.add("copy")

declare()
// reset()

function boxClick(){
    
    // ! touch 
    steps ++;
    
    if (playerTurn) {
        // text.innerText = ("O turn")
        this.innerHTML += x;
        playerOne.push(this.id)
        audioX.play();
        newGame()
    } else {
        
        this.innerHTML += o;
        playerTwo.push(this.id)
        audioO.play();
        // text.innerText = ("X turn")
    }

    
    //  !testing arrays  to decide who won
    
    if (testPlayer(playerOne)) {
        
        reset()

        gameBoard.style.pointerEvents = "none"
        p1++;
        score1.innerText = p1; // ? displaying score
        audioW.play()
    }else if (testPlayer(playerTwo)) {   
        // text.innerText = "Player Two Won !"
        reset()
        gameBoard.style.pointerEvents = "none"
        p2++;
        score2.innerText = p2; // ? displaying score
        audioW.play()
    }else if (steps === 9) {  // ! draw !!!!!!!!!
        reset()
        d++;
        scoreD.innerText = d; // ? displaying score
        resetBtn.style.display = "block";
        reset()
    }
    
    this.style.pointerEvents = "none"
    // ! turn changing
    playerTurn = !playerTurn
}

function clickBtn(){
    boxes.forEach(box => {
        box.addEventListener("click", boxClick)
    })
}



function testPlayer(player){
    
    return (include(player,"0","1","2") || include(player,"0","4","8") || include(player,"0","3","6") || include(player,"3","4","5") || include(player,"6","7","8") || include(player,"1","4","7") || include(player,"2","5","8") || include(player,"6","4","2") ) 
    
}

function newGame(){
    gameBoard.classList.remove("newGame")
    gameBoard.classList.add("newGame")
    gameBoard.addEventListener("animationend", () => {
        gameBoard.style.clipPath = "none"
    } )
}


function include(player, a,b,c){
    return (player.includes(a) && player.includes(b) && player.includes(c))
}


function reset(){
    resetBtn.style.display = "block";
    resetBtn.addEventListener("click", () => {
        clone = clone1.cloneNode(true)
        clone.classList.remove("copy")
        gameBoard.remove()
        document.querySelector(".wrap").appendChild(clone)
        declare()
        newGame()
        clickBtn()
        playerOne = [];
        playerTwo = [];
        steps = 0;
        resetBtn.style.display = "none"
    })
}

function declare(){
    boxes = document.querySelectorAll(".box");
    gameBoard = document.querySelector("#gameboard");
}

newGame()

clickBtn()







