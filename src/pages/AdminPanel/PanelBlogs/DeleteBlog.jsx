import React, { useState } from 'react'
import PanelNavbar from '../../../components/PanelNavigation/PanelNavbar'
import ShowBlogs from './ShowBlogs'
import DeleteModal from '../PanelArtists/DeleteModal'
import Lottie from 'lottie-react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'

export default function DeleteBlog() {

    const [selectedProjectID, setSelectedProjectID] = useState(null)
    const [selectedProjectName, setSelectedProjectName] = useState(null)
    const [isModalOpen, setModalOpen] = useState(false);
    const [loading, setLoading] = useState(false)

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const deleteBlogPost = async () => {
        setLoading(true)
        axios.post('https://deleteblogpost-zkwsxnxtga-ew.a.run.app', {
            blogPostID: selectedProjectID
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
            <PanelNavbar
                pageTitle={"Delete Blogpost"}
                goBackTitle={"Go Back"}
                goBackFunction={"/manage-blogs"}
            />
            <div className='flex justify-center items-center flex-col mt-8'>
                <h1 className='text-4xl font-light text-black mx-4 my-4'>Delete a Blogpost</h1>
                <p className='text-2xl font-light text-black mx-4 my-4'>Click on the blogpost you want to delete</p>
                <DeleteModal
                    show={isModalOpen}
                    onClose={closeModal}>
                    <div className='py-4 px-4'>
                        <h2 className="text-lg font-semibold mb-4">Delete Blogpost</h2>
                        <p>Are you sure want to delete this blogpost: <b>{selectedProjectName}</b></p>
                        {loading
                            ? <div className="mt-10 w-24 h-10 rounded-xl flex justify-center items-center bg-blue-700">
                                <Lottie
                                    className="w-32 h-32 object-contain"
                                    animationData={require("../../../components/loadingAnimation.json")} />
                            </div>
                            :
                            <div className="flex justify-around items-center mt-8">
                                < button
                                    onClick={deleteBlogPost}
                                    className="bg-green-500 text-white px-4 py-2 mt-4 mr-4 w-32 rounded-xl">Yes</button>
                                <button
                                    onClick={closeModal}
                                    className="bg-red-500 text-white px-4 py-2 mt-4 w-32 rounded-xl">No</button>
                            </div>
                        }
                    </div>
                </DeleteModal >
                <ShowBlogs
                    openModal={openModal}
                    setSelectedBlogID={setSelectedProjectID}
                    setSelectedBlogName={setSelectedProjectName}
                />
            </div >
        </>
    )
}
