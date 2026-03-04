import { useState, useEffect } from "react";
import TaskForm from "./components/TaskForm"; 
import TaskList from "./components/TaskList";
import './App.css';

function App() {
  //     State tasks
  const [tasks, setTasks] = useState([
    { id: 1, title: "Todo homework", completed: false },
    { id: 2, title: "To learn React", completed:false },
  ]);

  //     State filters
  const [filter, setFilter] = useState('ALL'); 

  // State Editing
   const [editingId, setEditingId] = useState(null);

  //     Add tasks
  function addTask(title) {
    const newTask = {
      id: Date.now(),
      title: title,
      completed: false,
    };
    setTasks([...tasks, newTask]);
  }


  //    Toggle completed
  function toggleTask(id) {
    const updatedTasks = tasks.map(task => 
      task.id === id
      ? { ...task, completed: !task.completed }
      : task
    );
    setTasks(updatedTasks);
  }

  //     Delete tasks 
  function deleteTask(id) {
  const updatedTasks = tasks.filter(task => task.id !== id);
  setTasks(updatedTasks);
  }

  //     Computed array with filter
    const filteredTasks = tasks.filter(task => {
       if (filter === 'ALL') return true;
       if (filter === 'DONE') return task.completed;
       if (filter === 'ACTIVE') return !task.completed;
    });
  //      LocalStorage: loading at startup
    useEffect(() =>{
      const storedTasks = localStorage.getItem('tasks');
      if(storedTasks) {
      setTasks(JSON.parse(storedTasks));
      }
    }, []);
  //     LocalStorage: save when changing tasks
    useEffect(() => {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);
    
  // Editing tasks  
    function onEditChange(id, newTitle) {
  const updatedTasks = tasks.map(task =>
    task.id === id ? { ...task, title: newTitle } : task
  );
  setTasks(updatedTasks);
}

  return (
    <div className="app-wrapper">
      <div className="app-container">
       <h1>Task Manager</h1>

      <div className="filters">
        <button className="filter-btn" onClick={() => setFilter('ALL')} >All</button>
        <button  className="filter-btn" onClick={() => setFilter('DONE')}>Done</button>
        <button className="filter-btn" onClick={() => setFilter('ACTIVE')}>Active</button>
      </div>

    {/* Form and task list */}
      <TaskForm onAddTask={addTask} />
      <TaskList
      tasks={filteredTasks} 
      onToggleTask={toggleTask} 
      onDeleteTask={deleteTask} 
      editingId={editingId}
      setEditingId={setEditingId}
      onEditChange={onEditChange}

        />
      </div>
    </div>
  );
}

export default App;
