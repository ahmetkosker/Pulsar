import React, { useEffect, useState } from 'react'
import PanelNavbar from '../../../components/PanelNavigation/PanelNavbar'
import axios from 'axios';
import LoadingComponent from '../../../components/LoadingComponent';
import { ToastContainer, toast } from 'react-toastify'
import Lottie from 'lottie-react'

export default function UpdateStaticFields() {

    const [staticFields, setStaticFields] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const goBack = () => {
        window.history.back()
    }

    const getStaticFields = async () => {
        await axios.get('https://getstaticfields-zkwsxnxtga-ew.a.run.app')
            .then(res => setStaticFields(res.data))
            .catch(err => console.log(err))
    };

    const updateStaticFields = async () => {
        setIsLoading(true)
        await axios.post('https://updatestaticfields-zkwsxnxtga-ew.a.run.app', staticFields)
            .then(res => {
                if (res.status === 200) {
                    toast.success("Static fields updated successfully")
                    setIsLoading(false)
                } else {
                    toast.error("An error occured, please contact developer.")
                    setIsLoading(false)
                }
            })
            .catch(err => {
                toast.error("An error occured, please contact developer.")
                setIsLoading(false)
            })
    };

    useEffect(() => { getStaticFields() }, [])

    if (staticFields === null) {
        return (<LoadingComponent />)
    }

    return (
        <>
            <ToastContainer />
            <PanelNavbar
                pageTitle={'Update Static Fields'}
                logOutTitle={'Go Back'}
                logOutFunction={goBack}
            />
            <div className='flex justify-center items-center flex-col'>
                <p className='mt-8 font-extrabold text-3xl'>Update Static Fields</p>
                <div className='flex flex-col justify-center items-center'>
                    <div className='flex flex-row justify-center items-center mt-12'>
                        <h1 className='mr-4 text-lg font-semibold '>About Title</h1>
                        <textarea className='border-2 border-gray-300 w-96 h-48'
                            value={staticFields.aboutTitle}
                            onChange={(e) => setStaticFields({ ...staticFields, aboutTitle: e.target.value })}
                        />
                    </div>
                    <div className='flex flex-row justify-center items-center mt-8'>
                        <h1 className='mr-4 text-lg font-semibold '>Contact Phone</h1>
                        <input className='border-2 border-gray-300 w-96 h-12'
                            value={staticFields.contactPhoneNumber}
                            onChange={(e) => setStaticFields({ ...staticFields, contactPhoneNumber: e.target.value })}
                        />
                    </div>
                    <div className='flex flex-row justify-center items-center mt-8'>
                        <h1 className='mr-4 text-lg font-semibold '>Footer Title</h1>
                        <input className='border-2 border-gray-300 w-96 h-12'
                            value={staticFields.footerTitle}
                            onChange={(e) => setStaticFields({ ...staticFields, footerTitle: e.target.value })}
                        />
                    </div>
                    <div className='flex flex-row justify-center items-center mt-8'>
                        <h1 className='mr-4 text-lg font-semibold '>Instagram</h1>
                        <input className='border-2 border-gray-300 w-96 h-12'
                            value={staticFields.instagramLink}
                            onChange={(e) => setStaticFields({ ...staticFields, instagramLink: e.target.value })}
                        />
                    </div>
                    <div className='flex flex-row justify-center items-center mt-8'>
                        <h1 className='mr-4 text-lg font-semibold '>Shopify</h1>
                        <input className='border-2 border-gray-300 w-96 h-12'
                            value={staticFields.shopifyLink}
                            onChange={(e) => setStaticFields({ ...staticFields, shopifyLink: e.target.value })}
                        />
                    </div>
                    {isLoading
                        ? <div className="mt-10 w-24 h-10 rounded-xl flex justify-center items-center bg-blue-700">
                            <Lottie
                                className="w-32 h-32 object-contain"
                                animationData={require("../../../components/loadingAnimation.json")} />
                        </div>
                        : <button onClick={updateStaticFields} className='w-28 h-12 bg-pulsar relative left-48 mt-4 rounded-xl text-white'>
                            Update
                        </button>
                    }

                </div>
            </div>
        </>
    )
}
