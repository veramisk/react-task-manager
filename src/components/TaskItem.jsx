import { useState, useEffect } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function TaskItem({ task, onToggleTask, onDeleteTask, editingId, setEditingId, onEditChange }) {
  const isEditing = editingId === task.id;

  const [editValue, setEditValue] = useState(task.title);

  useEffect(() => {
    setEditValue(task.title); 
  }, [task.title]);
 

  const { attributes, listeners, setNodeRef, transform, transition } =
  useSortable({ id: task.id });

  const [isHover, setIsHover] = useState(false);  

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    boxShadow: isHover ? "0 5px 15px rgba(0,0,0,0.2)" : "0 2px 6px rgba(0,0,0,0.08)",
    backgroundColor: isHover ? "#f0f4ff" : "#f9f9f9",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "8px 10px",
    borderRadius: "4px",
    marginBottom: "6px"
  };


return (
  <li
    ref={setNodeRef}
    style={style}
    className="task-item"
    onMouseEnter={() => setIsHover(true)}
    onMouseLeave={() => setIsHover(false)}
>

{/* Checkbox for completed */}
  <div {...attributes} {...listeners} style={{ display: 'flex', alignItems: 'center', flex: 1 }}>

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

      }}
      autoFocus
      style={{ marginLeft: "8px", flex: 1 }}

    />
  ) : (
    <span className={task.completed ? "completed" : ""}>
      {task.title}
        </span>
      )}
      </div>

{/* Buttons*/}
      <button
        onClick={() => {
          if (isEditing) {
            onEditChange(task.id, editValue); 
            setEditingId(null);
          } else {
            setEditingId(task.id);
          }
        }}
        style={{ marginLeft: "5px", padding: "5px 10px", cursor: "pointer" }}
      >
        {isEditing ? "Save" : "Edit"}
      </button>

    <button onClick={() => onDeleteTask(task.id)}>
      Delete
    </button> 
</li>
   
  );
}

export default TaskItem;
