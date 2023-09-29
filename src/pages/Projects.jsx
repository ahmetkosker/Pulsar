import React, { useState } from "react";
import Aside from "../components/Home/Aside";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

const Projects = () => {
  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios
      .get("https://getallprojects-zkwsxnxtga-ew.a.run.app")
      .then((res) => setProjects(res.data));
  }, []);

  const [user, setUser] = useState(null);
  console.log(projects);
  return (
    <main className="w-full h-auto px-5">
      <section className="max-w-full sm:mt-20 mt-12 flex justify-between">
        <Aside />
        <div className="flex justify-start flex-wrap w-full sm:ml-36 ml-12 gap-x-5 sm:pt-36 text-center font-extrabold sm:text-xl text-xs pt-20">
          {user
            ? ""
            : projects.map((project) => {
                return (
                  <div
                    key={project.id}
                    className="flex flex-col items-center group absolute top-48"
                  >
                    <div className="group-hover:mb-0 transition-all ">
                      <img
                        src={project.image}
                        alt="artist"
                        className="w-60 h-60 group-hover:translate-y-0.5 transition-all "
                      />
                    </div>

                    <div className="w-60 mt-5 group-hover:mt-0 pt-9 group-hover:pt-10 duration-500 text-lg group-hover:h-60 overflow-hidden h-32 bg-[#A59719] transition-opacity rounded-b-3xl text-white text-left px-3">
                      <div className="group-hover:translate-x-4 group-hover:-translate-y-7 w-48 transition-all duration-500">
                        {project.title.toUpperCase()}
                      </div>
                      <div className="group-hover:opacity-100 duration-500 opacity-0 -mt-2 ml-4 transition-all ease-in-out text-xs font-normal flex flex-col gap-y-1">
                        <div>PRODÜKTÖR: {project.prod.toLocaleUpperCase()}</div>
                        <div>SÖZ: {project.soz.toLocaleUpperCase()}</div>
                        <div>GİTAR: {project.gitar.toLocaleUpperCase()}</div>
                        <div>DAVUL: {project.davul.toLocaleUpperCase()}</div>
                        <div>MIX: {project.mix.toLocaleUpperCase()}</div>
                        <div>
                          MASTERING: {project.mastering.toLocaleUpperCase()}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
        </div>
        <div>
          <img
            onClick={() => navigate("/")}
            src="/PULSAR.png"
            alt="banner"
            className="w-44 cursor-pointer"
          />
        </div>
      </section>
    </main>
  );
};

export default Projects;
