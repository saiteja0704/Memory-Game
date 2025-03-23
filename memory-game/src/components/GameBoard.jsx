import React, { useState, useEffect } from 'react';
import Card from './Card';

const generateCards = () => {
  const cardValues = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  const cards = [...cardValues, ...cardValues];
  return cards.sort(() => Math.random() - 0.5).map(value => ({ value, id: Math.random() }));
};

const GameBoard = () => {
  const [cards, setCards] = useState(generateCards());
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [moves, setMoves] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  // Handle card clicks
  const handleCardClick = (index) => {
    if (flippedCards.length < 2 && !flippedCards.includes(index) && !matchedPairs.includes(cards[index].value)) {
      setFlippedCards(prev => [...prev, index]);
    }
  };

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [firstCardIndex, secondCardIndex] = flippedCards;
      if (cards[firstCardIndex].value === cards[secondCardIndex].value) {
        setMatchedPairs(prev => [...prev, cards[firstCardIndex].value]);
      }
      setTimeout(() => setFlippedCards([]), 1000);
      setMoves(moves + 1);
    }
  }, [flippedCards, cards, moves]);

  useEffect(() => {
    if (matchedPairs.length === cards.length / 2) {
      setGameOver(true);
    }
  }, [matchedPairs, cards.length]);

  const handleRestart = () => {
    setCards(generateCards());
    setFlippedCards([]);
    setMatchedPairs([]);
    setMoves(0);
    setGameOver(false);
  };

  return (
    <div>
      <h1>Memory Matching Game</h1>
      <div className="board">
        {cards.map((card, index) => (
          <Card
            key={index}
            card={card}
            handleCardClick={() => handleCardClick(index)}
            isFlipped={flippedCards.includes(index)}
            isMatched={matchedPairs.includes(card.value)}
          />
        ))}
      </div>
      <div className="info">
        <p>Moves: {moves}</p>
      </div>
      {gameOver && (
        <div className="game-over">
          <h2>Game Over!</h2>
          <p>Moves: {moves}</p>
          <button onClick={handleRestart}>Restart</button>
        </div>
      )}
    </div>
  );
};

export default GameBoard;
