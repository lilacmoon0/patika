export const Card = ({ card, onClick }) => {
  const isFlipped = card.flip || card.done;
  return (
    <div
      className={`card${isFlipped ? " flipped" : ""}`}
      onClick={() => onClick(card)}
    >
      <div className="card-inner">
        <div className="card-front">
          {card.done && (
            <img src={card.img} alt={card.name || `card-${card.id}`} width="90%" />
          )}
        </div>
        <div className="card-back">
          <img src={card.img} alt={card.name || `card-${card.id}`} width="90%" />
        </div>
      </div>
    </div>
  );
};