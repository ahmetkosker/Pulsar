
import React from 'react'
import Aside from '../components/Home/Aside'
import { useNavigate } from 'react-router-dom'
import { aboutTitle } from '../configs/simpleFunctions'
import Lottie from "lottie-react";
import wave from "../components/pulsaranimation.json";


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
      <Lottie animationData={wave} autoPlay className='w-screen absolute -z-50 mx-auto left-0 right-0 bottom-0' />
    </main>
  );
};

export default About;
