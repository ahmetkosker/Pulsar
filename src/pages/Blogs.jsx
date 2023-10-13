import React, { useState } from "react";
import Aside from "../components/Home/Aside";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { Pagination } from "@mui/material";

const Blogs = () => {
  const navigate = useNavigate();

  const [test, setTest] = useState("");

  const [allBlogs, setAllBlogs] = useState(null);

  const [page, setPage] = useState(1);

  const [blogs, setBlogs] = useState([]);

  const handleChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    axios
      .get("https://getallblogposts-zkwsxnxtga-ew.a.run.app")
      .then((res) => setAllBlogs(res.data));
  }, []);

  useEffect(() => {
    if (allBlogs) {
      const start = (page - 1) * 3;
      const end = start + 3;
      setBlogs(allBlogs.slice(start, end));
    }
  }, [page, allBlogs]);

  if (allBlogs === null)
    return (
      <main className="w-full h-screen flex justify-center items-center font-semibold text-2xl text-[#A59719]">
        Loading...
      </main>
    );

  return (
    <main className="w-full h-auto px-5 mb-24">
      <section className="max-w-full sm:mt-20 mt-12 flex justify-between">
        <Aside />
        <img
          className="absolute left-0 right-0 mx-auto w-1/3"
          src="/images/BG.png"
          alt="BG"
        />
        <div className="flex flex-col items-center relative right-10 gap-y-12 ml-3">
          {blogs.map((blog, index) => {
            return (
              <div
                className={`${
                  test === index
                    ? "scale-110 sm:h-80 h-54 sm:w-3/5 w-4/5 lg:h-96"
                    : "sm:h-32 h-20 sm:w-3/5 w-4/5"
                }  relative origin-bottom-right transition-all ease-in overflow-hidden bg-[#D9D9D9] opacity-80 py-2 px-2 sm:py-5 sm:px-7 rounded-2xl mt-2 flex flex-col ml-14 sm:ml-0`}
              >
                <div
                  className="flex items-center cursor-pointer"
                  onClick={() => setTest(index)}
                >
                  <img
                    src={blog.docData.blogPostImageURL}
                    alt="banner"
                    className={`rounded-2xl ${
                      test === index
                        ? "w-12 h-12 lg:w-16 lg:h-16 lg:mt-2 lg:ml-2 mt-3 ml-2 sm:w-24 sm:h-24 scale-125 sm:mt-6 sm:ml-5"
                        : "w-12 h-12 lg:w-16 lg:h-16 lg:mt-2 lg:ml-2 sm:w-24 sm:h-24"
                    } transition-all origin-bottom-right object-cover`}
                  />
                  <p
                    className={`font-bold sm:text-lg sm:ml-5 transition-all text-xs ml-2 ${
                      test === index
                        ? "opacity-100 sm:mt-1 lg:text-xs"
                        : "opacity-70 sm:mt-2 lg:text-xs"
                    }`}
                  >
                    {blog.docData.blogPostTitle}
                  </p>
                </div>
                <p
                  onClick={() => setTest(index)}
                  className={`font-bold sm:text-sm w-full sm:mt-2 mt-3 ml-0 sm:ml-5 self-end absolute transition-all text-[7px] ${
                    test === index
                      ? "sm:top-20 lg:text-xs sm:left-36 top-8 left-[72px] lg:left-[100px] lg:top-6"
                      : "sm:top-3/4 lg:text-xs sm:left-2/3 top-12 left-32"
                  }`}
                >
                  {blog.docData.blogPostAuthor}
                </p>
                {test === index && (
                  <img
                    onClick={() => setTest(-1)}
                    className="sm:w-5 absolute sm:right-8 sm:top-8 cursor-pointer w-3 right-2 top-2"
                    src="/Vector.png"
                    alt="Close"
                  />
                )}
                <div className="mt-8 font-bold sm:text-sm text-[6px] lg:text-[9px] 2xl:text-sm">
                  {blog.docData.blogPostContent}
                </div>
              </div>
            );
          })}
          <div className="ml-14 sm:ml-0">
            <Pagination
              page={page}
              onChange={handleChange}
              count={Math.ceil(allBlogs.length / 3)}
              color="secondary"
            />
          </div>
        </div>

        <div>
          <img
            onClick={() => navigate("/")}
            src="/pulsarMainLogo.png"
            alt="banner"
            className="w-64 cursor-pointer object-contain"
          />
        </div>
      </section>
    </main>
  );
};

export default Blogs;
