import React, { useState } from 'react'
import ShowArtists from './ShowArtists'
import DeleteModal from './DeleteModal'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import PanelNavbar from '../../../components/PanelNavigation/PanelNavbar'
import Lottie from 'lottie-react'

export default function DeleteArtists() {
    const [selectedArtistID, setSelectedArtistID] = useState(null)
    const [selectedArtistName, setSelectedArtistName] = useState(null)
    const [isModalOpen, setModalOpen] = useState(false);
    const [loading, setLoading] = useState(false)

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const deleteArtist = async () => {
        setLoading(true)
        axios.post('https://deleteartist-zkwsxnxtga-ew.a.run.app', {
            artistID: selectedArtistID
        })
            .then((res) => {
                console.log(res)
                setLoading(false)
                closeModal()
                toast.success("Artist deleted successfully")
                setTimeout(() => window.location.reload(), 2000)
            })
            .catch((err) => toast.error(err))
    };


    return (
        <>
            <ToastContainer />
            <PanelNavbar
                pageTitle={'Delete Artist'}
                goBackTitle={'Go Back'}
                goBackFunction={'/manage-artists'}
            />
            <div className='flex justify-center items-center flex-col mt-8'>
                <h1 className='text-4xl font-light text-black mx-4 my-4'>Delete an Artist</h1>
                <p className='text-2xl font-light text-black mx-4 my-4'>Click on the artist you want to delete</p>
                <DeleteModal
                    show={isModalOpen}
                    onClose={closeModal}>
                    <div className='py-4 px-4'>
                        <h2 className="text-lg font-semibold mb-4">Delete Artist</h2>
                        <p>Are you sure want to delete this artist: <b>{selectedArtistName}</b></p>
                        {loading
                            ? <div className="mt-10 w-24 h-10 rounded-xl flex justify-center items-center bg-blue-700">
                                <Lottie
                                    className="w-32 h-32 object-contain"
                                    animationData={require("../../../components/loadingAnimation.json")} />
                            </div>
                            :
                            <div className="flex justify-around items-center mt-8">
                                < button
                                    onClick={deleteArtist}
                                    className="bg-green-500 text-white px-4 py-2 mt-4 mr-4 w-32 rounded-xl">Yes</button>
                                <button
                                    onClick={closeModal}
                                    className="bg-red-500 text-white px-4 py-2 mt-4 w-32 rounded-xl">No</button>
                            </div>
                        }
                    </div>
                </DeleteModal >
                <ShowArtists
                    openModal={openModal}
                    selectedArtistName={selectedArtistName}
                    setSelectedArtistName={setSelectedArtistName}
                    selectedArtistID={selectedArtistID}
                    setSelectedArtistID={setSelectedArtistID}
                />
            </div >
        </>
    )
}
