import React, { useEffect } from 'react'
import { auth } from '../configs/firebaseConfig'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom';

export default function PanelHomepage() {
    const navigation = useNavigate();

    const chechAuthenticate = () => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const uid = user.uid;
                console.log(uid)
            } else {
                navigation('/panellogin')
            }
        });
    }

    useEffect(() => {
        chechAuthenticate()
    }, [])

    const logoutFunction = () => {
        signOut(auth).then(() => {
            navigation('/panellogin')
            alert("Successfully logged out")
        }).catch((error) => {
            navigation('/panellogin')
            alert(error)
        });
    }

    return (
        <div className='flex w-full h-screen justify-center items-center flex-col'>
            <img src='/pulsarMainLogo.png' className='w-32 h-32 object-contain' />
            <h1 className='text-4xl font-bold text-black mx-4 my-4'>Panel Homepage</h1>
            <div className='flex flex-col justify-center items-center'>
                <p
                    onClick={() => navigation('/panel')}
                    className='text-2xl font-bold text-[#A59719] rounded-xl py-2 px-4 border-2 border-zinc-400 mx-4 my-4 cursor-pointer'>Add Artist</p>
                <p
                    onClick={() => navigation('/addProject')}
                    className='text-2xl font-bold text-[#A59719] rounded-xl py-2 px-4 border-2 border-zinc-400 mx-4 my-4 cursor-pointer'>Add Project</p>
                <p
                    onClick={() => navigation('/addBlog')}
                    className='text-2xl font-bold text-[#A59719] rounded-xl py-2 px-4 border-2 border-zinc-400 mx-4 my-4 cursor-pointer'>Add Blog</p>
                <p
                    onClick={() => logoutFunction()}
                    className='text-2xl font-bold text-red-500 rounded-xl py-2 px-4 border-2 border-zinc-500 mx-4 my-4 cursor-pointer'>Logout</p>
            </div>
        </div>
    )
}
