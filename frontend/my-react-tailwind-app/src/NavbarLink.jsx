import React from "react";

const NavbarLink = ({ text, onClick }) => {
  return (
    <div
      className="cursor-pointer p-2 mx-2 text-white hover:bg-gray-700"
      onClick={onClick}
    >
      {text}
    </div>
  );
};

export default NavbarLink;
