import React, { useState } from 'react'
import DeleteModal from '../PanelArtists/DeleteModal'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import PanelNavbar from '../../../components/PanelNavigation/PanelNavbar'
import Lottie from 'lottie-react'
import ShowProjects from './ShowProjects'

export default function DeleteProject() {
    const [selectedProjectID, setSelectedProjectID] = useState(null)
    const [selectedProjectName, setSelectedProjectName] = useState(null)
    const [isModalOpen, setModalOpen] = useState(false);
    const [loading, setLoading] = useState(false)
    const [projects, setProjects] = useState(null);

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const deleteProject = async () => {
        setLoading(true)
        axios.post('https://deleteproject-zkwsxnxtga-ew.a.run.app', {
            projectID: selectedProjectID
        })
            .then((res) => {
                console.log(res)
                setLoading(false)
                closeModal()
                toast.success("Project deleted successfully")
                setTimeout(() => window.location.reload(), 1500)
            })
            .catch((err) => toast.error(err))
    };


    return (
        <>
            <ToastContainer />
            <PanelNavbar
                pageTitle={'Delete Project'}
                goBackTitle={'Go Back'}
                goBackFunction={'/manage-projects'}
            />
            <div className='flex justify-center items-center flex-col mt-8'>
                <h1 className='text-4xl font-light text-black mx-4 my-4'>Delete a Project</h1>
                <p className='text-2xl font-light text-black mx-4 my-4'>Click on the project you want to delete</p>
                <DeleteModal
                    show={isModalOpen}
                    onClose={closeModal}>
                    <div className='py-4 px-4'>
                        <h2 className="text-lg font-semibold mb-4">Delete Project</h2>
                        <p>Are you sure want to delete this project: <b>{selectedProjectName}</b></p>
                        {loading
                            ? <div className="mt-10 w-24 h-10 rounded-xl flex justify-center items-center bg-blue-700">
                                <Lottie
                                    className="w-32 h-32 object-contain"
                                    animationData={require("../../../components/loadingAnimation.json")} />
                            </div>
                            :
                            <div className="flex justify-around items-center mt-8">
                                < button
                                    onClick={deleteProject}
                                    className="bg-green-500 text-white px-4 py-2 mt-4 mr-4 w-32 rounded-xl">Yes</button>
                                <button
                                    onClick={closeModal}
                                    className="bg-red-500 text-white px-4 py-2 mt-4 w-32 rounded-xl">No</button>
                            </div>
                        }
                    </div>
                </DeleteModal >
                <ShowProjects
                    setSelectedProjectID={setSelectedProjectID}
                    setSelectedProjectName={setSelectedProjectName}
                    openModal={openModal}
                    setProjectValue={setProjects}
                />
            </div >
        </>
    )
}
