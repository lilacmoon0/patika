import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  board: [
    ["", "r", "", "r", "", "r", "", "r"],
    ["r", "", "r", "", "r", "", "r", ""],
    ["", "r", "", "r", "", "r", "", "r"],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["w", "", "w", "", "w", "", "w", ""],
    ["", "w", "", "w", "", "w", "", "w"],
    ["w", "", "w", "", "w", "", "w", ""],
  ],
  currentPlayer: "w",
  selectedCell: null,
  selectedPiece: null,
  takenPieceWhite: 0,
  takenPieceRed: 0,
  gameStatus: "menu",
  winner: "",
  forcedMoves: [],
  legalMoves: [],
  highlightedCells: [],
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    startGame: (state) => {
      state.board = [
        ["", "r", "", "r", "", "r", "", "r"],
        ["r", "", "r", "", "r", "", "r", ""],
        ["", "r", "", "r", "", "r", "", "r"],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["w", "", "w", "", "w", "", "w", ""],
        ["", "w", "", "w", "", "w", "", "w"],
        ["w", "", "w", "", "w", "", "w", ""],
      ];
      state.currentPlayer = "w";
      state.selectedCell = null;
      state.selectedPiece = null;
      state.takenPieceWhite = 0;
      state.takenPieceRed = 0;
      state.gameStatus = "playing";
      state.winner = "";
      state.forcedMoves = [];
      state.legalMoves = [];
      state.highlightedCells = [];
    },
    selectCell: (state, action) => {
      const { row, col } = action.payload;
      state.selectedCell = { row, col };
      state.selectedPiece = state.board[row][col];
    },
    setHighlightedCells: (state, action) => {
      state.highlightedCells = action.payload;
    },
    setForcedMoves: (state, action) => {
      state.forcedMoves = action.payload;
    },
    setLegalMoves: (state, action) => {
      state.legalMoves = action.payload;
    },
    clearSelection: (state) => {
      state.selectedCell = null;
      state.selectedPiece = null;
      state.highlightedCells = [];
      state.forcedMoves = [];
      state.legalMoves = [];
    },
    makeMove: (state, action) => {
      const { from, to } = action.payload;
      const piece = state.board[from.row][from.col];

      // Move the piece
      state.board[to.row][to.col] = piece;
      state.board[from.row][from.col] = "";

      // Check for king promotion
      if (piece === "w" && to.row === 0) {
        state.board[to.row][to.col] = "wK"; // White king
      } else if (piece === "r" && to.row === 7) {
        state.board[to.row][to.col] = "rK"; // Red king
      }

      let wasCapture = false;

      // Check for taken pieces
      if (Math.abs(from.row - to.row) === 2) {
        wasCapture = true;
        const midRow = (from.row + to.row) / 2;
        const midCol = (from.col + to.col) / 2;
        const takenPiece = state.board[midRow][midCol];
        if (takenPiece === "r" || takenPiece === "rK") {
          state.takenPieceRed += 1;
        } else if (takenPiece === "w" || takenPiece === "wK") {
          state.takenPieceWhite += 1;
        }
        state.board[midRow][midCol] = "";
      }

      // Clear current selection
      state.selectedCell = null;
      state.selectedPiece = null;
      state.highlightedCells = [];
      state.forcedMoves = [];
      state.legalMoves = [];

      // If it was a capture, check if the same piece can capture again
      let hasAdditionalCaptures = false;
      if (wasCapture) {
        // Check if the piece that just moved can make another capture
        const currentPiece = state.board[to.row][to.col];
        const directions =
          currentPiece === "wK" || currentPiece === "rK"
            ? [
                [-1, -1],
                [-1, 1],
                [1, -1],
                [1, 1],
              ]
            : currentPiece === "w"
            ? [
                [-1, -1],
                [-1, 1],
              ]
            : [
                [1, -1],
                [1, 1],
              ];

        for (const [dRow, dCol] of directions) {
          const jumpRow = to.row + dRow * 2;
          const jumpCol = to.col + dCol * 2;
          const middleRow = to.row + dRow;
          const middleCol = to.col + dCol;
          if (
            jumpRow >= 0 &&
            jumpRow < 8 &&
            jumpCol >= 0 &&
            jumpCol < 8 &&
            state.board[jumpRow][jumpCol] === "" &&
            state.board[middleRow][middleCol] !== "" &&
            (((currentPiece === "w" || currentPiece === "wK") &&
              (state.board[middleRow][middleCol] === "r" ||
                state.board[middleRow][middleCol] === "rK")) ||
              ((currentPiece === "r" || currentPiece === "rK") &&
                (state.board[middleRow][middleCol] === "w" ||
                  state.board[middleRow][middleCol] === "wK")))
          ) {
            hasAdditionalCaptures = true;
            break;
          }
        }
      }

      // Only switch players if there are no additional captures
      if (!hasAdditionalCaptures) {
        state.currentPlayer = state.currentPlayer === "w" ? "r" : "w";
      } else {
        // Keep the same player and auto-select the piece for additional captures
        state.selectedCell = { row: to.row, col: to.col };
        state.selectedPiece = state.board[to.row][to.col];
      }

      // Check for game over
      if (state.takenPieceRed === 12) {
        state.winner = "w";
        state.gameStatus = "ended";
      } else if (state.takenPieceWhite === 12) {
        state.winner = "r";
        state.gameStatus = "ended";
      }
    },
    endGame: (state, action) => {
      state.gameStatus = "ended";
      state.winner =
        action.payload ||
        (state.takenPieceRed > state.takenPieceWhite ? "r" : "w");
    },
  },
});

export const {
  makeMove,
  startGame,
  endGame,
  selectCell,
  setHighlightedCells,
  setForcedMoves,
  setLegalMoves,
  clearSelection,
} = gameSlice.actions;
export const selectBoard = (state) => state.game.board;
export const selectCurrentPlayer = (state) => state.game.currentPlayer;
export const selectWinner = (state) => state.game.winner;
export const selectSelectedCell = (state) => state.game.selectedCell;
export const selectSelectedPiece = (state) => state.game.selectedPiece;
export const selectTakenPieceWhite = (state) => state.game.takenPieceWhite;
export const selectTakenPieceRed = (state) => state.game.takenPieceRed;
export const selectGameStatus = (state) => state.game.gameStatus;
export const selectHighlightedCells = (state) => state.game.highlightedCells;
export const selectForcedMoves = (state) => state.game.forcedMoves;
export const selectLegalMoves = (state) => state.game.legalMoves;

export const gameReducer = gameSlice.reducer;
