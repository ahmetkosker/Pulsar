import axios from 'axios'
import React, { useEffect, useState } from 'react'
import LoadingComponent from '../../../components/LoadingComponent'

export default function ShowArtists({
    selectedArtistID,
    setSelectedArtistID,
    selectedArtistName,
    setSelectedArtistName,
    openModal,
    closeModal,
    returnselectedArtistForm,
    returnsetSelectedArtistForm,
    isHomePage,
    setProjectValue,
    projectValue
}) {
    const [artists, setArtists] = useState(null)

    const getSelectedArtist = async (artistID) => {
        await axios.post('https://getartistbyid-zkwsxnxtga-ew.a.run.app', {
            artistID: artistID
        })
            .then((res) => returnsetSelectedArtistForm(res.data.result))
            .catch((err) => console.log(err))
    };

    const getAllArtists = async () => {
        try {
            const response = await axios.get('https://getartists-zkwsxnxtga-ew.a.run.app')
            setArtists(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getAllArtists()
    }, [])

    if (artists === null) {
        return <LoadingComponent />
    }

    return (
        <div className='grid grid-cols-4 mt-48'>
            {isHomePage !== undefined
                ?
                artists.map((artist) => {
                    return <div
                        key={artist.docID}
                        className="flex flex-col items-center relative mx-2 mt-8 top-36 sm:-top-32 h-auto"
                    >
                        <div className="mb-6">
                            <img
                                src={artist.docData.image}
                                alt="artist"
                                className="w-32 xl:w-[250px] h-32 xl:h-[267px] rounded-2xl object-cover"
                            />
                        </div>
                        <div className="hover:opacity-25 duration-200 easy-out transition-opacity">
                            <div className="text-xs lg:text-lg xl:text-xl">
                                {artist.docData.role}
                            </div>
                            <div className="text-xs lg:text-lg xl:text-xl">
                                {artist.docData.nameAndSurname}
                            </div>
                        </div>
                    </div>
                })
                : artists.map((artist) => {
                    return <div
                        onClick={() => [
                            setSelectedArtistID(artist.docID),
                            setSelectedArtistName(artist.docData.nameAndSurname),
                            getSelectedArtist(artist.docID),
                            setProjectValue(artist.docData.projects),
                            openModal(),
                        ]}
                        key={artist.docID}
                        className="flex flex-col items-center relative mx-2 mt-8 top-36 sm:-top-32 h-auto cursor-pointer "
                    >
                        <div className="mb-6">
                            <img
                                src={artist.docData.image}
                                alt="artist"
                                className="w-32 xl:w-[250px] h-32 xl:h-[267px] rounded-2xl object-cover"
                            />
                        </div>
                        <div className="hover:opacity-25 duration-200 easy-out transition-opacity">
                            <div className="text-xs lg:text-lg xl:text-xl">
                                {artist.docData.role}
                            </div>
                            <div className="text-xs lg:text-lg xl:text-xl">
                                {artist.docData.nameAndSurname}
                            </div>
                        </div>
                    </div>
                })
            }

        </div>
    )
}
