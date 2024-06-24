// import { useEffect, useState } from 'react';
import './App.css';
import { Counter } from './components/counter';

function App() {
  // const [data, setData] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

  // const fetchData = async() => {
  //   try{
  //     const repsonse = await fetch('https://jsonplaceholder.typicode.com/posts');
  //     if(repsonse.ok){
  //       const result = await repsonse.json();
  //       setData(result);
  //     }
  //   }
  //   catch(error){
  //     setError(error);
  //   }
  //   finally{
  //     setLoading(false);
  //   }
  // }

  // useEffect(() => {
  //   fetchData();
  // }, []);
  return (
   <div className="App">
     <h1>Data Fetched </h1>
     {/* {
       loading ? <p>Loading...</p> : (
         error ? <p>{error.message}</p> : (
           <ul>
             {data.map((post) => (
               <li key={post.id}>{post.title}</li>
             ))}
           </ul>
         )
       )
     } */}
     <Counter/>
   </div>
  )
}

export default App
