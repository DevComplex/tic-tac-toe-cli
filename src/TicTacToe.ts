import { Player, Cell } from "./types";
import Board from "./Board";

class TicTacToe {
    private currentPlayer: Player;
    private board: Board;
    private winner: Player;

    constructor() {
        this.board = new Board();
    }

    start(player: Player) {
        this.currentPlayer = player;
        this.winner = null;
        this.board.reset();
    }

    hasDraw() {
        return !this.board.canAPlayerWin();
    }

    hasWinner() {
        const winner = this.board.checkWinner();

        if (winner) {
            this.winner = winner;
            return true;
        }

        return false;
    }

    getWinner(): Player {
        return this.winner;
    }

    getCurrentPlayer(): Player {
        return this.currentPlayer;
    }

    getBoard(): Array<[Cell, Cell, Cell]> {
        return this.board.get();
    }

    getAvailableMoves(): Array<[number, number]> {
        return this.board.getAvailableMoves();
    }

    makeMove(row: number, col: number): boolean {
        if (row < 0 || col < 0 || row >= 3 || col >= 3) {
            return false;
        }

        if (this.board.setMove(this.currentPlayer, row, col)) {
            this.currentPlayer = this.currentPlayer === "O" ? "X" : "O";
            return true;
        }
    }
}

export default TicTacToe;