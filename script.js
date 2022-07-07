const equals = (a, b) => a.length === b.length && a.every((v, i) => v === b[i])

function contains(a, b) {
    return a.every(end => {
        let result = false;
        for (let row of b) {
            if (equals(row, end)) {
                result = true
                break
            }
        }
        return result
    })
}

app = {
    ends: [
        [
            [2, 0],
            [1, 1],
            [0, 2],
        ],
        [
            [0, 0],
            [1, 1],
            [2, 2],
        ],
        [
            [0, 0],
            [0, 1],
            [0, 2],
        ],
        [
            [1, 0],
            [1, 1],
            [1, 2],
        ],
        [
            [2, 0],
            [2, 1],
            [2, 2],
        ],
        [
            [0, 0],
            [1, 0],
            [2, 0],
        ],
        [
            [0, 1],
            [1, 1],
            [2, 1],
        ],
        [
            [0, 2],
            [1, 2],
            [2, 2],
        ],
    ],

    startGame() {
        grid.bindCells();
    },

    endGame(side) {
        console.log(grid.turns)
        document.querySelector('#game_result').style.display = 'flex';
        document.querySelector('#game_grid').style.pointerEvents = 'none';

        let result;
        switch (side) {
            case 'Ничья':
                result = side;
                break;
            default:
                result = `Победили: ${side}`;
                break;
        }

        document.querySelector('.winner').textContent = result;
    },
};

grid = {
    root: app,
    turnSwitch: false,
    turnCounter: 0,
    turns: {
        crosses: [],
        circles: [],
    },

    cells: Array.from(document.querySelectorAll('.cell')),

    bindCells() {
        this.cells.forEach((cell, index) => {
            cell.addEventListener('click', event => {
                    this.makeMove(event.target, index);
                }
            )
        });
    },

    makeMove(cell) {
        if (cell.value !== 'turned') {
            let src = this.turnSwitch ? 'circle.webp' : 'cross.png';
            this.turns[this.turnSwitch ? 'circles' : 'crosses'].push([+cell.dataset.x, +cell.dataset.y])

            this.turnSwitch = !this.turnSwitch; this.turnCounter++;

            cell.style.backgroundImage = `url('${src}')`;
            cell.value = 'turned';
        }
        this.checkEnd();
    },

    checkEnd() {
        this.root.ends.forEach(endCoordinates => {
            if (contains(endCoordinates, this.turns.circles)) {
                this.root.endGame('нолики');
            }
            if (contains(endCoordinates, this.turns.crosses)) {
                this.root.endGame('крестики');
            }
        })
        if (this.turnCounter === 9) {
            this.root.endGame('Ничья');
        }
    },
}

app.startGame()
