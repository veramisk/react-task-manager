import { useState } from "react";
function TaskItem({ task, onToggleTask, onDeleteTask, editingId, setEditingId, onEditChange }) {
  const isEditing = editingId === task.id;
  const [editValue, setEditValue] = useState(task.title);

  return (
    
    <li className="task-item">

      {/* Checkbox for completed */}
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggleTask(task.id)} 
      />
     
      {/* 🔹 Editing tasks */}
      {isEditing ? (
        <input
          className="task-input"
          value={editValue}
          onChange={e => setEditValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onEditChange(task.id, editValue);
              setEditingId(null);
            }
            if (e.key === "Escape") {
              setEditValue(task.title);
              setEditingId(null);
            }

          } }
          autoFocus
          />
      ) : (
        <span className={task.completed ? "completed" : ""}>
          {task.title}
        </span>
      )}

      {/* Buttons*/}
      <button onClick={() => isEditing ? setEditingId(null) : setEditingId(task.id)}>
      {isEditing ? "Save" : "Edit"}
    </button>
    <button onClick={() => onDeleteTask(task.id)}>Delete</button> 
  </li>
   
  );
}

export default TaskItem;
