const equals = (a, b) => a.length === b.length && a.every((v, i) => v === b[i])

function contains(a, b): boolean {
    return a.every(end => {
        let result: boolean = false
        for (let row of b) {
            if (equals(row, end)) {
                result = true
                break
            }
        }
        return result
    })
}

class App {
    ends: Array<any> = [
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

    startGame() {
        grid.bindCells();
    };

    endGame(side: string) {
        (document.querySelector('#game_result') as HTMLElement).style.display = 'flex';
        (document.querySelector('#game_grid') as HTMLElement).style.pointerEvents = 'none';

        let result: string;
        switch (side) {
            case 'Ничья':
                result = side;
                break;
            default:
                result = `Победили: ${side}`;
                break;
        }

        document.querySelector('.winner').textContent = result;
    };
}

class Grid {
    root: App;
    turnSwitch: boolean = false;
    turnCounter: number = 0;
    turns: {crosses: Array<any>, circles: Array<any>} = {
        crosses: [],
        circles: [],
    };

    cells: Array<HTMLElement> = Array.from(document.querySelectorAll('.cell'));

    bindCells() {
        this.cells.forEach(cell => {
            cell.addEventListener('click', event => {
                this.makeMove(event.target as HTMLElement)
            })
        })


    };

    makeMove(cell: HTMLElement) {
        if (cell.nodeValue !== 'turned') {
            let src: string = this.turnSwitch ? 'circle.webp' : 'cross.png';
            this.turns[this.turnSwitch ? 'circles' : 'crosses'].push([+cell.dataset.x, +cell.dataset.y])

            this.turnSwitch = !this.turnSwitch; this.turnCounter++;

            cell.style.backgroundImage = `url('${src}')`;
            cell.nodeValue = 'turned';
        }
        this.checkEnd();
    };

    checkEnd() {
        let ended: boolean = false;
        this.root.ends.forEach(endCoordinates => {
            if (contains(endCoordinates, this.turns.circles)) {
                this.root.endGame('нолики');
                ended = true;
            }
            if (contains(endCoordinates, this.turns.crosses)) {
                this.root.endGame('крестики');
                ended = true;
            }
        })
        if (this.turnCounter === 9 && !ended) {
            this.root.endGame('Ничья');
        }
    };

    constructor(root: App) {
        this.root = root
    }

}

const app = new App()
const grid = new Grid(app)
console.log('Сетка:', grid)

app.startGame()
