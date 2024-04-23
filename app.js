function Gameboard() {
    const rows = 3;
    const columns = 3;
    const board = [];

    //dynamic UI for gameboard
    const square = document.createElement('button');
    const gameArea = document.querySelector('.board');
    gameArea.style.cssText = `display: grid; grid-template-columns: repeat(${columns}, 1fr); grid-template-rows: repeat(${rows}, min(200px, 1fr);`;
    square.style.cssText = `border: 1px solid black; width: min(20vw, 20vh); height: min(20vw, 20vh);`;

    //Generate game board as a 2d array
    for (let i =0; i < rows; i++){
        //set each row element to its own array (thus creating a 2d array)
        board[i] = [];
        for (let j = 0; j < rows; j++){
            board[i].push(Cell());
            gameArea.appendChild(square.cloneNode());
        }
    }

    //function to get board state
    const getBoard = () => board;

    const selectedSquare = (column, row, player) => {

        //append relevant player token to selected square
        board[row][column].addToken(player); 
    }
    //print board to console
    const printBoard = () => {
        const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue()))
        console.log(boardWithCellValues);
    };

    return { getBoard, selectedSquare, printBoard };
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
        board.printBoard();
        console.log(`${getActivePlayer().name}'s turn.`);
    };

    const playRound = (column, row) => {
        console.log(`${getActivePlayer().name} chose square ${column}, ${row}`);
        board.selectedSquare(column, row, getActivePlayer().token);
    
        //check winner here

        //switch player turn
        switchPlayerTurn();
        printNewRound();
    }

    printNewRound();

    return {
        playRound,
        getActivePlayer
    };

    
}

const game = GameController();