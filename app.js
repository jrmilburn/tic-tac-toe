const startBtn = document.getElementById('start');
const updateBtn = document.getElementById('update');
const nameForm = document.getElementById('names');
const player1Name = document.querySelector('#player1');
const player2Name = document.querySelector('#player2');
let roundCount = 0;

function Gameboard() {
    const rows = 3;
    const columns = 3;
    const board = [];

    //Generate game board as a 2d array
    for (let i =0; i < rows; i++){
        //set each row element to its own array (thus creating a 2d array)
        board[i] = [];
        for (let j = 0; j < columns; j++){
            board[i].push(Cell());
        }
    }

    //function to get board state
    const getBoard = () => board;

    const selectedSquare = (column, row, player) => {

        //append relevant player token to selected square
        board[row][column].addToken(player); 
    }

    return { getBoard, selectedSquare};
}


/*
** A cell represents one square on the board and has one of the following values:
** 0: the square is currently free
** 1: Player One's token
** 2: Player Two's token
*/

function Cell(){
    let value = 0;

    //get the value of the players token
    const addToken = (player) => {
        value = player;
    };
    //retrieve the current value of the cell through closure
    const getValue = () => value;

    return { addToken, getValue };
}

/**
 * The GameController will be responsible for controlling
 * the flow and state of the game's turns, as well as 
 * whether anybody has won the game
 */

function GameController(
    playerOneName = "Player One",
    playerTwoName = "Player Two"
) {
    const board = Gameboard();
    const announceDiv = document.querySelector('.announcement');


    //define players and subsequent tokens
    const players = [
        {
            name: playerOneName,
            token: 1
        },
        {
            name: playerTwoName,
            token: 2
        }
    ]

    //set initial player to player 1
    let activePlayer = players[0];


    //switch player
    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };

    const getActivePlayer = () => activePlayer;

    const printNewRound = () => {
        console.log(`${getActivePlayer().name}'s turn.`);
    };

    const playRound = (column, row) => {
        
        announceDiv.textContent = `${getActivePlayer().name} chose square ${column}, ${row}`;


        //check if space is already occupied
        if (board.getBoard()[row][column].getValue() === 0){

            board.selectedSquare(column, row, getActivePlayer().token);
            


            //win condition
            (function checkWin(){


                
                //row win conditions
                if(
                    board.getBoard()[0][0].getValue() === board.getBoard()[0][1].getValue() &&
                    board.getBoard()[0][1].getValue() === board.getBoard()[0][2].getValue() &&
                    board.getBoard()[0][0].getValue() !== 0
                    ){
                        announceDiv.textContent = `${getActivePlayer().name} wins!`;
                        return;

                } else if (
                    board.getBoard()[1][0].getValue() === board.getBoard()[1][1].getValue() &&
                    board.getBoard()[1][1].getValue() === board.getBoard()[1][2].getValue() &&
                    board.getBoard()[1][0].getValue() !== 0
                    ){
                        announceDiv.textContent = `${getActivePlayer().name} wins!`;
                        return;

                } else if (
                    board.getBoard()[2][0].getValue() === board.getBoard()[2][1].getValue() &&
                    board.getBoard()[2][1].getValue() === board.getBoard()[2][2].getValue() &&
                    board.getBoard()[2][0].getValue() !== 0
                    ){
                        announceDiv.textContent = `${getActivePlayer().name} wins!`;
                        return;

                
                //column win conditions
                } else if (
                    board.getBoard()[0][0].getValue() === board.getBoard()[1][0].getValue() &&
                    board.getBoard()[1][0].getValue() === board.getBoard()[2][0].getValue() &&
                    board.getBoard()[0][0].getValue() !== 0
                ){
                    announceDiv.textContent = `${getActivePlayer().name} wins!`;
                    return;

                } else if (
                    board.getBoard()[0][1].getValue() === board.getBoard()[1][1].getValue() &&
                    board.getBoard()[1][1].getValue() === board.getBoard()[2][1].getValue() &&
                    board.getBoard()[0][1].getValue() !== 0
                ){
                    announceDiv.textContent = `${getActivePlayer().name} wins!`;
                    return;

                } else if (
                    board.getBoard()[0][2].getValue() === board.getBoard()[1][2].getValue() &&
                    board.getBoard()[1][2].getValue() === board.getBoard()[2][2].getValue() &&
                    board.getBoard()[0][2].getValue() !== 0
                ){
                    announceDiv.textContent = `${getActivePlayer().name} wins!`;
                    return;

                //diagonal win conditions
                } else if (
                    board.getBoard()[0][0].getValue() === board.getBoard()[1][1].getValue() &&
                    board.getBoard()[1][1].getValue() === board.getBoard()[2][2].getValue() &&
                    board.getBoard()[0][0].getValue() !== 0
                ){
                    announceDiv.textContent = `${getActivePlayer().name} wins!`;
                    return;

                } else if (
                    board.getBoard()[0][2].getValue() === board.getBoard()[1][1].getValue() &&
                    board.getBoard()[1][1].getValue() === board.getBoard()[2][0].getValue() &&
                    board.getBoard()[0][2].getValue() !== 0
                ){
                    announceDiv.textContent = `${getActivePlayer().name} wins!`;
                    return;

                }

                if(roundCount >= 18){
                    announceDiv.textContent = `Tie`;
                    return
                }
                
                switchPlayerTurn();
                printNewRound();
            
        })();

            

        }

        
        
    }


    printNewRound();

    return {
        playRound,
        getActivePlayer,
        getBoard: board.getBoard
    };

    
}

//Extending logic to UI
function ScreenController() {
    const game = GameController(player1Name.value, player2Name.value);
    const playerTurnDiv = document.querySelector('.turn');
    const boardDiv = document.querySelector('.board');

    playerTurnDiv.classList.add('turn');

    const updateScreen = () => {
        //clear
        boardDiv.textContent = "";

        //get the newest board version and player turn
        const board = game.getBoard();
        const activePlayer = game.getActivePlayer();

        //display player's turn
        playerTurnDiv.textContent = `It is ${activePlayer.name}'s turn`;

        //render board squares
        board.forEach((row, rindex) => {
            row.forEach((cell, cindex) => {
                const cellBtn = document.createElement("button");
                cellBtn.classList.add('btn');
                //create a data attribute for each row and column
                cellBtn.dataset.column = cindex;
                cellBtn.dataset.row = rindex;

                //convert token values to X or O
                if (cell.getValue() === 1){
                    cellBtn.textContent = "O";
                } else if (cell.getValue() === 2){
                    cellBtn.textContent = "X";
                } else {
                    cellBtn.textContent = "";
                }
                
                boardDiv.appendChild(cellBtn);
            })
        })
    }

    function boardClick(e) {
        const selectedCol = e.target.dataset.column;
        const selectedRow = e.target.dataset.row;
        roundCount+=1;

        game.playRound(selectedCol, selectedRow);
        updateScreen();
        
    }
    boardDiv.addEventListener('click', boardClick)

    updateScreen();
}

startBtn.addEventListener('click', () => {
    if (startBtn.textContent === "Start"){
        ScreenController();
        startBtn.textContent = "Restart";
        nameForm.style.cssText = "grid-column: 3/4;";
        startBtn.style.cssText = "top: 15%; left: 50%;";
    }
    
    if (startBtn.textContent === "Restart"){
        roundCount = 0;
        ScreenController();
    }
})

