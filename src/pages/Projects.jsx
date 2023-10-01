import React, { useState } from "react";
import Aside from "../components/Home/Aside";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

const Projects = () => {
  const navigate = useNavigate();

  const [projects, setProjects] = useState(null);

  useEffect(() => {
    axios
      .get("https://getallprojects-zkwsxnxtga-ew.a.run.app")
      .then((res) => setProjects(res.data));
  }, []);

  if (projects === null) return (
    <main className="w-full h-screen flex justify-center items-center font-semibold text-2xl text-[#A59719]">
      Loading...
    </main>
  )

  return (
    <main className="w-full h-auto px-5">
      <section className="max-w-full sm:mt-20 mt-12 flex justify-between">
        <Aside />
        <div className="flex justify-start flex-wrap relative bottom-36 gap-y-12 w-full sm:ml-36 ml-12 gap-x-5 sm:pt-36 text-center font-extrabold sm:text-xl text-xs pt-20">
          {projects?.map((project) => {
            return (
              <div
                key={project.docID}
                className="flex flex-col items-center group"
              >
                <div className="group-hover:mb-0 transition-all ">
                  <img
                    src={project.docData.projectImage}
                    alt="artist"
                    className="w-60 h-60 rounded-t-3xl group-hover:translate-y-0.5 transition-all object-cover"
                  />
                </div>

                <div className="w-60 mt-5 group-hover:mt-0 pt-9 group-hover:pt-10 duration-500 text-lg group-hover:h-60 overflow-hidden h-32 bg-[#A59719] transition-opacity rounded-b-3xl text-white text-left px-3">
                  <div className="group-hover:translate-x-4 group-hover:-translate-y-7 w-48 transition-all duration-500">
                    {project.docData.artistJobTitle}
                  </div>
                  <div className="group-hover:opacity-100 duration-500 opacity-0 -mt-2 ml-4 transition-all ease-in-out text-xs font-normal flex flex-col gap-y-1">
                    <div>PRODÜKTÖR: {project.docData.producerName}</div>
                    <div>SÖZ: {project.docData.lyricsName}</div>
                    <div>GİTAR: {project.docData.guitaristName}</div>
                    <div>DAVUL: {project.docData.drummerName}</div>
                    <div>MIX: {project.docData.mixerName}</div>
                    <div>MASTERING: {project.docData.masteringName}</div>
                  </div>
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
            className="w-44 cursor-pointer"
          />
        </div>
      </section>
    </main>
  );
};

export default Projects;
