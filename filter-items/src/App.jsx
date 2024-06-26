import { useState } from 'react';
import './App.css'
import { items } from './items';
import { useEffect } from 'react';

function App() {

  const [selectedFilters, setSelectedFilters] = useState([]);
  const [filteredItems, setFilteredItems] = useState(items);

  let filters = ["Bags", "Watches", "Sports", "Sunglasses"];

  const handleFilterButtonClick = (selectedCategory) => {
    if(selectedFilters.includes(selectedCategory)){
      let filters = selectedFilters.filter((el) => el !== selectedCategory);
      setSelectedFilters(filters);
    }else{
      setSelectedFilters([...selectedFilters, selectedCategory]);
    }
  };

  useEffect(() => {
    filterItems();
  }, [selectedFilters]);

  const filterItems = () => {
    if(selectedFilters.length > 0){
        let tempItems = selectedFilters.map((selectedCategory) => {
            let temp = items.filter((item) => item.category === selectedCategory);
            return temp;
        });
        setFilteredItems(tempItems.flat());
    }else{
      setFilteredItems(items);
    }
  }

  return (
    <div>
      <div className='button-container'>
        {filters.map((category, index) => (
          <button 
             // When using the onClick event, make sure to use an arrow function to pass the argument
             onClick={() => handleFilterButtonClick(category)}
             className={`button ${selectedFilters?.includes(category) ? 'active' : ''}`}
             key={`filter-${index}`}
          >
              {category}
          </button>
        ))}
      </div>

      <div className="items-container">
        {filteredItems.map((item, index)=> (
          <div key={`items-${index}`} className='item'>
            <p>{item.name}</p>
            <p className="category">{item.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App
