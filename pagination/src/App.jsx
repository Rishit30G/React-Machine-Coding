import { useEffect, useState } from 'react'
import './App.css'

function App() {

  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  
  const selectPagehandler = (page) => {
    if(page >= 1 && page <= totalPages)
    setPage(page);
  }

  const fetchData = async () => {
    const response =  await fetch(`https://dummyjson.com/products?limit=100&skip=${page*10-10}`);
      const d = await response.json();
      if( d && d.products)
      setData(d.products);
      setTotalPages(Math.ceil(d.total / 10)); 
  }

  useEffect(() => {
    fetchData();
  },[page]);

  console.log(setTotalPages)
  return (
    <>
      {data.length > 0 && (
        <>
        <div className="products">
          {data.map((prod) => {
            return (
            <span key={prod.id} className='products__single'>
              <img src={prod.thumbnail} alt={prod.name} />
              <div>{prod.title}</div>
            </span>)
          })}
        </div>
        {
            data.length > 0 && (
              <div className="pagination">
                 <span onClick={() => selectPagehandler(page - 1)} className={page > 1 ? "" : "pagination__disabled"}>👈🏻</span>
                 <span>{
                   [...Array((totalPages))].map((_, index)=>{
                      return <span 
                      className={page === index+1 ? "pagination__selected" : ""}
                      key={index} onClick={()=>selectPagehandler(index+1)}>{index+1}</span>
                    })
                  } 
                 </span>
                 <span  onClick={() => selectPagehandler(page + 1)} className={page < totalPages ? "" : "pagination__disabled"}>👉🏻</span>
                  
              </div>
            )
          }
        </>
        
        
      )}
    </>
  )
}

export default App
