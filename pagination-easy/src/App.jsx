import './App.css'
import React, {useState, useEffect} from 'react';
import Posts from './components/Posts';
import Pagination from './components/Pagination';

function App() {

  const [posts, setPosts] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(5);

  useEffect(()=> {

    const fetchItems = async() => {
       const response = await fetch('https://jsonplaceholder.typicode.com/posts'); 
       const result = await response.json();
       setPosts(result);
    }
    fetchItems();
  }, []);
// Page 1: 0 - 9
// Page 2: 10 - 19
// Page 3: 20 - 29 

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
 
   const paginate = (number) => {
    setCurrentPage(number)
   }

   const handleValue = (e) => {
    setPostsPerPage(e.target.value)
   }
 
  return(
    <div className="container">
      <h1>Posts List</h1>
      <select name="numbers" id="numbers" onChange={handleValue}>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
      </select>
      <Posts posts={currentPosts}/>
      <Pagination postsPerPage={postsPerPage} totalPosts={posts.length} paginate={paginate}/>
    </div>
  );
}

export default App
