import React from "react";
import { BsInstagram } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { instagramLink, shopifyLink } from "../../configs/simpleFunctions";

const Aside = () => {
  const location = useLocation();

  return (
    <aside className="z-50">
      <section className="flex flex-col gap-y-2">
        <Link
          to="/about"
          className={`font-extrabold sm:text-2xl text-xs cursor-pointer flex items-center relative ${
            location.pathname === "/about"
              ? "text-[#a59719]"
              : "hover:opacity-25 duration-100 easy-out transition-opacity"
          }`}
        >
          {location.pathname === "/about" && (
            <div className="w-4 bg-[#a59719] h-1 absolute -left-5"></div>
          )}
          ABOUT
        </Link>
        <div
          className={`font-extrabold duration-100 easy-out sm:text-2xl text-xs hover:opacity-25 transition-opacity cursor-pointer`}
        >
          <Link
            to="/artist"
            className={`font-extrabold sm:text-2xl text-xs cursor-pointer flex items-center relative ${
              location.pathname === "/artist"
                ? "text-[#a59719]"
                : "hover:opacity-25 duration-100 easy-out transition-opacity"
            }`}
          >
            {location.pathname === "/artist" && (
              <div className="w-4 bg-[#a59719] h-1 absolute -left-5"></div>
            )}
            ARTIST
          </Link>
        </div>
        <div
          className={`font-extrabold duration-100 easy-out sm:text-2xl text-xs hover:opacity-25 transition-opacity cursor-pointer`}
        >
          <Link
            to="/projects"
            className={`font-extrabold sm:text-2xl text-xs cursor-pointer flex items-center relative ${
              location.pathname === "/projects"
                ? "text-[#a59719]"
                : "hover:opacity-25 duration-100 easy-out transition-opacity"
            }`}
          >
            {location.pathname === "/projects" && (
              <div className="w-4 bg-[#a59719] h-1 absolute -left-5"></div>
            )}
            PROJECTS
          </Link>
        </div>
        <div
          className={`font-extrabold duration-100 easy-out sm:text-2xl text-xs hover:opacity-25 transition-opacity cursor-pointer`}
        >
          <Link
            to="/contact"
            className={`font-extrabold sm:text-2xl text-xs cursor-pointer flex items-center relative ${
              location.pathname === "/contact"
                ? "text-[#a59719]"
                : "hover:opacity-25 duration-100 easy-out transition-opacity"
            }`}
          >
            {location.pathname === "/contact" && (
              <div className="w-4 bg-[#a59719] h-1 absolute -left-5"></div>
            )}
            CONTACT
          </Link>
        </div>
        <div
          className={`font-extrabold duration-100 easy-out sm:text-2xl text-xs hover:opacity-25 transition-opacity cursor-pointer`}
        >
          <Link
            to="/blogs"
            className={`font-extrabold sm:text-2xl text-xs cursor-pointer flex items-center relative ${
              location.pathname === "/blogs"
                ? "text-[#a59719]"
                : "hover:opacity-25 duration-100 easy-out transition-opacity"
            }`}
          >
            {location.pathname === "/blogs" && (
              <div className="w-4 bg-[#a59719] h-1 absolute -left-5"></div>
            )}
            BLOG
          </Link>
        </div>
        <div
          onClick={() => window.open(shopifyLink, "_blank")}
          className={`font-extrabold duration-100 easy-out sm:text-2xl text-xs hover:opacity-25 transition-opacity cursor-pointer`}
        >
          STORE
        </div>
      </section>
    </aside>
  );
};

export default Aside;
