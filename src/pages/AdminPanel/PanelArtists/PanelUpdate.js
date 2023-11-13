import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import PanelNavbar from '../../../components/PanelNavigation/PanelNavbar'
import ShowArtists from './ShowArtists'
import UpdateModal from './UpdateModal'
import LoadingComponent from '../../../components/LoadingComponent'
import axios from 'axios'
import Lottie from 'lottie-react'
import trash from '../../../components/trashicon.png'

export default function PanelUpdate() {
    const [selectedArtistID, setSelectedArtistID] = useState(null)
    const [selectedArtistName, setSelectedArtistName] = useState(null)
    const [returnSelectedArtistForm, returnSetSelectedArtistForm] = useState(null)
    const [loading, setLoading] = useState(false)
    const [isModalOpen, setModalOpen] = useState(false)
    const [projectValue, setProjectValue] = useState([])
    const [newValueRender, setNewValueRender] = useState(false)
    const [valueToArray, setValueToArray] = useState(null)

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const updateFunction = async () => {
        setLoading(true)
        axios.post('https://updateartist-zkwsxnxtga-ew.a.run.app', {
            artistID: selectedArtistID,
            nameAndSurname: returnSelectedArtistForm.nameAndSurname,
            detail: returnSelectedArtistForm.detail,
            image: returnSelectedArtistForm.image,
            detail: returnSelectedArtistForm.detail,
            role: returnSelectedArtistForm.role,
            projects: projectValue
        })
            .then((res) => {
                console.log(res)
                setLoading(false)
                closeModal()
                toast.success("Artist updated successfully")
                setTimeout(() => window.location.reload(), 2000)
            })
            .catch((err) => console.log(err))
    };

    const filterProject = (project) => {
        const filteredProject = projectValue.filter((item) => item !== project)
        setProjectValue(filteredProject)
    };

    const pushProject = (project) => {
        const newProject = [...projectValue, project]
        setProjectValue(newProject)
        setNewValueRender(false)
        setValueToArray(null)
    };


    return (
        <>
            <ToastContainer />
            <PanelNavbar
                pageTitle={'Update Artist'}
                goBackTitle={'Go Back'}
                goBackFunction={'/manage-artists'}
            />
            <div className='flex justify-center items-center flex-col mt-8'>
                <h1 className='text-4xl font-light text-black mx-4 my-4'>Update an Artist</h1>
                <p className='text-2xl font-light text-black mx-4 my-4'>Click on the artist you want to update</p>
                <UpdateModal
                    show={isModalOpen}
                    onClose={closeModal}
                    selectedArtistID={selectedArtistID}
                >
                    {returnSelectedArtistForm === null
                        ? <LoadingComponent />
                        :
                        <div className='flex justify-start items-center flex-col w-full h-screen relative top-8 overflow-scroll pb-16 px-4'>
                            <h2 className="text-2xl font-semibold mb-8">Update Artist</h2>
                            <div className='flex justify-center items-center flex-row'>
                                <p className='font-light text-xl'>Fullname: </p>
                                <input
                                    value={returnSelectedArtistForm.nameAndSurname}
                                    onChange={(e) => returnSetSelectedArtistForm({ ...returnSelectedArtistForm, nameAndSurname: e.target.value })}
                                    type='text'
                                    placeholder={"Artist Name"}
                                    className='border-2 border-black rounded-lg mx-4 w-96 py-2 px-2' />
                            </div>
                            <div className='flex justify-center items-center flex-row w-full mt-4'>
                                <p className='font-light text-xl'>Details: </p>
                                <textarea
                                    id="details"
                                    value={returnSelectedArtistForm.detail}
                                    onChange={(e) => returnSetSelectedArtistForm({ ...returnSelectedArtistForm, detail: e.target.value })}
                                    type='text'
                                    placeholder={"Artist Details"}
                                    className='border-2 border-black rounded-lg mx-4 w-96 h-64 py-2 px-2 relative left-3' />
                            </div>
                            {projectValue.map((project, index) => {
                                return <div className='flex justify-center items-center flex-row mt-4'>
                                    <p className='font-light text-xl mr-4'>Project {index + 1}: </p>
                                    <div className='flex justify-center items-center py-4 px-4 w-fit h-16 rounded-lg bg-slate-200'>
                                        <p className='text-justify'>{project}</p>
                                    </div>
                                    <img
                                        className='w-16 h-10 object-contain cursor-pointer '
                                        src={trash}
                                        onClick={() => filterProject(project)}
                                    />
                                </div>
                            })}

                            {newValueRender === true
                                ?
                                <div className='flex justify-center items-center flex-col'>
                                    <div className='flex justify-center items-center flex-row my-24 relative right-2'>
                                        <p className='font-light text-xl relative right-1'>New Project: </p>
                                        <input
                                            value={valueToArray}
                                            onChange={(e) => setValueToArray(e.target.value)}
                                            className='border-2 border-black rounded-lg w-96 py-2 px-2'
                                        />
                                    </div>
                                    <div onClick={() => pushProject(valueToArray)} className='cursor-pointer flex justify-center items-center border-x-2 border-y-2 relative bottom-16 py-2 px-8 rounded-xl border-[#a59719]'>
                                        <p className='text-xl text-[#a59719] relative'>Add</p>
                                    </div>
                                </div>
                                : <div onClick={() => setNewValueRender(true)} className='flex items-center justify-center flex-row w-96 my-16 cursor-pointer rounded-xl border-[#a59719] border-x-2 border-y-2'>
                                    <p className='font-semibold text-[#a59719] text-2xl'>+</p>
                                    <p className='ml-4'>Add New Project to Artist</p>
                                </div>
                            }
                            {loading
                                ? <div className="mt-10 w-24 h-10 rounded-xl flex justify-center items-center bg-blue-700">
                                    <Lottie
                                        className="w-32 h-32 object-contain"
                                        animationData={require("../../../components/loadingAnimation.json")} />
                                </div>
                                : <div className="flex justify-around items-center mt-8">
                                    <button
                                        onClick={updateFunction}
                                        className="bg-green-500 text-white px-4 py-2 mt-4 mr-4 w-32 rounded-xl">Update</button>
                                    <button
                                        onClick={closeModal}
                                        className="bg-red-500 text-white px-4 py-2 mt-4 w-32 rounded-xl">Back</button>
                                </div>
                            }
                        </div>
                    }
                </UpdateModal>
                <ShowArtists
                    openModal={openModal}
                    selectedArtistName={selectedArtistName}
                    setSelectedArtistName={setSelectedArtistName}
                    selectedArtistID={selectedArtistID}
                    setSelectedArtistID={setSelectedArtistID}
                    returnselectedArtistForm={returnSelectedArtistForm}
                    returnsetSelectedArtistForm={returnSetSelectedArtistForm}
                    projectValue={projectValue}
                    setProjectValue={setProjectValue}
                />
            </div>
        </>
    )
}
