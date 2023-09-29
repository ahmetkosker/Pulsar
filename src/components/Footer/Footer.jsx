import React from "react";
import { BsInstagram } from "react-icons/bs";

const Footer = () => {
  return (
    <footer className="flex sm:w-5/12 w-auto">
      <div className="pl-5 sm:w-14 w-9 pb-2">
        <BsInstagram size={"auto"} />
      </div>
      <div className="font-extrabold sm:text-2xl text-xs relative sm:left-full left-2/3">
        Ankara based record company
      </div>
    </footer>
  );
};

export default Footer;
