import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState('');
  const [isEditing , setIsEditing] = useState(false); 
  const [currentTask, setCurrentTask] = useState(null);
  
  const addTask = () => {
      setTasks([...tasks, task]);
      setTask('');
  }

  const startEditing = (index) => {
      setIsEditing(true);
      setCurrentTask({index, value: tasks[index]});
  }

  const deleteTask = (index) => {
      setTasks(tasks.filter((_, i) => {
          return i !== index;
      }))
  }

  const editTask = () => {
      const updateTask = tasks.map((t, index)=> 
          index === currentTask.index ? currentTask.value : t )
      setTasks(updateTask);
      setIsEditing(false);
      setCurrentTask(null);
  }

  const handleEditChange = (e) => {
      setCurrentTask({...currentTask, value: e.target.value})
  }
  
return (
  <div className="App">
      <h1>Todo App</h1>
      <div>
          <input
              type="text"
              value={isEditing ? currentTask.value : task}
              onChange={(e) => isEditing ? handleEditChange(e) : setTask(e.target.value)}
          />
          <button onClick={editTask} disabled={!isEditing}>Update Task</button>
          <button onClick={addTask} disabled={isEditing}>Add Task</button>
      </div>
      <ul>
          {tasks.map((item, index) => (
              <li key={index}>
                  {item}
                  <button onClick={() => startEditing(index)}>Edit</button>
                  <button onClick={() => deleteTask(index)}>Delete</button>
              </li>
          ))}
      </ul>
  </div>
)
}

export default App
