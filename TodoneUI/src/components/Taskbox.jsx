import React from "react";
import "./Taskbox.css";

const Taskbox = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="task_box  lg:w-1/2 lg:flex justify-between items-center mt-5 ">
        <div className="w-full sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl">
          <p className=" text-balance bg-slate-600 p-3 rounded-lg">
            Lorem ipsum dolor Lorem ipsum dolor sit, amet consectetur
            adipisicing elit. Provident nisi maxime, mollitia placeat ex,
            repudiandae officiis dolor deleniti fugit ea qui aperiam fugiat
            excepturi aliquam facilis sunt culpa sapiente dignissimos. .
          </p>
        </div>
        <div className="flex items-center justify-center mt-3 lg:mt-0">
          <button className="btn me-5 lg:me-0 lg:ms-5  ">Completed</button>
          <button className="btn lg:ms-5">Delete</button>
        </div>
      </div>
      <div className="task_box  lg:w-1/2 lg:flex justify-between items-center mt-5 ">
        <div className="w-full sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl">
          <p className=" text-balance bg-slate-600 p-3 rounded-lg">
            Lorem ipsum dolor .
          </p>
        </div>
        <div className="flex items-center justify-center mt-3 lg:mt-0">
          <button className="btn me-5 lg:me-0 lg:ms-5  ">Completed</button>
          <button className="btn lg:ms-5">Delete</button>
        </div>
      </div>
    </div>
  );
};

export default Taskbox;
