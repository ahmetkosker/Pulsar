import React from "react";
import { BsInstagram } from "react-icons/bs";
import { footerTitle, instagramLink } from "../../configs/simpleFunctions";

const Footer = () => {
  return (
    <footer className="flex w-full justify-center items-center flex-row lg:w-[92%] xl:w-[95%] 2xl:w-[98%] py-1 absolute bottom-0">
      <BsInstagram
        onClick={() => window.open(instagramLink, "_blank")}
        className="text-3xl my-4 cursor-pointer absolute -left-4"
      />
      <p className="font-extrabold sm:text-lg text-xs">
        {footerTitle}
      </p>
    </footer>
  );
};

export default Footer;
