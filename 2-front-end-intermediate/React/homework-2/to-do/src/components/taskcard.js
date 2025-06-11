import React, { useState } from "react";

function TaskCard(props) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(props.text);

  const setDone = () => {
    props.onTaskDone(props.id);
    console.log("Task done!");
  };

  const destroy = () => {
    props.onDestroy(props.id);
  };

  const handleLabelClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (event) => {
    setEditedText(event.target.value);
  };

  const handleInputBlur = () => {
    // Save the changes when the input field loses focus
    setIsEditing(false);
    // Call a function to handle saving the edited text to the parent component
    props.onEditTask(props.id, editedText);
  };

  return (
    <div className={`view${isEditing ? " editing" : ""}`}>
      <input
        className="toggle"
        type="checkbox"
        checked={props.completed}
        onChange={setDone}
      />
      {isEditing ? (
        <input
          className="edit"
          type="text"
          value={editedText}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          autoFocus
        />
      ) : (
        <label onDoubleClick={handleLabelClick}>{props.text}</label>
      )}
      {!isEditing && <button className="destroy" onClick={destroy}></button>}
    </div>
  );
}

export default TaskCard;
