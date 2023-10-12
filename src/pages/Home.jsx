import React from "react";
import Aside from "../components/Home/Aside";
import Footer from "../components/Footer/Footer";

const Home = () => {
  return (
    <main className="w-full h-full px-5">
      <section className="max-w-full sm:mt-20 mt-12 flex justify-between">
        <Aside />
        <div>
          <img src="/pulsarMainLogo.png" alt="banner" className=" w-32" />
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default Home;
