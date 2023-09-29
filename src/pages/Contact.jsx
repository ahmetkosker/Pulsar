import React, { useState } from 'react'
import Aside from '../components/Home/Aside'
import { useNavigate } from 'react-router-dom'
import { CheckboxImage } from '../components/UserCheckBoxes'

const Artist = () => {
  const navigate = useNavigate()

  const [selectedImages, setSelectedImages] = useState([])

  const handleImageToggle = (imageUrl, isChecked) => {
    if (isChecked) {
      setSelectedImages([...selectedImages, imageUrl])
    } else {
      setSelectedImages(selectedImages.filter(image => image !== imageUrl))
    }
  }

  const images = [
    '/images/egemen.png',
    '/images/egemen.png',
    '/images/egemen.png',
    '/images/egemen.png'
  ]

  return (
    <main className='w-full h-auto px-5 mb-24'>
      <section className='max-w-full sm:mt-20 mt-12 flex justify-between'>
        <Aside />
        <div className='mt-16'>
          <form>
            <div className='flex flex-col text-[27.824px] text-black font-normal gap-y-3 '>
              <label>MAIL:</label>
              <input
                type='text'
                className='w-[684px] bg-[#D9D9D9] h-[57.966px] outline-none rounded-xl'
              />
            </div>
            <div className='mt-3 flex flex-col text-[27.824px] text-black font-normal gap-y-3 '>
              <label>KONU:</label>
              <textarea
                type='text'
                className='w-[684px] bg-[#D9D9D9] h-[198.244px] outline-none rounded-xl'
              />
            </div>
            <div className='mt-3 flex flex-col text-[27.824px] text-black font-normal gap-y-3 '>
              <label>PROJEMDE BULUNMASINI İSTEDİĞİM SANATÇILAR:</label>
              <div className='flex justify-around w-full '>
                {images.map((imageUrl, index) => (
                  <CheckboxImage
                    key={index}
                    imageUrl={imageUrl}
                    onToggle={handleImageToggle}
                  />
                ))}
              </div>
              <div className='flex justify-between mx-9 mt-12'>
                <img src='/images/leftArrow.png' alt='Left' />
                <img src='/images/rightArrow.png' alt='right' />
              </div>
              <div className='flex justify-end items-center mt-4 float-right'>
                <div className='font-semibold cursor-pointer hover:opacity-50 transition-all'>
                  GÖNDER
                </div>
                <img src='/images/send.png' alt='Send' className='w-7 h-7' />
              </div>
            </div>
          </form>
        </div>
        <div className='flex flex-col gap-y-5 mt-20 '>
          <img
            onClick={() => navigate('/')}
            src='/PULSAR.png'
            alt='banner'
            className='3xl:w-96 cursor-pointer w-60'
          />

          <div className='3xl:w-96 3xl:text-3xl w-60 text-xl font-bold'>
            +90 <span className='text-[#A59719]'>545</span> 312 60 30
          </div>
        </div>
      </section>
    </main>
  )
}

export default Artist
