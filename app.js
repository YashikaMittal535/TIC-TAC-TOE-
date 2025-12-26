let boxes = document.querySelectorAll(".box");
let msgcontainer = document.querySelector(".msgcontainer");
let newG = document.querySelector(".reset");
let msg = document.querySelector(".msg");
let hide = document.querySelector(".hide");

let count = 0;
let turn0 = true;

let winPattern = [
    [0,1,2],
    [0,3,6],
    [3,4,5],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
    [6,7,8],
];

// Reset button logic
const resetbtn = () => {
    turn0 = true;
    count = 0; // reset move count
    enablebtns();
    msgcontainer.classList.add("hide");
};

// Disable all boxes
const disablebtns = () => {
    for(let box of boxes){
        box.disabled = true;
    }
};

// Enable all boxes
const enablebtns = () => {
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
};

// Show winner message
const showWinner = (winner) =>{
    msg.innerText = `Congratulations, ${winner} Won!!`;
    msgcontainer.classList.remove("hide");
    disablebtns();
};

// Check winner
const checkWinner = () => {
    for(let patterns of winPattern){
        let pos1val = boxes[patterns[0]].innerText;
        let pos2val = boxes[patterns[1]].innerText;
        let pos3val = boxes[patterns[2]].innerText;

        if(pos1val !== "" && pos2val !== "" && pos3val !== ""){
            if(pos1val === pos2val && pos2val === pos3val){
                showWinner(pos1val);
                return true; // winner found
            }
        }
    }
    return false; // no winner
};

// Draw message
const gameDraw = () => {
    msg.innerText = "Game was a draw!";
    msgcontainer.classList.remove("hide");
    disablebtns();
};

// New game button
newG.addEventListener("click" , () => {
    resetbtn();
});

// Each box click
boxes.forEach((box) => {
    box.addEventListener("click" , () => {
        if(turn0){
            box.innerText = "O";
            turn0 = false;
        }
        else{
            box.innerText = "X";
            turn0 = true;
        }
        box.disabled = true;
        count++;

        let isWinner = checkWinner();
        if(count === 9 && !isWinner){
            gameDraw();
        }
    });
});
