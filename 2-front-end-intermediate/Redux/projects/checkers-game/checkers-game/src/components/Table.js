import {
  selectCurrentPlayer,
  selectTakenPieceWhite,
  selectTakenPieceRed,
  selectGameStatus,
  selectWinner,
} from "../redux/gameSlice";
import { CheckerBoard } from "./CheckerBoard";
import { useDispatch, useSelector } from "react-redux";
import { startGame } from "../redux/gameSlice";

export const Table = () => {
  const takenPieceWhite = useSelector(selectTakenPieceWhite);
  const takenPieceRed = useSelector(selectTakenPieceRed);
  const currentPlayer = useSelector(selectCurrentPlayer);
  const gameStatus = useSelector(selectGameStatus);
  const winner = useSelector(selectWinner);

  const dispatch = useDispatch();

  const getPlayerName = (player) => {
    return player === "w" ? "White" : "Red";
  };

  return (
    <div className="table">
      <h1>Checkers Game</h1>

      <button
        onClick={() => {
          dispatch(startGame());
        }}
      >
        {gameStatus === "menu" ? "Start Game" : "New Game"}
      </button>

      {gameStatus !== "ended" && (
        <h2>Current Player: {getPlayerName(currentPlayer)}</h2>
      )}
      {gameStatus === "ended" && (
        <h2>Game Over! Winner: {getPlayerName(winner)}</h2>
      )}
      <div className="white-taken"> Taken Piece (White): {takenPieceWhite}</div>
      <CheckerBoard />
      <div className="red-taken">Taken Piece (Red): {takenPieceRed}</div>
    </div>
  );
};
