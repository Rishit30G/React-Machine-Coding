import { useState, useEffect } from 'react';
import './App.css'


const ITEMS_PER_PAGE = 6;
const API_ENDPOINT = "https://hacker-news.firebaseio.com/v0";

function JobPosting( {url, title, by, time}){
  const formattedTime = new Date(time * 1000).toLocaleDateString();
  return (
  <div className="post" role="listItem">
    <h2 className="post__title">
      <a href={url} target="_blank">{title}</a>
    </h2>
    <span className='post__metadata'>
      By {by} . {formattedTime}
    </span>
  </div>
    )

}


function App() {

  const [items, setItems] = useState([])
  const [itemIds, setItemIds] = useState(null);
  const [fetchingDetails, setFetchingDetails] = useState(false)
  const [currentPage, setCurrentPage] = useState(0)

  const fetchItems = async (currPage) => {
     setFetchingDetails(true);

     let itemsList = itemIds; 
     if(itemsList === null){
      
      const response = await fetch(`${API_ENDPOINT}/jobstories.json`);
      itemsList = await response.json();
      setItemIds(itemsList);
     }else {
      itemsList = itemIds;
    }

      const itemIdsForPage = itemsList.slice(currPage * ITEMS_PER_PAGE, currPage* ITEMS_PER_PAGE + ITEMS_PER_PAGE); 

      const itemsForPage = await Promise.all(
        itemIdsForPage.map(itemId => 
          fetch(`${API_ENDPOINT}/item/${itemId}.json`)
          .then(response => response.json())
          .catch(error => console.error(error))
        )
      )

      setItems(prevItems => [...prevItems, ...itemsForPage]);
      setFetchingDetails(false);

  }


  useEffect(() => {
      fetchItems(currentPage);
  }, [currentPage]);
  return(
    <div className='app'>
      <h1 className="title">Hacker News Job Board</h1>
      {fetchingDetails || currentPage === 0 ? (
        <p className="loading">Loading...</p>
      ) : (
        <div>
          <div className="items" role="list">
            {items.map((item) => {
              return <JobPosting key={item.id} {...item} />;
            })}
          </div>
          <button className="load-more-button"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={fetchingDetails}
          >
            {fetchingDetails ? "Loading..." : "Load More Jobs"}
          </button>
        </div>
      )}
    </div>
  )
}

export default App
