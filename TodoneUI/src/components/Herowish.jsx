import React from "react";
import "./Herowish.css"; // Import the CSS file for the animation

const Herowish = () => {
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
    <div className="flex flex-col justify-center items-center p-2">
      <h1 className="hero-greet">
        {greeting} Shalvin<span className="hero-wave">👋</span>
      </h1>
      <h3>Today, {date}</h3>
    </div>
  );
};

export default Herowish;
