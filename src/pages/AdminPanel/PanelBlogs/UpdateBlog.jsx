import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import PanelNavbar from '../../../components/PanelNavigation/PanelNavbar'
import UpdateModal from '../PanelArtists/UpdateModal'
import LoadingComponent from '../../../components/LoadingComponent'
import axios from 'axios'
import Lottie from 'lottie-react'
import ShowBlogs from './ShowBlogs'
import trash from '../../../components/trashicon.png'

export default function BlogUpdate() {
    const [selectedBlogID, setSelectedBlogID] = useState(null)
    const [selectedBlogName, setSelectedBlogName] = useState(null)
    const [returnSelectedProjectForm, setReturnSelectedProjectFrom] = useState(null)
    const [loading, setLoading] = useState(false)
    const [isModalOpen, setModalOpen] = useState(false)
    const [projectValue, setProjectValue] = useState([])

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const updateFunction = () => {
        console.log("ID:", selectedBlogID)
        console.log("Name:", selectedBlogName)
        console.log("Form:", returnSelectedProjectForm)
        axios.post("https://updateblogpost-zkwsxnxtga-ew.a.run.app", {
            blogPostID: selectedBlogID,
            blogPostAuthor: returnSelectedProjectForm.blogPostAuthor,
            blogPostContent: returnSelectedProjectForm.blogPostContent,
            blogPostImageURL: returnSelectedProjectForm.blogPostImageURL,
            blogPostTitle: returnSelectedProjectForm.blogPostTitle
        })
            .then((res) => {
                console.log(res)
                setLoading(false)
                closeModal()
                toast.success("Blogpost updated successfully")
                setTimeout(() => window.location.reload(), 2000)
            })
            .catch((err) => console.log(err))
    };

    return (
        <>
            <ToastContainer />
            <PanelNavbar
                pageTitle={'Update Blogs'}
                goBackTitle={'Go Back'}
                goBackFunction={'/manage-blogs'}
            />
            <div className='flex justify-center items-center flex-col mt-8'>
                <h1 className='text-4xl font-light text-black mx-4 my-4'>Update a Blogpost</h1>
                <p className='text-2xl font-light text-black mx-4 my-4'>Click on the blogpost you want to update</p>
                <UpdateModal
                    show={isModalOpen}
                    onClose={closeModal}
                    selectedArtistID={selectedBlogID}
                >
                    {returnSelectedProjectForm === null
                        ? <LoadingComponent />
                        :
                        <div className='flex justify-start items-center flex-col w-full h-screen relative top-8'>
                            <h2 className="text-2xl font-semibold mb-8">Update Project</h2>
                            <div className='flex justify-center items-center flex-row'>
                                <p className='font-light text-xl'>Author: </p>
                                <input
                                    value={returnSelectedProjectForm.blogPostAuthor}
                                    onChange={(e) => setReturnSelectedProjectFrom({ ...returnSelectedProjectForm, blogPostAuthor: e.target.value })}
                                    type='text'
                                    placeholder={"Author Name"}
                                    className='border-2 border-black rounded-lg mx-4 w-96 py-2 px-2' />
                            </div>
                            <div className='flex justify-center items-center flex-row'>
                                <p className='font-light text-xl'>Title: </p>
                                <input
                                    value={returnSelectedProjectForm.blogPostTitle}
                                    onChange={(e) => setReturnSelectedProjectFrom({ ...returnSelectedProjectForm, blogPostTitle: e.target.value })}
                                    type='text'
                                    placeholder={"Title"}
                                    className='border-2 border-black rounded-lg mx-4 w-96 py-2 px-2' />
                            </div>
                            <div className='flex justify-center items-center flex-row w-full mt-4'>
                                <p className='font-light text-xl'>Content: </p>
                                <textarea
                                    id="details"
                                    value={returnSelectedProjectForm.blogPostContent}
                                    onChange={(e) => setReturnSelectedProjectFrom({ ...returnSelectedProjectForm, blogPostContent: e.target.value })}
                                    type='text'
                                    placeholder={"Content"}
                                    className='border-2 border-black rounded-lg mx-4 w-96 h-64 py-2 px-2 relative left-3' />
                            </div>
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
                <ShowBlogs
                    returnsetSelectedProjectForm={setReturnSelectedProjectFrom}
                    setSelectedBlogID={setSelectedBlogID}
                    setSelectedBlogName={setSelectedBlogName}
                    openModal={openModal}
                    projectValue={projectValue}
                    setProjectValue={setProjectValue}
                />
            </div>
        </>
    )
}
