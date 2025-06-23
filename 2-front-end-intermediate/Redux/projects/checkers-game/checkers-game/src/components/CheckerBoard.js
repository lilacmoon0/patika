import { useSelector, useDispatch } from "react-redux";
import {
  selectBoard,
  selectCurrentPlayer,
  selectSelectedCell,
  selectHighlightedCells,
  selectForcedMoves,
  selectGameStatus,
  selectCell,
  setHighlightedCells,
  setForcedMoves,
  setLegalMoves,
  clearSelection,
  makeMove,
  endGame,
} from "../redux/gameSlice";
import { useEffect } from "react";

export const CheckerBoard = () => {
  const dispatch = useDispatch();
  const board = useSelector(selectBoard);
  const currentPlayer = useSelector(selectCurrentPlayer);
  const selectedCell = useSelector(selectSelectedCell);
  const highlightedCells = useSelector(selectHighlightedCells);
  const forcedMoves = useSelector(selectForcedMoves);
  const gameStatus = useSelector(selectGameStatus);

  // Helper function to check if a position is valid
  const isValidPosition = (row, col) => {
    return row >= 0 && row < 8 && col >= 0 && col < 8;
  };
  // Helper function to get opponent piece
  const getOpponent = (piece) => {
    if (piece === "w" || piece === "wK") return "r";
    if (piece === "r" || piece === "rK") return "w";
    return "";
  };

  // Helper function to get piece color
  const getPieceColor = (piece) => {
    if (piece === "w" || piece === "wK") return "w";
    if (piece === "r" || piece === "rK") return "r";
    return "";
  };

  // Helper function to check if piece is king
  const isKing = (piece) => {
    return piece === "wK" || piece === "rK";
  };

  // Get directions for piece movement
  const getDirections = (piece) => {
    if (isKing(piece)) {
      // Kings can move in all four diagonal directions
      return [
        [-1, -1],
        [-1, 1],
        [1, -1],
        [1, 1],
      ];
    } else if (piece === "w") {
      // White pieces move up (negative row direction)
      return [
        [-1, -1],
        [-1, 1],
      ];
    } else if (piece === "r") {
      // Red pieces move down (positive row direction)
      return [
        [1, -1],
        [1, 1],
      ];
    }
    return [];
  };
  // Calculate forced moves (jumps) for a piece
  const calculateForcedMoves = (row, col, piece) => {
    const moves = [];
    const directions = getDirections(piece);

    directions.forEach(([dRow, dCol]) => {
      const jumpRow = row + dRow * 2;
      const jumpCol = col + dCol * 2;
      const middleRow = row + dRow;
      const middleCol = col + dCol;
      if (
        isValidPosition(jumpRow, jumpCol) &&
        board[jumpRow][jumpCol] === "" &&
        getPieceColor(board[middleRow][middleCol]) ===
          getOpponent(getPieceColor(piece))
      ) {
        moves.push({ from: { row, col }, to: { row: jumpRow, col: jumpCol } });
      }
    });

    return moves;
  };

  // Calculate legal moves (non-jump) for a piece
  const calculateLegalMoves = (row, col, piece) => {
    const moves = [];
    const directions = getDirections(piece);

    directions.forEach(([dRow, dCol]) => {
      const newRow = row + dRow;
      const newCol = col + dCol;

      if (isValidPosition(newRow, newCol) && board[newRow][newCol] === "") {
        moves.push({ from: { row, col }, to: { row: newRow, col: newCol } });
      }
    });

    return moves;
  };
  // Calculate all forced moves for current player
  const calculateAllForcedMoves = () => {
    const allForcedMoves = [];

    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        if (getPieceColor(board[row][col]) === currentPlayer) {
          const pieceForcedMoves = calculateForcedMoves(
            row,
            col,
            board[row][col]
          );
          allForcedMoves.push(...pieceForcedMoves);
        }
      }
    }

    return allForcedMoves;
  };

  // Calculate all legal moves for current player
  const calculateAllLegalMoves = () => {
    const allLegalMoves = [];

    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        if (getPieceColor(board[row][col]) === currentPlayer) {
          const pieceLegalMoves = calculateLegalMoves(
            row,
            col,
            board[row][col]
          );
          allLegalMoves.push(...pieceLegalMoves);
        }
      }
    }

    return allLegalMoves;
  };
  // Check if the game is over
  const checkGameOver = () => {
    // Check if current player has any pieces left
    let hasPlayerPieces = false;
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        if (getPieceColor(board[row][col]) === currentPlayer) {
          hasPlayerPieces = true;
          break;
        }
      }
      if (hasPlayerPieces) break;
    }

    if (!hasPlayerPieces) {
      dispatch(endGame(getOpponent(currentPlayer)));
      return true;
    }

    // Check if current player has any valid moves
    const allForcedMoves = calculateAllForcedMoves();
    const allLegalMoves = calculateAllLegalMoves();

    if (allForcedMoves.length === 0 && allLegalMoves.length === 0) {
      dispatch(endGame(getOpponent(currentPlayer)));
      return true;
    }

    return false;
  }; // Update moves when the current player changes or when continuing captures
  useEffect(() => {
    if (gameStatus === "playing") {
      if (!checkGameOver()) {
        const allForcedMoves = calculateAllForcedMoves();
        const allLegalMoves = calculateAllLegalMoves();

        dispatch(setForcedMoves(allForcedMoves));
        dispatch(setLegalMoves(allLegalMoves));

        // Auto-select piece if there are forced moves available
        if (allForcedMoves.length > 0) {
          // If a piece is already selected (continuing captures), check if it has more captures
          if (selectedCell) {
            const selectedPieceMoves = allForcedMoves.filter(
              (move) =>
                move.from.row === selectedCell.row &&
                move.from.col === selectedCell.col
            );

            if (selectedPieceMoves.length > 0) {
              // The already selected piece has more captures, highlight them
              const validForcedMoves = selectedPieceMoves.map((m) => m.to);
              dispatch(setHighlightedCells(validForcedMoves));
            } else {
              // The selected piece has no more captures, select a different piece
              const move = allForcedMoves[0];
              dispatch(selectCell({ row: move.from.row, col: move.from.col }));
              const validForcedMoves = allForcedMoves
                .filter(
                  (m) =>
                    m.from.row === move.from.row && m.from.col === move.from.col
                )
                .map((m) => m.to);
              dispatch(setHighlightedCells(validForcedMoves));
            }
          } else {
            // No piece selected, auto-select the first piece with forced moves
            const move = allForcedMoves[0];
            dispatch(selectCell({ row: move.from.row, col: move.from.col }));
            const validForcedMoves = allForcedMoves
              .filter(
                (m) =>
                  m.from.row === move.from.row && m.from.col === move.from.col
              )
              .map((m) => m.to);
            dispatch(setHighlightedCells(validForcedMoves));
          }
        }
      }
    }
    // Disable exhaustive deps as these functions are defined inside the component
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPlayer, board, gameStatus, selectedCell, dispatch]);
  // Handle cell click
  const handleCellClick = (row, col) => {
    if (gameStatus !== "playing") return;

    const cellPiece = board[row][col];
    const clickedCell = { row, col };

    // If clicking on current player's piece
    if (getPieceColor(cellPiece) === currentPlayer) {
      // Select the piece and highlight available moves
      dispatch(selectCell(clickedCell));

      const pieceForcedMoves = calculateForcedMoves(row, col, cellPiece);
      const pieceLegalMoves = calculateLegalMoves(row, col, cellPiece);

      // If there are forced moves available for any piece, only show forced moves
      const allForcedMoves = calculateAllForcedMoves();

      if (allForcedMoves.length > 0) {
        // Only highlight forced moves for this piece
        const validForcedMoves = pieceForcedMoves.map((move) => move.to);
        dispatch(setHighlightedCells(validForcedMoves));
      } else {
        // Highlight legal moves for this piece
        const validLegalMoves = pieceLegalMoves.map((move) => move.to);
        dispatch(setHighlightedCells(validLegalMoves));
      }
    }
    // If clicking on empty cell
    else if (cellPiece === "" && selectedCell) {
      // Check if this cell is highlighted (valid move)
      const isHighlighted = highlightedCells.some(
        (cell) => cell.row === row && cell.col === col
      );

      if (isHighlighted) {
        // Make the move
        dispatch(
          makeMove({
            from: selectedCell,
            to: clickedCell,
          })
        );
      } else {
        // Deselect piece if clicking on non-highlighted empty cell
        dispatch(clearSelection());
      }
    }
    // If clicking on opponent's piece or any other invalid selection
    else {
      dispatch(clearSelection());
    }
  };

  // Helper function to check if a cell is highlighted
  const isCellHighlighted = (row, col) => {
    return highlightedCells.some(
      (cell) => cell.row === row && cell.col === col
    );
  };

  // Helper function to check if a cell is selected
  const isCellSelected = (row, col) => {
    return selectedCell && selectedCell.row === row && selectedCell.col === col;
  };

  // Helper function to check if a cell has a forced move
  const isForcedMove = (row, col) => {
    return forcedMoves.some(
      (move) => move.to.row === row && move.to.col === col
    );
  };

  return (
    <div className="checker-board">
      {board.map((row, rowIndex) => (
        <div className="checker-row" key={rowIndex}>
          {row.map((cell, colIndex) => {
            const isDark = (rowIndex + colIndex) % 2 === 1;
            const isSelected = isCellSelected(rowIndex, colIndex);
            const isHighlighted = isCellHighlighted(rowIndex, colIndex);
            const hasForcedMove = isForcedMove(rowIndex, colIndex);

            let cellClass = `checker-cell ${isDark ? "dark" : "light"}`;
            if (isSelected) cellClass += " selected";
            if (isHighlighted) cellClass += " highlighted";
            if (hasForcedMove) cellClass += " forced-move";

            return (
              <div
                key={colIndex}
                className={cellClass}
                onClick={() => handleCellClick(rowIndex, colIndex)}
              >
                {cell === "w" && <span className="checker-piece white"></span>}
                {cell === "r" && <span className="checker-piece red"></span>}
                {cell === "wK" && (
                  <span className="checker-piece white king"></span>
                )}
                {cell === "rK" && (
                  <span className="checker-piece red king"></span>
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};
