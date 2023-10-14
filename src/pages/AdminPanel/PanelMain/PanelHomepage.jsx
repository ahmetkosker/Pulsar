import React, { useEffect } from 'react'
import { auth } from '../../../configs/firebaseConfig'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom';
import PanelNavbar from '../../../components/PanelNavigation/PanelNavbar';
import Lottie from 'lottie-react';
import wave from '../../../components/pulsaranimation.json'
import { ToastContainer, toast } from 'react-toastify';

export default function PanelHomepage() {
    const navigation = useNavigate();

    const chechAuthenticate = () => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const uid = user.uid;
                console.log(uid)
            } else {
                navigation('/adminpanel')
            }
        });
    }

    useEffect(() => {
        chechAuthenticate()
    }, [])

    const logoutFunction = () => {
        signOut(auth)
            .then(() => {
                toast.success("Successfully logged out")
                setTimeout(() => navigation('/adminpanel'), 2000)
            }).catch((error) => {
                toast.error("An error occured, please contact developer.")
                setTimeout(() => navigation('/adminpanel'), 2000)
            });
    }

    return (
        <>
            <ToastContainer />
            <PanelNavbar
                pageTitle={'Admin Panel Homepage'}
                addTitle={'Artist Management'}
                updateTitle={'Project Management'}
                deleteTitle={'Blog Management'}
                addTitleFunction={'/manage-artists'}
                updateTitleFunction={'/manage-projects'}
                deleteTitleFunction={'/addBlog'}
                logOutTitle={'Logout'}
                logOutFunction={logoutFunction}
            />
            <div className='flex w-full h-screen justify-center items-center flex-col'>
                <Lottie
                    animationData={wave}
                    autoPlay
                    className="w-screen absolute -z-50 mx-auto left-0 right-0 bottom-0"
                />
                {/*<img onClick={() => navigation('/')} src='/pulsarMainLogo.png' className='w-96 h-96 object-contain cursor-pointer' />
                <div className='flex flex-col justify-center items-center'>
                    <p
                        onClick={() => logoutFunction()}
                        className='text-2xl font-bold text-red-500 rounded-xl py-2 px-4 border-2 border-zinc-500 mx-4 my-4 cursor-pointer'>Logout</p>
                </div>*/}
            </div>
        </>
    )
}
