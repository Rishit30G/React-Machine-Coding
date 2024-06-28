import React from 'react'

const Pagination = ({postsPerPage, totalPosts, paginate}) => {

    const pageNumbers = [];

    for(let i = 1; i<= Math.ceil(totalPosts/ postsPerPage); i++){
        pageNumbers.push(i);
  }
  return (
    <div>
        {pageNumbers.map(number => (
            <span key={number} style={{marginRight: '8px'}}>
                <a onClick={() => paginate(number)}href="!#">
                    {number}
                </a>
            </span>
        ))}
    </div>
  )
}

export default Pagination