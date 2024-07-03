import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);

  const addTask = () => {
    setTasks([...tasks, task]);
    setTask('');
  }

  const deleteTask = (index) => {
    const newTasks = tasks.filter((item, i) => {
      return i !== index;
    });
    setTasks(newTasks);
  }

  const startEditing = (index) => {
    setIsEditing(true);
    setCurrentTask({ index, value: tasks[index] });
  };

  const editTask = () => {
    const updatedTasks = tasks.map((t, index) =>
      index === currentTask.index ? currentTask.value : t
    );
    setTasks(updatedTasks);
    setIsEditing(false);
    setCurrentTask(null);
  };

  const handleEditChange = (e) => {
    // This means that the currentTask will be update with the new value
    setCurrentTask({ ...currentTask, value: e.target.value });
  };
  
  return (
    <div className="App">
    <h1>Todo App</h1>
    <div>
      <input
        type="text"
        value={isEditing ? currentTask.value : task}
        onChange={(e) => isEditing ? handleEditChange(e) : setTask(e.target.value)}
      />
      {isEditing ? (
        <button onClick={editTask}>Update Task</button>
      ) : (
        <button onClick={addTask}>Add Task</button>
      )}
    </div>
    <ul>
      {tasks.map((task, index) => (
        <li key={index}>
          {task}
          <button onClick={() => startEditing(index)}>Edit</button>
          <button onClick={() => deleteTask(index)}>Delete</button>
        </li>
      ))}
    </ul>
  </div>
  )
}

export default App
