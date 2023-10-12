import React from "react";
import Aside from "../components/Home/Aside";
import { useNavigate } from "react-router-dom";
import { aboutTitle } from "../configs/simpleFunctions";
import Footer from "../components/Footer/Footer";

const About = () => {
  const navigate = useNavigate();

  return (
    <main className="w-full max-h-full px-5">
      <section className="max-w-full sm:mt-20 mt-12 flex justify-between">
        <Aside />
        <div className="sm:w-7/12 w-1/2 sm:pt-36 text-center font-extrabold sm:text-3xl text-xs pt-20">
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
      <Footer />
    </main>
  );
};

export default About;
