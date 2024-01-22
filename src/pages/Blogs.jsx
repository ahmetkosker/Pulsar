import React, { useState } from "react";
import Aside from "../components/Home/Aside";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import LoadingComponent from "../components/LoadingComponent";

const CHUNKSIZE = 800;

const Blogs = () => {
  const navigate = useNavigate();

  const [test, setTest] = useState("");

  const [allBlogs, setAllBlogs] = useState(null);

  const GetPages = ({ data }) => {
    const pages = Math.ceil(data.length / CHUNKSIZE);
    const [pageData, setPageData] = useState(data.slice(0, CHUNKSIZE));
    const [pageN, setPageN] = useState(1);

    return (
      <div>
        <div className="h-24 lg:h-44 xl:h-44">{pageData}</div>
        <div className="flex gap-x-0.5 lg:gap-x-2 justify-center mt-12">
          {Array.from({ length: pages }, (_, i) => i + 1).map((page) => {
            return (
              <div
                className={`${
                  page === pageN
                    ? "bg-purple-500 scale-125"
                    : "bg-pulsar scale-100"
                } p-1 rounded-full w-2 h-2 lg:w-5 lg:h-5 flex justify-center items-center text-white text-[4px] lg:text-xs cursor-pointer hover:opacity-50 transition-all`}
                onClick={() => {
                  setPageData(
                    data.slice((page - 1) * CHUNKSIZE, page * CHUNKSIZE)
                  );
                  setPageN(page);
                }}
              >
                {page}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  useEffect(() => {
    axios
      .get("https://getallblogposts-zkwsxnxtga-ew.a.run.app")
      .then((res) => setAllBlogs(res.data));
  }, []);

  if (allBlogs === null) return <LoadingComponent />;

  return (
    <main className="w-screen h-auto px-5 mb-24 overflow-x-hidden">
      <section className="w-screen sm:mt-20 mt-12 flex justify-between">
        <Aside />
        <img
          className="absolute left-0 right-0 mx-auto w-1/3"
          src="/images/BG.png"
          alt="BG"
        />
        <div className="flex flex-col w-full items-center relative sm:right-10 right-20 gap-y-5 xl:gap-y-7 2xl:gap-y-12 ml-3">
          {allBlogs.map((blog, index) => {
            return (
              <div
                className={`${
                  test === index
                    ? "scale-110 sm:h-80 h-64 sm:w-3/5 w-3/5 lg:h-96 mt-4"
                    : "sm:h-32 h-20 sm:w-3/5 w-3/5"
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
                    className={`font-bold sm:text-lg sm:ml-5 transition-all text-[5px] ml-2 ${
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
                  className={`font-bold sm:text-sm w-full sm:mt-2 mt-3 ml-0 sm:ml-5 self-end absolute transition-all text-[5px] ${
                    test === index
                      ? "sm:top-20 lg:text-sm sm:left-36 top-10 left-[72px] lg:left-[100px] lg:top-6"
                      : "sm:top-3/4 lg:text-sm sm:left-2/3 top-12 left-36"
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
                <div className="mt-6 lg:mt-9 font-bold sm:text-sm text-[4.5px] lg:text-[9px] 2xl:text-sm">
                  <GetPages data={blog.docData.blogPostContent} />
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
            className="w-32 cursor-pointer object-contain"
          />
        </div>
      </section>
    </main>
  );
};

export default Blogs;
