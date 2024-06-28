import React from 'react'

const Posts = ({posts}) => {
  return (
    <ul>
    {
        posts.map((item)=> {
            return(
                <div key={item.id}>
                    <li>{item.title}</li>
                </div>
            )
        })
        
    }
    </ul>
  )
}

export default Posts