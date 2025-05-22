import { useState } from "react";
import "./App.css";
import TaskList from "./components/TaskList";

function App() {
  const [filter, setFilter] = useState("All");
  const [tasks, setTasks] = useState([
    {
      id: 1,
      text: "Learn Redux",
      completed: false,
    },
    {
      id: 2,
      text: "Learn React",
      completed: true,
    },
  ]);

  const submitTask = (e) => {
    e.preventDefault();
    const newTask = {
      id: tasks.length + 1,
      text: e.target.elements[0].value,
      completed: false,
    };
    setTasks([...tasks, newTask]);
    e.target.elements[0].value = "";
  };

  const isAllChecked = () => {
    return tasks.every((task) => task.completed);
  };

  const toggleAll = () => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        return {
          ...task,
          completed: !isAllChecked(),
        };
      })
    );
  };

  const getFilteredTasks = () => {
    switch (filter) {
      case "Active":
        return tasks.filter((task) => !task.completed);
      case "Completed":
        return tasks.filter((task) => task.completed);
      default:
        return tasks;
    }
  };

  const switchFilter = (filter) => (e) => {
    e.preventDefault();
    setFilter(filter);
  };

  const clearCompleted = (e) => {
    e.preventDefault();
    setTasks((prevTasks) => prevTasks.filter((task) => !task.completed));
  };

  return (
    <div className="App">
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <form onSubmit={submitTask}>
            <input
              className="new-todo"
              placeholder="What needs to be done?"
              autoFocus
            />
          </form>
        </header>

        <section className="main">
          <input
            className="toggle-all"
            type="checkbox"
            checked={isAllChecked()}
          />
          <label onClick={toggleAll} htmlFor="toggle-all">
            Mark all as complete
          </label>

          <TaskList
            onTaskSet={setTasks}
            taskList={getFilteredTasks()}
          ></TaskList>
        </section>

        <footer className="footer">
          <span className="todo-count">
            <strong>{`${tasks.length} items left`}</strong>
          </span>

          <ul className="filters">
            <li>
              <a
                href="/"
                className={filter === "All" ? "selected" : ""}
                onClick={switchFilter("All")}
              >
                All
              </a>
            </li>
            <li>
              <a
                href="/"
                className={filter === "Active" ? "selected" : ""}
                onClick={switchFilter("Active")}
              >
                Active
              </a>
            </li>
            <li>
              <a
                href="/"
                className={filter === "Completed" ? "selected" : ""}
                onClick={switchFilter("Completed")}
              >
                Completed
              </a>
            </li>
          </ul>

          <button className="clear-completed" onClick={clearCompleted}>
            Clear completed
          </button>
        </footer>
      </section>

      <footer className="info">
        <p>Click to edit a todo</p>
      </footer>
    </div>
  );
}

export default App;
