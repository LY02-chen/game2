const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const N = 4,
      width = 500,
      height = 500,
      paddingTop = 200,
      padding = 12,
      gridWidth = (width - padding * (N + 1) ) / N;

canvas.width = width;
canvas.height = height + paddingTop;

let gridValue = [];
let nowScore = 0;
let bestScore = 0;

newGame();

const isOver = () => {
    let gridBackUp = gridValue.map(x => x);

    for (let i = 0; i < N; i++) {
        gridBackUp = doMove(i);
        result = gridBackUp.every((val, row) => gridBackUp[row].every((val, col) => gridBackUp[row][col] == gridValue[row][col]))
        if (result == false) {
            return false;
        }
    }
    return true;
}