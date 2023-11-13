import axios from "axios";
import React, { useEffect, useState } from "react";
import LoadingComponent from "../../../components/LoadingComponent";

export default function ShowProjects({
  setSelectedProjectID,
  setSelectedProjectName,
  returnsetSelectedProjectForm,
  openModal,
  isHomePage,
  setProjectValue,
  projectValue
}) {
  const [projects, setProjects] = useState(null);

  const getSelectedProject = async (projectID) => {
    await axios
      .post("https://getprojectbyid-zkwsxnxtga-ew.a.run.app", {
        projectID: projectID,
      })
      .then((res) => returnsetSelectedProjectForm(res.data.result))
      .catch((err) => console.log(err));
  };

  const getProjects = async () => {
    axios
      .get("https://getallprojects-zkwsxnxtga-ew.a.run.app")
      .then((res) => setProjects(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getProjects();
  }, []);

  if (projects === null) {
    return <LoadingComponent />;
  }

  return (
    <div className="flex justify-start flex-wrap relative bottom-12 gap-y-12 w-5/6 sm:ml-36 ml-12 gap-x-12 sm:pt-36 text-center font-extrabold sm:text-xl text-xs pt-36 xl:pt-20 pr-12 xl:pr-0">
      {isHomePage !== undefined
        ? projects?.map((project) => {
            return (
              <div
                key={project.docID}
                className="flex flex-col items-center group"
              >
                <div className="group-hover:mb-0 transition-all ">
                  <img
                    src={project.docData.projectImage}
                    alt="artist"
                    className="w-36 h-36 xl:w-60 xl:h-60 rounded-t-3xl group-hover:translate-y-0.5 transition-all object-cover"
                  />
                </div>

                <div className="w-36 xl:w-60 xl:mt-5 mt-2 group-hover:mt-0 xl:pt-9 pt-2 group-hover:pt-9 xl:group-hover:pt-10 duration-500 text-[8px] xl:text-lg group-hover:h-40 xl:group-hover:h-60 overflow-hidden h-16 xl:h-32 bg-pulsar transition-opacity rounded-b-3xl text-white text-left px-3">
                  <div className="group-hover:translate-x-3 xl:group-hover:translate-x-4 group-hover:-translate-y-7 w-48 transition-all duration-500">
                    {project.docData.artistName} -{" "}
                    {project.docData.artistJobTitle}
                  </div>
                  <div className="group-hover:opacity-100 duration-500 opacity-0 -mt-2 ml-3 transition-all ease-in-out text-xs font-normal flex flex-col gap-y-1">
                    {project.docData?.features?.map((item) => {
                      return <div className="text-[10px]">{item}</div>;
                    })}
                  </div>
                </div>
              </div>
            );
          })
        : projects?.map((project) => {
            return (
              <div
                onClick={() => [
                  setSelectedProjectID(project.docID),
                  setSelectedProjectName(project.docData.artistName),
                  getSelectedProject(project.docID),
                  setProjectValue(project.docData.features),
                  openModal(),
                ]}
                key={project.docID}
                className="flex flex-col items-center group cursor-pointer"
              >
                <div className="group-hover:mb-0 transition-all ">
                  <img
                    src={project.docData.projectImage}
                    alt="artist"
                    className="w-36 h-36 xl:w-60 xl:h-60 rounded-t-3xl group-hover:translate-y-0.5 transition-all object-cover"
                  />
                </div>

                <div className="w-36 xl:w-60 xl:mt-5 mt-2 group-hover:mt-0 xl:pt-9 pt-2 group-hover:pt-9 xl:group-hover:pt-10 duration-500 text-[8px] xl:text-lg group-hover:h-40 xl:group-hover:h-60 overflow-hidden h-16 xl:h-32 bg-pulsar transition-opacity rounded-b-3xl text-white text-left px-3">
                  <div className="group-hover:translate-x-3 xl:group-hover:translate-x-4 group-hover:-translate-y-7 w-48 transition-all duration-500">
                    {project.docData.artistName} -{" "}
                    {project.docData.artistJobTitle}
                  </div>
                  <div className="group-hover:opacity-100 duration-500 opacity-0 -mt-2 ml-3 transition-all ease-in-out text-xs font-normal flex flex-col gap-y-1">
                    {project.docData?.features?.map((item) => {
                      return <div className="text-[10px]">{item}</div>;
                    })}
                  </div>
                </div>
              </div>
            );
          })}
    </div>
  );
}
