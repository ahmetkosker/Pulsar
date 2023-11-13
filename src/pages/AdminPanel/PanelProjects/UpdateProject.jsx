import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import PanelNavbar from '../../../components/PanelNavigation/PanelNavbar'
import UpdateModal from '../PanelArtists/UpdateModal'
import LoadingComponent from '../../../components/LoadingComponent'
import axios from 'axios'
import Lottie from 'lottie-react'
import ShowProjects from './ShowProjects'
import trash from '../../../components/trashicon.png'

export default function PanelUpdate() {
    const [selectedProjectID, setSelectedProjectID] = useState(null)
    const [selectedProjectName, setSelectedProjectName] = useState(null)
    const [returnSelectedProjectForm, setReturnSelectedProjectFrom] = useState(null)
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

    const updateFunction = () => {
        console.log("ID:", selectedProjectID)
        console.log("Name:", selectedProjectName)
        console.log("Form:", returnSelectedProjectForm)
        axios.post("https://updateproject-zkwsxnxtga-ew.a.run.app", {
            projectID: selectedProjectID,
            artistName: returnSelectedProjectForm.artistName,
            artistJobTitle: returnSelectedProjectForm.artistJobTitle,
            projectImage: returnSelectedProjectForm.projectImage,
            features: projectValue,
            projectLink: returnSelectedProjectForm.projectLink
        })
            .then((res) => {
                console.log(res)
                setLoading(false)
                closeModal()
                toast.success("Project updated successfully")
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
                pageTitle={'Update Project'}
                goBackTitle={'Go Back'}
                goBackFunction={'/manage-projects'}
            />
            <div className='flex justify-center items-center flex-col mt-8'>
                <h1 className='text-4xl font-light text-black mx-4 my-4'>Update a Project</h1>
                <p className='text-2xl font-light text-black mx-4 my-4'>Click on the project you want to update</p>
                <UpdateModal
                    show={isModalOpen}
                    onClose={closeModal}
                    selectedArtistID={selectedProjectID}
                >
                    {returnSelectedProjectForm === null
                        ? <LoadingComponent />
                        :
                        <div className='flex justify-start items-center flex-col w-full h-screen relative top-8 px-8 py-8 overflow-auto'>
                            <h2 className="text-2xl font-semibold mb-8">Update Project</h2>
                            <div className='flex justify-center items-center flex-row'>
                                <p className='font-light text-xl'>Project Name: </p>
                                <input
                                    value={returnSelectedProjectForm.artistName}
                                    onChange={(e) => setReturnSelectedProjectFrom({ ...returnSelectedProjectForm, artistName: e.target.value })}
                                    type='text'
                                    placeholder={"Artist Name"}
                                    className='border-2 border-black rounded-lg mx-4 w-96 py-2 px-2' />
                            </div>
                            <div className='flex justify-center items-center flex-row my-4 ml-4'>
                                <p className='font-light text-xl'>Project URL: </p>
                                <input
                                    value={returnSelectedProjectForm.projectLink}
                                    onChange={(e) => setReturnSelectedProjectFrom({ ...returnSelectedProjectForm, projectLink: e.target.value })}
                                    type='text'
                                    placeholder={"Project URL"}
                                    className='border-2 border-black rounded-lg mx-4 w-96 py-2 px-2' />
                            </div>
                            <div className='flex justify-center items-center flex-row w-full mt-4 ml-16'>
                                <p className='font-light text-xl'>Title: </p>
                                <textarea
                                    id="details"
                                    value={returnSelectedProjectForm.artistJobTitle}
                                    onChange={(e) => setReturnSelectedProjectFrom({ ...returnSelectedProjectForm, artistJobTitle: e.target.value })}
                                    type='text'
                                    placeholder={"Artist Details"}
                                    className='border-2 border-black rounded-lg mx-4 w-96 h-64 py-2 px-2 relative left-3' />
                            </div>
                            {projectValue.map((project, index) => {
                                return <div className='flex justify-center items-center flex-row mt-4'>
                                    <p className='font-light text-xl mr-4'>Artist {index + 1}: </p>
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
                                        <p className='font-light text-xl relative right-1'>New Artist: </p>
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
                <ShowProjects
                    returnsetSelectedProjectForm={setReturnSelectedProjectFrom}
                    setSelectedProjectID={setSelectedProjectID}
                    setSelectedProjectName={setSelectedProjectName}
                    openModal={openModal}
                    projectValue={projectValue}
                    setProjectValue={setProjectValue}
                />
            </div>
        </>
    )
}
