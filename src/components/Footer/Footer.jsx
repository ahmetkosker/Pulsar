import React from "react";
import { BsInstagram } from "react-icons/bs";
import { instagramLink } from "../../configs/simpleFunctions";

const Footer = () => {
  return (
    <footer className="flex justify-center items-center flex-row lg:w-[92%] xl:w-[95%] 2xl:w-[98%] py-1 absolute bottom-2">
      <BsInstagram
        onClick={() => window.open(instagramLink, "_blank")}
        className="text-3xl my-4 cursor-pointer absolute left-0"
      />
      <p className="font-extrabold sm:text-2xl text-xs">
        ANKARA BASED MUSIC COLLECTIVE
      </p>
    </footer>
  );
};

export default Footer;
