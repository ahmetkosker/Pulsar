import React from "react";
import Aside from "../components/Home/Aside";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import wave from "../components/pulsaranimation.json";
import Footer from "../components/Footer/Footer";
import { aboutTitle } from "../configs/simpleFunctions";

const About = () => {
  const navigate = useNavigate();

  return (
    <main className="w-full max-h-full px-5">
      <section className="max-w-full sm:mt-20 mt-12 flex justify-between">
        <Aside />
        <div className="sm:w-7/12 w-1/2 sm:pt-24 text-center font-extrabold sm:text-3xl text-sm pt-4 absolute top-1/3 left-0 right-0 mx-auto sm:relative lg:-top-32 2xl:-top-20">
          {aboutTitle}
        </div>
        <div>
          <img
            onClick={() => navigate("/")}
            src="/pulsarMainLogo.png"
            alt="banner"
            className="w-32 cursor-pointer"
          />
        </div>
      </section>
      <div className="flex justify-center items-start w-full h-fit self-center">
        <Lottie
          animationData={wave}
          autoPlay
          className="w-screen absolute -z-50 mx-auto left-0 right-0 bottom-5 sm:bottom-0"
        />
      </div>
      <Footer />
    </main>
  );
};

export default About;
