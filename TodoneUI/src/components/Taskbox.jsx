import React from "react";
import "./Taskbox.css";

const Taskbox = () => {
  const tasks = [
    {
      id: 1,
      body: "Complete the project documentation.",
      completed: false,
    },
    {
      id: 2,
      body: "Update the task list component.",
      completed: false,
    },
    {
      id: 3,
      body: "Review the code for optimization.",
      completed: false,
    },
    {
      id: 4,
      body: "Fix bugs reported by the QA team. lorem,zdnfkjsflkaflkkkkkkna",
      completed: false,
    },
    {
      id: 5,
      body: "Prepare the presentation for the client.",
      completed: true,
    },
    {
      id: 6,
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit.Quisquam alias vitae adipisci ullam sint magni rerum facilis eum voluptate rem. Esse deserunt explicabo reprehenderit debiti officia modi tenetur dolores pariatur.",
      completed: false,
    },
  ];

  const handleComplete = (id) => {
    console.log(`Task ${id} marked as completed`);
  };

  const handleDelete = (id) => {
    console.log(`Task ${id} deleted`);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="task_box lg:w-1/2 lg:flex justify-between items-center mt-5"
        >
          <div className="w-full sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl">
            <p className="text-balance bg-slate-600 p-3 rounded-lg">
              {task.body}
            </p>
          </div>
          <div className="flex items-center justify-center mt-3 lg:mt-0">
            <button
              className="btn me-5 lg:me-0 lg:ms-9"
              onClick={() => handleComplete(task.id)}
            >
              {task.completed ? "Task completed" : "Mark as completed"}
            </button>
            <button
              className="btn lg:ms-3"
              onClick={() => handleDelete(task.id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Taskbox;
