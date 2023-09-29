import React, { useState } from 'react'
import Aside from '../components/Home/Aside'
import { useNavigate } from 'react-router-dom'

const Artist = () => {
  const navigate = useNavigate()
  const artists = [
    {
      id: 1,
      image: '/images/egemen.jpg',
      job: 'Sound Engineer',
      name: 'Egemen İnanlı',
      detail:
        'Egemen ınanlı 22 Eylül 2000’de Ankara’da dogdu. Çocuklugunda müzige karsı çok hevesli olan İnanlı 13 yasında bas gitar çalmaya basladı ve Stüdyo Ankanom’da ufak islere yardımcı oldu. 15 yasında stüdyo sorumlusu olarak Stüdyo Ankanom’da tam zamanlı çalısmaya basladı. 17 yasında müzik teknolojilerine olan ilgisini kesfetti ve bu alana dogru yöneldi. 2020-2021 yılları arasında Mars Yapım’da kayıt operatörü ve mix asistanlıgı yaptı. Kemal Çalıkoglu’nun Aga filmi için yaptıgı ödüllü bestelerin kayıt operatörlügünü yaptı.  2023 Ocak ayında Pulsar Records’a ses ve mix mühendisi olarak katıldı.'
    },
    {
      id: 2,
      image: '/images/egemen.jpg',
      job: 'Visual Artist',
      name: 'Doğukan Şimşek',
      detail:
        'Egemen ınanlı 22 Eylül 2000’de Ankara’da dogdu. Çocuklugunda müzige karsı çok hevesli olan İnanlı 13 yasında bas gitar çalmaya basladı ve Stüdyo Ankanom’da ufak islere yardımcı oldu. 15 yasında stüdyo sorumlusu olarak Stüdyo Ankanom’da tam zamanlı çalısmaya basladı. 17 yasında müzik teknolojilerine olan ilgisini kesfetti ve bu alana dogru yöneldi. 2020-2021 yılları arasında Mars Yapım’da kayıt operatörü ve mix asistanlıgı yaptı. Kemal Çalıkoglu’nun Aga filmi için yaptıgı ödüllü bestelerin kayıt operatörlügünü yaptı.  2023 Ocak ayında Pulsar Records’a ses ve mix mühendisi olarak katıldı.'
    },
    {
      id: 3,
      image: '/images/egemen.jpg',
      job: 'Visual Artist',
      name: 'Doğukan Şimşek',
      detail:
        'Egemen ınanlı 22 Eylül 2000’de Ankara’da dogdu. Çocuklugunda müzige karsı çok hevesli olan İnanlı 13 yasında bas gitar çalmaya basladı ve Stüdyo Ankanom’da ufak islere yardımcı oldu. 15 yasında stüdyo sorumlusu olarak Stüdyo Ankanom’da tam zamanlı çalısmaya basladı. 17 yasında müzik teknolojilerine olan ilgisini kesfetti ve bu alana dogru yöneldi. 2020-2021 yılları arasında Mars Yapım’da kayıt operatörü ve mix asistanlıgı yaptı. Kemal Çalıkoglu’nun Aga filmi için yaptıgı ödüllü bestelerin kayıt operatörlügünü yaptı.  2023 Ocak ayında Pulsar Records’a ses ve mix mühendisi olarak katıldı.'
    }
  ]

  const [user, setUser] = useState(null)
  const [trans, setTrans] = useState(false)

  return (
    <main className='w-full h-auto px-5 mb-24'>
      <section className='max-w-full sm:mt-20 mt-12 flex justify-between'>
        <Aside />
        <div className='flex justify-start flex-wrap w-full sm:ml-36 ml-12 gap-x-5 gap-y-10 sm:pt-36 text-center font-extrabold sm:text-xl text-xs pt-20'>
          {user ? (
            <section>
              <div
                className={`${
                  trans && 'scale-[1.8]'
                } flex items-center transition-all origin-top-left relative -top-32 right-24`}
              >
                <div className='mb-6'>
                  <img src={user.image} alt='artist' className='w-72' />
                </div>

                {trans && (
                  <div className='flex flex-col text-[10px] gap-y-10 text-[#A59719] '>
                    <div className='text-left'>
                      {user.job.toUpperCase()}: {user.name.toUpperCase()}
                    </div>
                    <div className='text-black font-bold w-60 text-[9px] leading-[11px] text-justify'>
                      {user.detail.toUpperCase()}
                    </div>
                  </div>
                )}
              </div>
            </section>
          ) : (
            artists.map(artist => {
              return (
                <div
                  key={artist.id}
                  className='flex flex-col items-center relative -top-32 right-24'
                >
                  <div className='mb-6'>
                    <img src={artist.image} alt='artist' className='w-64' />
                  </div>

                  <div
                    onClick={() => {
                      setUser(artist)
                      setTimeout(() => {
                        setTrans(true)
                      }, 1)
                    }}
                    className='hover:opacity-25 duration-200 easy-out transition-opacity cursor-pointer'
                  >
                    <div>{artist.job.toUpperCase()}</div>
                    <div>{artist.name.toUpperCase()}</div>
                  </div>
                </div>
              )
            })
          )}
        </div>
        <div>
          <img
            onClick={() => navigate('/')}
            src='/PULSAR.png'
            alt='banner'
            className='w-44 cursor-pointer'
          />
        </div>
      </section>
    </main>
  )
}

export default Artist
