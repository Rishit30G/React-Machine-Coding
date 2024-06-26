import React from 'react'

const SearchResult = ({results}) => {
  return (
    <div className='result-list'>
        {
            results.map((item, index) => {
                return (
                    <div key={item.id} className='search-result'>
                        {item.title}
                    </div>
                )
            })
        }
    </div>
  )
}

export default SearchResult