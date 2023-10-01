import React from 'react'
import Aside from '../components/Home/Aside'
import Lottie from "lottie-react";
import wave from "../components/pulsaranimation.json";

const Home = () => {
  return (
    <main className='w-full h-full px-5'>
      <section className='max-w-full sm:mt-20 mt-12 flex justify-between'>
        <Aside />
        <div>
          <img src='/pulsarMainLogo.png' alt='banner' className=' w-32' />
        </div>
      </section>
      <div className='flex justify-center items-start w-full h-fit self-center'>
        <Lottie animationData={wave} autoPlay className='w-screen absolute -z-50 mx-auto left-0 right-0 bottom-0' />
      </div>
    </main>
  )
}

export default Home
