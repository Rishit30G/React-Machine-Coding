import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Posts from './components/Posts'
import Pagination from './components/Pagination'

function App() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [numberofPosts, setNumberOfPosts] = useState(10);

  useEffect(() => {
     const fetchData = async() => {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts')
      const result = await response.json();
      setData(result);
    }
    fetchData();
  }, []);

  const handleValue = (e) => {
     setNumberOfPosts(e.target.value);
  }

  const indexOfLastPost = numberofPosts * page; 
  const indexofFirstPost = indexOfLastPost - numberofPosts;
  const currentSetOfPosts = data.slice(indexofFirstPost, indexOfLastPost); 

  return (
    <>
    
     <div>
        <select name="numbers" id="numbers" onChange={handleValue}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
        </select>
        <Posts posts={currentSetOfPosts}/>
        <Pagination totalPosts={data.length} postsPerPage={numberofPosts} setPage={setPage} page={page}/>
     </div>
    </>
  )
}

export default App
