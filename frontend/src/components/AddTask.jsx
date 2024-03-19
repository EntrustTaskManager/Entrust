import React, { useState } from "react";
// import { createTask } from "../services/services.jsx";

const AddTask = () => {
  const [task, setTask] = useState("");

  const handleAddTodo = async (e) => {
    // Added 'async' here
    e.preventDefault();

    await createTask({ task });
    console.log({ task });

    setTask("");
  };

  return (
    <form className="form__input" onSubmit={handleAddTodo}>
      <label htmlFor="task">Add Todo</label>
      <input
        type="text"
        name="task"
        id="task"
        value={task}
        className="input"
        required
        onChange={(e) => setTask(e.target.value)}
      />
      <button className="addTodoBtn">ADD TODO</button>
    </form>
  );
};

export default AddTask;
