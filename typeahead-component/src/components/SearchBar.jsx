import React, { useEffect, useState } from 'react'
import {FaSearch} from 'react-icons/fa'

const SearchBar = ({setResults}) => {
    const [input , setInput] = useState('');
   
    useEffect(() => {
        const fetchData = async () => {
            if (input) {
                const response = await fetch('https://jsonplaceholder.typicode.com/posts');
                const data = await response.json();
                const filteredData = data.filter((item) => {
                    return item.title.toLowerCase().includes(input.toLowerCase());
                });
                setResults(filteredData);
            } else {
                setResults([]);
            }
        };

        fetchData();
    }, [input, setResults]);
   

    const handleInput = (value) => {
        setInput(value);
    }
  return (
    <>
    <div className='input-wrapper'>
            <FaSearch id='search-icon' className='search-icon'/>
            <input placeholder='Type to search...' value={input} onChange={(e) => handleInput(e.target.value)}/> 
    </div>
    </>
  )
}

export default SearchBar