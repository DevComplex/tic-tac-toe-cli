import TicTacToe from "./TicTacToe";
const prompt = require('prompt-sync')();

class TicTacToeController {
    private game: TicTacToe

    private getMoveFromUser() {
        const availableMoves = this.game.getAvailableMoves();
        const availableMovesText = availableMoves.map((move, index) => `${index}. ${move}`).join("\n");

        const isValid = moveNumber =>!isNaN(moveNumber) && moveNumber >= 0 && moveNumber <= availableMoves.length - 1;

        for(;;) {
            console.log(availableMovesText);
            const move = prompt("Select a move: ");

            if (move.startsWith("exit")) {
                process.exit();
            }

            const moveNumber = parseInt(move);

            if (!isValid(moveNumber)) {
                console.log("\nInvalid move please choose a valid move from the list.\n");
                continue;
            } 

            return availableMoves[moveNumber];
        }
    }

    run() {
        this.game = new TicTacToe();
        this.game.start("O");

        while (!this.game.hasWinner() && !this.game.hasDraw()) {
            const player = this.game.getCurrentPlayer();
            console.log(`Player ${player} move`);
            
            const move = this.getMoveFromUser();
            this.game.makeMove(move[0], move[1]);
            
            const board = this.game.getBoard();

            console.log("\n");
            board.forEach(row => console.log(row));
            console.log("\n");
        }

        const winner = this.game.getWinner();

        if (winner) {
            console.log(`Winner: Player ${winner}\n`);
        } else if (this.game.hasDraw()) {
            console.log("\nDraw\n");
        }
    }
}

export default TicTacToeController;