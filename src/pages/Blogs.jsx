import React, { useState } from "react";
import Aside from "../components/Home/Aside";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

const Blogs = () => {
  const navigate = useNavigate();

  const [test, setTest] = useState("");

  const [blogs, setBlogs] = useState(null);

  useEffect(() => {
    axios
      .get("https://getallblogposts-zkwsxnxtga-ew.a.run.app")
      .then((res) => setBlogs(res.data));
  }, []);
  console.log(test);


  if (blogs === null) return (
    <main className="w-full h-screen flex justify-center items-center font-semibold text-2xl text-[#A59719]">
      Loading...
    </main>
  )

  return (
    <main className="w-full h-auto px-5 mb-24">
      <section className="max-w-full sm:mt-20 mt-12 flex justify-between">
        <Aside />
        <img
          className="absolute left-0 right-0 mx-auto w-1/3"
          src="/images/BG.png"
          alt="BG"
        />
        <div className="flex flex-col items-center relative right-10 gap-y-12">
          {blogs.map((blog, index) => {
            return (
              <div
                className={`${test === index ? "scale-110 h-96 w-2/5" : "h-44 w-2/5"
                  }  relative origin-bottom-right transition-all ease-in overflow-hidden bg-[#D9D9D9] opacity-80 py-5 px-7 rounded-2xl mt-2 flex flex-col`}
              >
                <div className="flex cursor-pointer" onClick={() => setTest(index)}>
                  <img
                    src={blog.docData.blogPostImageURL}
                    alt="banner"
                    className={`rounded-2xl ${test === index
                        ? "w-32 h-32 scale-125 mt-6 ml-5"
                        : "w-32 h-32"
                      } transition-all origin-bottom-right object-cover`}
                  />
                  <p
                    className={`font-bold text-lg- ml-5 transition-all ${test === index ? "opacity-100 mt-12" : "opacity-70 mt-4"
                      }`}
                  >
                    {blog.docData.blogPostTitle}
                  </p>
                </div>
                <p
                  onClick={() => setTest(index)}
                  className={`font-bold text-sm w-full mt-2 ml-5 self-end absolute transition-all  ${test === index ? "top-20 left-44" : "top-3/4 left-2/3"
                    }`}
                >
                  {blog.docData.blogPostAuthor}
                </p>
                {test === index && (
                  <img
                    onClick={() => setTest(-1)}
                    className="w-5 absolute right-8 top-8 cursor-pointer"
                    src="/Vector.png"
                    alt="Close"
                  />
                )}
                <div className="mt-8 font-bold text-xs">
                  {blog.docData.blogPostContent}
                </div>
              </div>
            );
          })}
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
