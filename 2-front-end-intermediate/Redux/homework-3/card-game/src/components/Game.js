import { Card } from "./Card";
import { useSelector, useDispatch } from "react-redux";
import { updateFlip, setDone, resetFlip } from "../redux/gameSlice";
import { useMemo, useEffect, useRef } from "react";

export const Game = ({ gameScore, setScore }) => {
  const cards = useSelector((state) => state.game.cards);

  const flippedCards = useMemo(
    () => cards.filter((card) => card.flip === true && !card.done),
    [cards]
  );

  const matchedCards = useMemo(
    () => cards.filter((card) => card.done === true),
    [cards]
  );

  const allDone = cards.length > 0 && cards.every((card) => card.done);

  const prevMatchedCount = useRef(0);
  const dispatch = useDispatch();

  const handeClick = (card) => {
    if (flippedCards.length >= 2 || card.flip || card.done) {
      return;
    }
    dispatch(updateFlip({ instanceId: card.instanceId }));
  };

  useEffect(() => {
    if (matchedCards.length > prevMatchedCount.current) {
      setScore((prev) => prev + 50);
      prevMatchedCount.current = matchedCards.length;
    }
  }, [matchedCards, setScore]);

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [card1, card2] = flippedCards;
      if (card1.img === card2.img) {
        setTimeout(() => {
          dispatch(
            setDone({ instanceIds: [card1.instanceId, card2.instanceId] })
          );
        }, 700);
      } else {
        setTimeout(() => {
          dispatch(
            resetFlip({ instanceIds: [card1.instanceId, card2.instanceId] })
          );
          setScore((prev) => prev - 10);
        }, 700);
      }
    }
  }, [flippedCards, dispatch, setScore]);

  const handleReplay = () => {
    window.location.reload();
  };

  return (
    <>
      {allDone ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            minHeight: "100%",
          }}
        >
          <h2
            style={{
              color: "#ff4fa3",
              marginBottom: "1rem",
              textAlign: "center",
            }}
          >
            Your Score: {gameScore}
          </h2>
          <button
            style={{
              padding: "0.7rem 2rem",
              fontSize: "1.2rem",
              borderRadius: "12px",
              background: "#d1f3ff",
              color: "#ff4fa3",
              border: "2px solid #ffb8f6",
              cursor: "pointer",
              marginTop: "1rem",
            }}
            onClick={handleReplay}
          >
            Replay
          </button>
        </div>
      ) : (
        <div className="game">
          {cards.map((card) => (
            <Card key={card.instanceId} card={card} onClick={handeClick} />
          ))}
        </div>
      )}
    </>
  );
};
