window.addEventListener("keydown", function(event) {
    const keyID = event.code;
    
    if (keyID === "ArrowLeft") {
        gridValue = doMove(0);
        newNumber();
        drawGrid();
    }
    if (keyID === "ArrowDown") {
        gridValue = doMove(1);
        newNumber();
        drawGrid();
    }
    if (keyID === "ArrowRight") {
        gridValue = doMove(2);
        newNumber();
        drawGrid();
    }
    if (keyID === "ArrowUp") {
        gridValue = doMove(3);
        newNumber();
        drawGrid();
    }

    if (keyID === "Space" && isOver()) {
        newGame();
    }

}, false);

const doMove = (rotateTimes) => {
    let tmpValue = gridValue.map(x => x);
    const rotate = () => tmpValue.map((val, index) => tmpValue.map(row => row[index]).reverse())

    for (let i = 0; i < rotateTimes; i++) {
        tmpValue = rotate();
    }
    for (let i = 0; i < N; i++) {
        let tmpArray = tmpValue[i].filter(x => x > 0);
        let result = [];
        let skip = false;
        for (let j = 0; j < tmpArray.length; j++) {
            if (skip) {
                skip = false;
                continue;
            }
            if (j < tmpArray.length - 1 && tmpArray[j] == tmpArray[j + 1]) {
                tmpArray[j] *= 2;
                nowScore += tmpArray[j];
                skip = true;
            }
            result.push(tmpArray[j]);
        }

        for (let j = result.length; j < N; j++) {
            result.push(0);
        }
        tmpValue[i] = result;
    }
    for (let i = 0; i < 4 - rotateTimes; i++) {
        tmpValue = rotate();
    }
    return tmpValue;
}