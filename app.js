var boxes ;
var gameBoard ;
const player = document.querySelectorAll("h3");
const scr = document.querySelectorAll(".scr");
const text = document.querySelector(".text");
const resetBtn = document.querySelector(".reset");
declare()

const score1 = document.querySelector(".score1"), score2 = document.querySelector(".score2"), scoreD = document.querySelector(".scoreD");


let p1 = 0, p2 = 0, d = 0;

let o = '<img class="o letter" src="img/o.png"></img>';
let x = '<img class="x letter" src="img/x.png"></img>';
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

function turn(){
    player[0].classList.toggle("Turn")
    player[2].classList.toggle("Turn")
}

function won(){
    player.forEach(plr => {
        plr.classList.remove("Turn")
    })
    scr.forEach(score => {
        score.classList.add("blur")
    })
}

function boxClick(){
    
    // ! touch 
    steps ++;
    
    if (playerTurn) {
        text.innerText = "O turn"
        turn();
        this.innerHTML += x;
        playerOne.push(this.id)
        audioX.play();
    } else {
        text.innerText = "X turn"
        turn()
        this.innerHTML += o;
        playerTwo.push(this.id)
        audioO.play();
    }

    //  !testing arrays  to decide who won
    
    if (testPlayer(playerOne)) {
        idk(playerOne)
        text.innerText = "X won"
        reset()
        gameBoard.style.pointerEvents = "none"
        p1++;
        score1.innerText = p1; // ? displaying score
        audioW.play()
        won()
        scr[0].classList.remove("blur")
        scr[0].classList.add("won")
    }else if (testPlayer(playerTwo)) { 
        idk(playerTwo)  
        text.innerText = "O won"
        reset()
        gameBoard.style.pointerEvents = "none"
        p2++;
        score2.innerText = p2; // ? displaying score
        audioW.play()
        won()
        scr[2].classList.remove("blur")
        scr[2].classList.add("won")
        
    }else if (steps === 9) {  // ! draw !!!!!!!!!
        highlightDraw()
        text.innerText = "draw !"
        reset()
        d++;
        scoreD.innerText = d; // ? displaying score
        resetBtn.style.display = "block";
        won()
        scr[1].classList.remove("blur")
        scr[1].classList.add("won")
        scr[1].style.backgroundColor = "#F0FDFF"
        audioW.play()
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

function include(player, a,b,c){
    return (player.includes(a) && player.includes(b) && player.includes(c))
}

function newGame(){
    gameBoard.classList.add("newGame")
    gameBoard.addEventListener("animationend", () => {
        gameBoard.style.clipPath = "none"
    } )
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
        if(playerTurn){
            text.innerText = "X start !"
            player[0].classList.add("Turn")
        }else{
            text.innerText = "O start !"
            player[2].classList.add("Turn")
        }
        scr.forEach(score => {
            score.classList.remove("blur")
            score.classList.remove("won")
        })
        scr[1].style.backgroundColor = "transparent"
    })
}

function declare(){
    boxes = document.querySelectorAll(".box");
    gameBoard = document.querySelector("#gameboard");
}

function highlightDraw(){
    const letter = document.querySelectorAll(".letter");

    boxes.forEach(box => {
        box.style.borderWidth = "5px";
        box.style.borderColor = "black"
        box.classList.add("highlight")
    })

    letter.forEach(ltr => {
        ltr.style.opacity = "50%"
    })
}

function highlight(a, b, c){
    boxes.forEach(box => {
        if (box.innerHTML != "") {
            box.firstChild.classList.add("blur")
        }
    })
    boxes[a].firstChild.classList.add("highlight")
    boxes[b].firstChild.classList.add("highlight")
    boxes[c].firstChild.classList.add("highlight")
}


function idk(player){
    const stike = document.querySelector(".win")
    switch (true) {
        case include(player,"0","1","2"):
          highlight(0,1,2)
          break;
        case include(player,"0","4","8"):
          highlight(0,4,8)
          break;
        case include(player,"0","3","6"):
          highlight(0,3,6)
          break;
        case include(player,"3","4","5"):
          highlight(3,4,5)
          break;
        case include(player,"6","7","8"):
          highlight(6,7,8)
          break;
        case include(player,"1","4","7"):
          highlight(1,4,7)
          break;
        case include(player,"2","5","8"):
          highlight(2,5,8)
          break;
        case include(player,"6","4","2"):
          highlight(6,4,2)
          break;                              
      }     
}

// ! here we start
newGame()
clickBtn()
