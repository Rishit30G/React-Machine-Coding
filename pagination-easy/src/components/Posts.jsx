import React from 'react'

const Posts = ({posts}) => {
  return (
    <div>
        {posts.map((item) => (
            <div key={item.id} style={{marginBottom: '80px'}}>
                <h2>{item.title}</h2>
                <p> {item.body}</p>
            </div>
        ))}
    </div>
  )
}

export default Posts