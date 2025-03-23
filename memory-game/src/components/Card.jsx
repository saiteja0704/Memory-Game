import React from 'react';

const Card = ({ card, handleCardClick, isFlipped, isMatched }) => {
  return (
    <div
      className={`card ${isFlipped || isMatched ? 'flipped' : ''}`}
      onClick={handleCardClick}
    >
      {isFlipped || isMatched ? card.value : "?"}
    </div>
  );
};

export default Card;
