import React from "react";
import noImage from "../../public/assets/no_image.svg";
import "./Navbar.css";

const Navbar = () => {
  const today = new Date();
  const hours = today.getHours();

  // Format the date in words (e.g., "October 12, 2024")
  const date = today.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  let greeting;

  if (hours < 12) {
    greeting = "Good morning";
  } else if (hours < 18) {
    greeting = "Good afternoon";
  } else {
    greeting = "Good evening";
  }
  return (
    <div className="navbar fixed top-0 left-0 right-0 z-50 flex-row justify-between bg-base-100 shadow">
      <div>
        <a className="text-xl">ToDone</a>
      </div>
      <div className=" flex flex-col justify-center items-center p-2 bg-base-100">
        <i className=" text-lg ">"Progress, not perfection." - Anonymous</i>

        <i>Today, {date}</i>
      </div>

      <div>
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img alt="Tailwind CSS Navbar component" src={noImage} />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
