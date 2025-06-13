import { Game } from "./Game";
import { Score } from "./Score";
import { useState } from "react";

export const Container = () => {
  const [gameScore, setGameScore] = useState(0);

  return (
    <div className="container">
      <Score gameScore={gameScore} />
      <Game gameScore={gameScore} setScore={setGameScore} />
    </div>
  );
};
