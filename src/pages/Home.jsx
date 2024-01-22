import Footer from "../components/Footer/Footer";
import React, { useEffect } from "react";
import Aside from "../components/Home/Aside";
import Lottie from "lottie-react";
import wave from "../components/pulsaranimation.json";
import { getAboutTitle } from "../configs/simpleFunctions";

const Home = () => {

  useEffect(() => { getAboutTitle() }, [])

  return (
    <main className="w-screen h-screen overflow-hidden px-5">
      <section className="max-w-full sm:mt-20 mt-12 flex justify-between">
        <Aside />
        <div>
          <img src="/pulsarMainLogo.png" alt="banner" className="w-32 sm:w-64" />
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

export default Home;
