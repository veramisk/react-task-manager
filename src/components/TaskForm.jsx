import { useState } from "react";


function TaskForm({ onAddTask }) {
    const [text, setText] = useState("");

function handleSubmit(e) {
    e.preventDefault();

    if (text.trim() === "") return;

    onAddTask(text);
    setText("");
}
    return (
        <form onSubmit={handleSubmit}>
            <input 
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Add task"
            />
            <button>Add</button>
        </form>
    );
}

export default TaskForm;