import React from 'react'
import Aside from '../components/Home/Aside'
import { useNavigate } from 'react-router-dom'

const About = () => {
  const navigate = useNavigate()

  return (
    <main className='w-full max-h-full px-5'>
      <section className='max-w-full sm:mt-20 mt-12 flex justify-between'>
        <Aside />
        <div className='sm:w-7/12 w-1/2 sm:pt-36 text-center font-extrabold sm:text-3xl text-xs pt-20'>
          Pulsar Records olarak 2020 yılında Ulas Çınar Çelik tarafından
          kurulmus bir plak sirketiyiz. Müzisyeninden tasarımcısına ve hatta
          blog yazarına kadar eglenceli, samimi ve profesyonel bir ekibiz.
          Kuruldugumuz günden itibaren yeni ya da eski, her türlü müzisyene
          destek veriyor ve is yapıyoruz. Müzige dair duygularını ya da
          fikirlerini bizimle paylasmak istersen bir tık kadar uzagındayız!
        </div>
        <div>
          <img
            onClick={() => navigate('/')}
            src='/PULSAR.png'
            alt='banner'
            className='w-32 cursor-pointer'
          />
        </div>
      </section>
    </main>
  )
}

export default About
