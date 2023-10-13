import React, { useEffect, useState } from "react";
import Aside from "../components/Home/Aside";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SpotifyPlayer from "react-spotify-player";
import { CSSTransition } from "react-transition-group";

const Artist = () => {
  const navigate = useNavigate();
  const [canScroll, setCanScroll] = useState(true);

  const size = {
    width: "90%",
    height: 200,
  };

  const view = "list"; // or 'coverart'
  const theme = "black"; // or 'white'

  const [artists, setArtists] = useState(null);

  const artistText = "< Back To Artists"
  const goBack = "< Back"

  useEffect(() => {
    axios
      .get("https://getartists-zkwsxnxtga-ew.a.run.app?page=2")
      .then((res) => setArtists(res.data))
      .catch((err) => console.log(err));
  }, []);

  const [user, setUser] = useState(null);
  const [trans, setTrans] = useState(false);

  const [page, setPage] = useState(1);

  const handleWheel = (event) => {
    if (canScroll) {
      if (event.deltaY < 0) {
        setPage(1);
      } else if (event.deltaY > 0) {
        setPage(2);
      }

      setCanScroll(false);

      setTimeout(() => {
        setCanScroll(true);
      }, 100);
    }
  };

  if (artists === null)
    return (
      <main className="w-full h-screen flex justify-center items-center font-semibold text-2xl text-[#A59719]">
        Loading...
      </main>
    );

  return (
    <main onWheel={handleWheel} className="w-full h-auto px-5 mb-24">
      <section className="max-w-full sm:mt-20 mt-12 flex justify-between">
        <Aside />
        <div className="flex justify-start flex-wrap w-full sm:ml-36 ml-12 gap-x-5 gap-y-10 sm:pt-36 text-center font-extrabold sm:text-xl text-xs pt-20">
          {user ? (
            <div>
              <CSSTransition
                in={page === 1}
                timeout={600}
                classNames="pagination"
                unmountOnExit
              >
                <section onWheel={handleWheel}>
                  <div
                    className={`${
                      trans && "scale-[1.8]"
                    } flex gap-x-12 items-center transition-all origin-top-left relative -top-32 right-24`}
                  >
                    <div className="mb-6">
                      <img
                        src={user.image}
                        alt="artist"
                        className="w-48 xl:w-[267px] h-48 xl:h-[267px] object-cover"
                      />
                    </div>
                    <button
                      className="absolute right-28 top-0 text-white bg-[#A59719] font-medium rounded-lg text-xs px-2 py-1 text-center mr-2 mb-2"
                      onClick={() => setUser(null)}
                    >
                      {artistText}
                    </button>

                    {trans && (
                      <div className="flex flex-col text-[10px] gap-y-10 text-[#A59719]">

                        <div className="text-left">
                          {user.role.toUpperCase()}:{" "}
                          {user.nameAndSurname.toUpperCase()}
                        </div>
                        <div className="text-black font-bold w-60 text-[9px] leading-[11px] text-justify">
                          {user.detail.toUpperCase()}
                        </div>
                      </div>
                    )}
                  </div>
                </section>
              </CSSTransition>
              <CSSTransition
                in={page === 2}
                timeout={600}
                classNames="pagination"
                unmountOnExit
              >
                <section className="flex justify-between flex-wrap gap-x-6 relative">

                  <button
                    className="absolute right-6 -top-24 text-white bg-[#A59719] font-medium rounded-lg text-sm px-3 py-2 text-center mr-2 mb-2"
                    onClick={() => setPage(1)}
                  >
                    {goBack}
                  </button>
                  {user.role === "Sound Engineer"
                    ? user.projects.map((project, index) => {
                        return (
                          <div key={index}>
                            <SpotifyPlayer
                              uri={project}
                              size={size}
                              view={view}
                              theme={theme}
                            />
                          </div>
                        );
                      })
                    : user.projects.map((project, index) => {
                        return (
                          <div key={index}>
                            <img
                              className="w-52 h-52 object-contain"
                              src={project}
                              alt="IMAGE"
                            />
                          </div>
                        );
                      })}
                </section>
              </CSSTransition>
            </div>
          ) : (
            <div className="max-sm:grid max-sm:grid-cols-2 max-sm:w-72 max-sm:absolute max-sm:right-10 lg:flex">
              {artists.map((artist) => {
                return (
                  <div
                    key={artist.id}
                    onClick={() => {
                      setUser(artist);
                      setTimeout(() => {
                        setTrans(true);
                      }, 1);
                    }}
                    className="flex flex-col items-center relative mx-2 top-32 xl:-top-32 h-auto cursor-pointer"
                  >
                    <div className="mb-6">
                      <img
                        src={artist.image}
                        alt="artist"
                        className="w-32 xl:w-[250px] h-32 xl:h-[267px] rounded-2xl object-cover"
                      />
                    </div>
                    <div className="hover:opacity-25 duration-200 easy-out transition-opacity">
                      <div>{artist.role}</div>
                      <div>{artist.nameAndSurname}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
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

export default Artist;
