import React from "react";

const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-slate-900 text-white py-3">
      <div className="container mx-auto text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Developed and Designed by Me ❤️
        </p>
      </div>
    </footer>
  );
};

export default Footer;
