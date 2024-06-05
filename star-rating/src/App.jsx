import './App.css'
import {FaStar} from 'react-icons/fa'; 
import { useState } from 'react';

function App() {


  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);

  return (
    <>
    <div className='App'>
      <h1>
        {[...Array(5)].map((_, index) => {
          const ratingValue = index + 1;
          return (
          <label key={index}>
            <input type='radio' name='rating' value={ratingValue} onClick={() => setRating(ratingValue)} />
             <FaStar className="star" color={ratingValue <= (hover || rating) ? "#ffc107" : "black" } size={100} onMouseEnter={() => setHover(ratingValue)} onMouseLeave={()=>setHover(null)}/>
          </label>
        )})}
      </h1>
      <p>The rating is {rating === null ? 0 : rating}</p>
    </div>
    </>
  );
}

export default App
