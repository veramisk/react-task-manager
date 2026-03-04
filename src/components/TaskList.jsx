import TaskItem from "./TaskItem";

function TaskList({
    tasks,
    onToggleTask,
    onDeleteTask,
    editingId,
    setEditingId,
    onEditChange 
}) {
    return (
        <div>
           <h2>Task List</h2>
           <ul>
              {tasks.map((task) => (
                <TaskItem
                    key={task.id}
                    task={task}
                    onToggleTask={onToggleTask} 
                    onDeleteTask={onDeleteTask} 
                    editingId={editingId}
                    setEditingId={setEditingId}
                    onEditChange={onEditChange}
                />
             ))}
            </ul>
        </div>
    );
}

export default TaskList;