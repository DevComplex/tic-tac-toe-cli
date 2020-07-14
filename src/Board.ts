import { Cell, Player } from "./types";

class Board {
    private board: Array<[Cell, Cell, Cell]>;

    constructor() {
        this.board = Board.initEmptyBoard();
    }

    private static initEmptyBoard(): Array<[Cell, Cell, Cell]> {
        const board = [];
        
        for(let i = 0; i < 3; i++) {
            const row = new Array(3).fill(".");
            board.push(row);
        }

        return board;
    }

    private canPlayerWin(player: Player) {
        return this.checkWinnerHelper(val => val === player || val === ".");
    }

    private checkWinnerHelper(predicate: (val: Cell) => boolean) {
        let rowCount = 0;
        let colCount = 0;

        for(let i = 0; i < 3; i++) {
            for(let j = 0; j < 3; j++) {
                if (predicate(this.board[i][j])) {
                    rowCount += 1;
                }

                if (predicate(this.board[j][i])) {
                    colCount += 1;
                }
            }

            if (rowCount === 3 || colCount == 3) {
                return true;
            }

            rowCount = 0;
            colCount = 0;
        }

        let diagCount = 0;

        for(let i = 0, j = 0; i < 3 && j < 3; i++, j++) {
            if (predicate(this.board[i][j])) {
                diagCount += 1;
            }
        }

        if (diagCount === 3) {
            return true;
        }

        diagCount = 0;

        for(let i = 0, j = 2; i < 3 && j >= 0; i++, j--) {
            if (predicate(this.board[i][j])) {
                diagCount += 1;
            }
        }

        return diagCount === 3;
    }

    reset() {
        this.board = Board.initEmptyBoard();
    }

    get(): Array<[Cell, Cell, Cell]> {
        return this.board;
    }

    private isEmpty(row, col) {
        return this.board[row][col] === ".";
    }

    setMove(player: Player, row: number, col: number): boolean {
        if (this.isEmpty(row, col)) {
            this.board[row][col] = player;
            return true;
        }

        return false;
    }

    getAvailableMoves(): Array<[number, number]> {
        const availableMoves = [];

        for(let i = 0; i < 3; i++) {
            for(let j = 0; j < 3; j++) {
                if (this.isEmpty(i, j)) {
                    const move = [i, j];
                    availableMoves.push(move);
                }
            }
        }

        return availableMoves;
    }

    checkWinner(): Player | null {
        if (this.checkWinnerHelper(val => val === "O")) {
            return "O";
        }

        if (this.checkWinnerHelper(val => val === "X")) {
            return "X";
        }

        return null;
    }

    canAPlayerWin() {
        const canXWin = this.canPlayerWin("X");
        const canOWin = this.canPlayerWin("O");
        return canXWin || canOWin;
    }
}

export default Board;