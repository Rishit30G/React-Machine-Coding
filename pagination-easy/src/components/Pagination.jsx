import React from 'react'

const Pagination = ({totalPosts, postsPerPage, setPage, page}) => {

    const result = [];
    for(let i = 1; i<= Math.ceil(totalPosts/postsPerPage); i++){
        result.push(i);
    }
  return (
    <p>
        <button onClick={() => setPage(prev => prev > 1 ? prev - 1 : prev)}>Previous</button>
                {result.map(number => (
                    <span key={number} style={{margin: '8px'}}>
                        <button onClick={() => setPage(number)} style={number === page ? {backgroundColor: '#333', color: 'white'} : {}}>
                            {number}
                        </button>
                    </span>
                ))}
        <button onClick={() => setPage(prev => prev < Math.ceil(totalPosts/postsPerPage) ? prev + 1 : prev)}>Next</button>
    </p>
  )
}

export default Pagination