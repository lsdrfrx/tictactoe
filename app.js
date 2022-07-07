const equals = (a, b) => a.length === b.length && a.every((v, i) => v === b[i]);
function contains(a, b) {
    return a.every(end => {
        let result = false;
        for (let row of b) {
            if (equals(row, end)) {
                result = true;
                break;
            }
        }
        return result;
    });
}
class App {
    constructor() {
        this.ends = [
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
        ];
    }
    startGame() {
        grid.bindCells();
    }
    ;
    endGame(side) {
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
    }
    ;
}
class Grid {
    constructor(root) {
        this.turnSwitch = false;
        this.turnCounter = 0;
        this.turns = {
            crosses: [],
            circles: [],
        };
        this.cells = Array.from(document.querySelectorAll('.cell'));
        this.root = root;
    }
    bindCells() {
        this.cells.forEach(cell => {
            cell.addEventListener('click', event => {
                this.makeMove(event.target);
            });
        });
    }
    ;
    makeMove(cell) {
        if (cell.nodeValue !== 'turned') {
            let src = this.turnSwitch ? 'circle.webp' : 'cross.png';
            this.turns[this.turnSwitch ? 'circles' : 'crosses'].push([+cell.dataset.x, +cell.dataset.y]);
            this.turnSwitch = !this.turnSwitch;
            this.turnCounter++;
            cell.style.backgroundImage = `url('${src}')`;
            cell.nodeValue = 'turned';
        }
        this.checkEnd();
    }
    ;
    checkEnd() {
        let ended = false;
        this.root.ends.forEach(endCoordinates => {
            if (contains(endCoordinates, this.turns.circles)) {
                this.root.endGame('нолики');
                ended = true;
            }
            if (contains(endCoordinates, this.turns.crosses)) {
                this.root.endGame('крестики');
                ended = true;
            }
        });
        if (this.turnCounter === 9 && !ended) {
            this.root.endGame('Ничья');
        }
    }
    ;
}
const app = new App();
const grid = new Grid(app);
console.log('Сетка:', grid);
app.startGame();
