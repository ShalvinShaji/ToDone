import React from "react";
import noImage from "../../public/assets/no_image.svg";

const Navbar = () => {
  return (
    <div className="navbar flex-row	 justify-around bg-base-100">
      <div>
        <a className="btn btn-ghost text-xl">ToDone</a>
      </div>
      <div>
        <a className="text-sm">
          " Turn plans into action, one task at a time."
        </a>
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
