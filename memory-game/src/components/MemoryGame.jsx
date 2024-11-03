import { useEffect } from "react";
import { useState } from "react";

const MemoryGame = () => {
  const [gridSize, setGridSize] = useState(4);
  const [cards, setCards] = useState([]);

  const [flipped, setFlipped] = useState([]);
  const [solved, setSolved] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [won, setWon] = useState(false);
  const [showAllCards, setShowAllCards] = useState(true);

  const handleGridSizeChange = (e) => {
    const size = parseInt(e.target.value);
    if (size >= 2 && size <= 10) setGridSize(size);
  };

  
  const isFlipped = (id) => flipped.includes(id) || solved.includes(id) || showAllCards;
  const isSolved = (id) => solved.includes(id);

  useEffect(() => {
    if(solved.length === cards.length && cards.length > 0){
        setWon(true);
    }
  }, [solved, cards]);

  const intializeGame = () => {
    const totalCards = gridSize * gridSize; // 16
    const pairCount = Math.floor(totalCards / 2); // 8
    const numbers = Array.from({ length: pairCount }, (_, index) => index + 1); // [1, 2, 3, 4, 5, 6, 7, 8]
    const shuffledCards = [...numbers, ...numbers]
      .sort(() => Math.random() - 0.5)
      .slice(0, totalCards)
      .map((number, index) => ({ id: index, number }));
    setCards(shuffledCards);
    setFlipped([]);
    setSolved([]);
    setWon(false);
    setShowAllCards(true);
    setTimeout(() => setShowAllCards(false), gridSize * 1000);
  };

  useEffect(() => {
    intializeGame();
  }, [gridSize]);

  const checkMatch = (secondId) => {
    const [firstId] = flipped; 
    if(cards[firstId].number === cards[secondId].number){
        setSolved([...solved, firstId, secondId]);
        setFlipped([]);
        setDisabled(false);
    }else{
        setTimeout(()=>{
            setFlipped([]);
            setDisabled(false);
        }, 1000);
    }
  }

  const handleClick = (id) => {
    if (disabled || won || showAllCards) return;

    if (flipped.length === 0) {
      setFlipped([id]);
      return;
    }

    if(flipped.length === 1){
        setDisabled(true);
       
        if(id !== flipped[0]){
            setFlipped([...flipped, id]);
            checkMatch(id);
        }
        else{
            setFlipped([]);
            setDisabled(false);
        }

    }
  };


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-6">Memory Game</h1>

      {/* Input  */}
      <div className="mb-4">
        <label htmlFor="gridSize" className="mr-2">
          Grid Size: (max 10)
        </label>
        <input
          type="number"
          id="gridSize"
          min="2"
          max="10"
          value={gridSize}
          onChange={handleGridSizeChange}
          className="border-2 border-gray-300 rounded px-2 py-1"
        ></input>
      </div>

      {/* Game Board */}
      <div
        className={`grid gap-2 mb-4`}
        style={{
          gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
          width: `min(100%, ${gridSize * 5.5}rem)`,
        }}
      >
        {cards.map((card) => {
          return (
            <div
              key={card.id}
              className={`aspect-square 
          flex items-center justify-center text-xl font-bold rounded-lg cursor-pointer transition-all duration-300 
          ${
            showAllCards
              ? "bg-gray-300 text-gray-700" // Gray background during initial 3 seconds
              : isFlipped(card.id)
              ? isSolved(card.id)
                ? "bg-green-500 text-white"
                : "bg-blue-500 text-white"
              : "bg-gray-300 text-gray-400"
          }`}
              onClick={() => handleClick(card.id)}
            >
              {isFlipped(card.id) ? card.number : "?"}

            </div>
          );
        })}
      </div>

      {/* Result */}
      {won && <div className="mt-4 text-4xl font-bold text-green-600 animate-bounce">You Won!</div>}
      {/* Button */}
        <button
            onClick={intializeGame}
            className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
        >
            {won ? "Play Again" : "Reset"}
        </button>
    </div>
  );
};

export default MemoryGame;
