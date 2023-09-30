import React, { useEffect, useState } from "react";
import Aside from "../components/Home/Aside";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SpotifyPlayer from "react-spotify-player";

const Artist = () => {
  const navigate = useNavigate();
  const [canScroll, setCanScroll] = useState(true);

  const size = {
    width: "100%",
    height: 200,
  };

  const view = "list"; // or 'coverart'
  const theme = "black"; // or 'white'

  const [artists, setArtists] = useState([]);

  useEffect(() => {
    axios
      .get("https://getartists-zkwsxnxtga-ew.a.run.app")
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

  return (
    <main className="w-full h-auto px-5 mb-24">
      <section className="max-w-full sm:mt-20 mt-12 flex justify-between">
        <Aside />
        <div className="flex justify-start flex-wrap w-full sm:ml-36 ml-12 gap-x-5 gap-y-10 sm:pt-36 text-center font-extrabold sm:text-xl text-xs pt-20">
          {user ? (
            page === 1 ? (
              <section>
                <div
                  className={`${
                    trans && "scale-[1.8]"
                  } flex gap-x-12 items-center transition-all origin-top-left relative -top-32 right-24`}
                >
                  <div className="mb-6">
                    <img
                      src={user.docData.image}
                      alt="artist"
                      className="w-[267px] h-[267px] object-cover"
                    />
                  </div>

                  {trans && (
                    <div
                      className="flex flex-col text-[10px] gap-y-10 text-[#A59719] "
                      onWheel={handleWheel}
                    >
                      <div className="text-left">
                        {user.docData.role.toUpperCase()}:
                        {user.docData.nameAndSurname.toUpperCase()}
                      </div>
                      <div className="text-black font-bold w-60 text-[9px] leading-[11px] text-justify">
                        {user.docData.detail.toUpperCase()}
                      </div>
                    </div>
                  )}
                </div>
              </section>
            ) : page === 2 ? (
              <section
                className="flex justify-between flex-wrap gap-x-6"
                onWheel={handleWheel}
              >
                {user.docData.role === "Sound Engineer"
                  ? user.docData.projects.map((project, index) => {
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
                  : user.docData.projects.map((project, index) => {
                      return (
                        <div key={index}>
                          <img
                            className="w-52 h-52 object-cover"
                            src={project}
                            alt="IMAGE"
                          />
                        </div>
                      );
                    })}
              </section>
            ) : (
              ""
            )
          ) : (
            artists.map((artist) => {
              return (
                <div
                  key={artist.docData.id}
                  className="flex flex-col items-center relative -top-32 right-24 h-auto"
                >
                  <div className="mb-6">
                    <img
                      src={artist.docData.image}
                      alt="artist"
                      className="w-[267px] h-[267px] object-cover"
                    />
                  </div>

                  <div
                    onClick={() => {
                      setUser(artist);
                      setTimeout(() => {
                        setTrans(true);
                      }, 1);
                    }}
                    className="hover:opacity-25 duration-200 easy-out transition-opacity cursor-pointer"
                  >
                    <div>{artist.docData.role}</div>
                    <div>{artist.docData.nameAndSurname}</div>
                  </div>
                </div>
              );
            })
          )}
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

export default Artist;
