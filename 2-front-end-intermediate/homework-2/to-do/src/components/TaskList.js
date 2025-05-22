import TaskCard from "./taskcard";

function TaskList(props) {
  const destroyTask = (id) => {
    props.onTaskSet((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const taksDone = (id) => {
    props.onTaskSet((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === id) {
          return {
            ...task,
            completed: !task.completed,
          };
        }
        return task;
      })
    );
  };

  const editTask = (id, editedText) => {
    props.onTaskSet((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === id) {
          return {
            ...task,
            text: editedText,
          };
        }
        return task;
      })
    );
  };

  return (
    <ul className="todo-list">
      {props.taskList.map((task) => (
        <li className={task.completed ? "completed" : ""} key={task.id}>
          <TaskCard
            onTaskDone={taksDone}
            onDestroy={destroyTask}
            onEditTask={editTask}
            completed={task.completed}
            text={task.text}
            id={task.id}
          ></TaskCard>
        </li>
      ))}
    </ul>
  );
}

export default TaskList;
