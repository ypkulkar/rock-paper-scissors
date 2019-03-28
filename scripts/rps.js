function computerPlay(){
    let choices = ["rock","paper","scissors"];
    let rand = Math.floor(Math.random() * 3); // Selects a random number between 1 and 3
    let res = choices[rand];
    return res;
}

function playRound(playerSelection, computerSelection){ // returns 1 if user wins, 0 if tie and -1 if loses
    let res = "";
    let score = 0;
    switch(playerSelection){
        case "rock":
            switch(computerSelection){
                case "rock":
                    res = "It is a tie!";
                    score = 0;
                    break;
                case "paper":
                    res = "You Lose! Paper beats Rock";
                    score = -1;
                    break;
                case "scissors":
                    res = "You Win! Rock beats Scissors";
                    score = 1;
                    break;
            }
            break;
        case "paper":
            switch(computerSelection){
                case "rock":
                    res = "You win! Paper beats Rock";
                    score = 1;
                    break;
                case "paper":
                    res = "It is a tie!";
                    score = 0;
                    break;
                case "scissors":
                    res = "You Lose! Scissors beats Paper";
                    score = -1;
                    break;
            }
            break;
        case "scissors":
            switch(computerSelection){
                case "rock":
                    res = "You Lose! Rock beats Scissors";
                    score = -1;
                    break;
                case "paper":
                    res = "You Win! Scissors beats Paper";
                    score = 1;
                    break;
                case "scissors":
                    res = "It is a tie!";
                    score = 0;
                    break;
            }
            break;
    }
    return [res,score];
}

function parseString(str){
    return str.toLowerCase();
}

function updateScores(usrScore, cpuScore){
    const usr = document.querySelector("#usr-score");
    usr.textContent = `${usrScore}`;
    const cpu = document.querySelector("#cpu-score");
    cpu.textContent = `${cpuScore}`;
}

function winStatement(str){
    const winStat = document.querySelector("#win-stat");
    winStat.textContent = str;
}

function displayChoices(usrChoice, cpuChoice){
    const usr = document.querySelector("#usr-choice");
    usr.textContent = `USER: ${usrChoice}`;

    const cpu = document.querySelector("#cpu-choice");
    cpu.textContent = `CPU: ${cpuChoice}`; 
}

function checkWinner(usrScore,cpuScore){
    if(usrScore == 5){
        winStatement("You won you reached 5 first");
        return true;
    }
    else if(cpuScore == 5){
        winStatement("You lost you could not reach 5 first");
        return true;
    }
    return false;
    
}

function game(inStr){
    let usrInput = "";
    let cpuInput = "";
    let usrScore = 0;
    let cpuScore = 0;
    let round = 0;
    let index = 0;
    let choices = ["rock","paper","scissors"];
    


    rawUsrInput = inStr;
    usrInput = parseString(rawUsrInput);
    if(!choices.includes(usrInput)){
        console.log("Please choose a valid option!");
    }

    cpuInput = computerPlay();
    
    round = playRound(usrInput,cpuInput);
    
    displayChoices(usrInput,cpuInput);
    
    switch(round[1]){
        case 1:
            usrScore++;
            break;
        case 0:
            break;
        case -1:
            cpuScore++;
    }
    return [usrScore, cpuScore, round[0]];
}

let usrScore = 0;
let cpuScore = 0;

const btns = document.querySelectorAll(".btn");
btns.forEach(btn => {
    btn.addEventListener('click', function(e){
        let playerSelection = btn.id;
        let scores = game(playerSelection);
        
        if(usrScore < 5) usrScore += scores[0];
        if(cpuScore < 5) cpuScore += scores[1];
        
        updateScores(usrScore, cpuScore);
        winStatement(scores[2]);
        if(checkWinner(usrScore, cpuScore)){
            displayChoices("-","-");
        }

        // Adding the click effect
        btn.classList.add('playing');
        btn.addEventListener('transitionend', removeTransition);

    })
});


function reset(){
    usrScore = 0;
    cpuScore = 0;
    updateScores(usrScore,cpuScore);
    displayChoices("-","-");
    winStatement("Let's begin!");
}

const resetBtn = document.querySelector("#reset-button");
resetBtn.addEventListener("click",reset);

// Needed so that the click effect only lasts for an instance
function removeTransition(e) {
    if (e.propertyName !== 'transform') return;
    e.target.classList.remove('playing');
}