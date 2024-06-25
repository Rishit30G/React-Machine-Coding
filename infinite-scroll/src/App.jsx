import { useState } from 'react'
import './App.css'
import { useEffect } from 'react'

function App() {

  const [data, setData] = useState([]);
  const [count, setCount] = useState(10);

  useEffect(() => {
      const fetchData = async() => {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const result = await response.json();
        setData(result);
      }
      fetchData();
    }, []);

  useEffect(() => {

    const onScroll = () => {
      if(window.innerHeight + window.scrollY >= window.document.body.offsetHeight - 10){
        setCount(count + 20);
      }
    }
    window.addEventListener('scroll',onScroll);
    return () => window.removeEventListener('scroll', onScroll)

  }, [count]);


  return (
    <div>
      {data.map((item, index) => {
        if(index < count) {
          return <h1 key={index}>{item.title}</h1>
      }
      })}
  </div>
  )
}

export default App
