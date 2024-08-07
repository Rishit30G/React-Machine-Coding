import { useState } from 'react'
import './App.css'
import Comment from './components/comment'
import useNode from './hooks/useNode'


const comments = {
  id: 1, 
  items: 
  [
    {
      id: 2,
      name: 'Comment 1',
      items: [
        {
          id: 3,
          name: 'Comment 2',
          items: []
        }
      ]
    },
    {
      id: 4,
      name: "Comment 3",
      items: []
    }
  ]
}

function App() {
  const [commentsData, setCommentsData] = useState(comments); 

  const {insertNode, editNode, deleteNode} = useNode();

  const handleInsertNode = (folderId, item) => {
    const finalStructure = insertNode(commentsData, folderId, item);
    setCommentsData(finalStructure);
  }

  const handleEditNode = (folderId, value) => {
    const finalStructure = editNode(commentsData, folderId, value);
    setCommentsData(finalStructure);
  }

  const handleDeleteNode = (folderId) =>{
    const finalStructure = deleteNode(commentsData, folderId);
    const temp = {...finalStructure}
    setCommentsData(temp);
  }

  return (
    <div className="App">
       <Comment handleInsertNode={handleInsertNode} handleDeleteNode={handleDeleteNode} handleEditNode={handleEditNode} comments={commentsData}/>
    </div>
  )
}

export default App
