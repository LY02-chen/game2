function drawRoundRect(x, y, width, height, r) {
    ctx.beginPath();
    ctx.arc(x + r, y + r, r, Math.PI, Math.PI * 3 / 2);
    ctx.lineTo(x + width - r, y)
    ctx.arc(x + width - r, y + r, r, Math.PI * 3 / 2, Math.PI * 2);
    ctx.lineTo(x + width, y + height - r);
    ctx.arc(x + width - r, y + height - r, r, Math.PI * 2, Math.PI * 1 / 2);
    ctx.lineTo(x + r, y + height);
    ctx.arc(x + r, y + height - r, r, Math.PI * 1 / 2, Math.PI);
    ctx.closePath();
    ctx.fill();
}

function newGame() {
    gridValue = Array.from({length : N}, x => Array(N).fill(0));
    bestScore = nowScore > bestScore ? nowScore : bestScore;
    nowScore = 0;

    newNumber();
    newNumber();
    drawGrid();
}

function drawGrid() {
    ctx.fillStyle = color["BG"];
    drawRoundRect(0, paddingTop, width, height, 5);
    drawRoundRect(width / 2 - padding * 2, paddingTop / 8, width / 4, height / 8, 5);
    drawRoundRect(width * 3 / 4 - padding, paddingTop / 8, width / 4, height / 8, 5);
    ctx.font = "40px Comic Sans MS";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    for (let y = 0; y < N; y++) {
        for (let x = 0; x < N; x++) {
            ctx.fillStyle = color[gridValue[y][x]];
            let thisX = padding + x * (padding + gridWidth);
            let thisY = padding + y * (padding + gridWidth) + paddingTop;
            drawRoundRect(thisX, thisY, gridWidth, gridWidth, 5);
            if (gridValue[y][x]) {
                if (gridValue[y][x] <= 4) {
                    ctx.fillStyle = "#776e65";
                }
                else {
                    ctx.fillStyle = "#f9f6f2";
                }
                ctx.fillText(gridValue[y][x], thisX + gridWidth / 2, thisY + gridWidth / 2);
            }
        }
    }
    ctx.font = "32px Comic Sans MS";
    ctx.fillStyle = "#ffffff";
    ctx.fillText(nowScore, width * 5 / 8 - padding * 2, paddingTop / 8 + height * 3 / 32);
    ctx.fillText(bestScore, width * 7 / 8 - padding, paddingTop / 8 + height * 3 / 32);
    
    ctx.font = "18px Comic Sans MS";
    ctx.fillStyle = "#eee4da";
    ctx.fillText("SCORE", width * 5 / 8 - padding * 2, paddingTop / 8 + height * 5 / 128);
    ctx.fillText("BEST", width * 7 / 8 - padding, paddingTop / 8 + height * 5 / 128);
}

function newNumber() {
    if (gridValue.every((val, index) => gridValue[index].every(x => x != 0))) {
        return;
    }
    const rand = (n) => Math.floor(Math.random() * n)
    let pos = [rand(N), rand(N)];
    while (gridValue[pos[0]][pos[1]]) {
        pos = [rand(N), rand(N)];
    }
    gridValue[pos[0]][pos[1]] = rand(10) == 0 ? 4 : 2;
}