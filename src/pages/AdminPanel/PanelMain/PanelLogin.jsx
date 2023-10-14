import React, { useState } from 'react'
import { auth } from '../../../configs/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

export default function PanelLogin() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigation = useNavigate()

    const loginFunction = () => {
        if (email === "" || password === "") {
            toast.error("Please fill in the blanks")
            return
        }
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                toast.success("Successfully logged in")
                setTimeout(() => navigation('/panelHomepage'), 2000)
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode)
                if (errorCode === "auth/invalid-login-credentials") {
                    toast.error("Invalid login credentials")
                } else if (errorCode === "auth/user-not-found") {
                    toast.error("User not found")
                } else if (errorCode === "auth/wrong-password") {
                    toast.error("Wrong password")
                } else if (errorCode === "auth/too-many-requests") {
                    toast.error("Too many requests, please try again later")
                } else {
                    toast.error("An error occured, please contact developer.")
                    console.log(errorCode, errorMessage)
                }
            });
    };

    return (
        <>
            <ToastContainer />
            <div className='flex justify-center items-center flex-row w-full h-screen'>
                <img onClick={() => navigation('/')} src='/pulsarMainLogo.png' className='w-1/2 h-1/2 object-contain relative right-36 cursor-pointer' />
                <div className='flex flex-col justify-center items-center w-1/3 h-4/5 bg-[#A59719] rounded-3xl'>
                    <p className='font-medium text-2xl'>Pulsar Records Admin Panel</p>
                    <div className='w-5/6 mx-4 my-8'>
                        <p className='text-white font-normal text-2xl self-start'>Email</p>
                        <input
                            className='w-full h-10 rounded-lg mt-2 py-2 px-2'
                            type='text'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className='w-5/6 mx-4 my-4'>
                        <p className='text-white font-normal text-2xl self-start'>Password</p>
                        <input
                            className='w-full h-10 rounded-lg mt-2 py-2 px-2'
                            type='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div onClick={() => loginFunction()} className='w-32 h-12 mx-4 my-4 flex justify-center items-center rounded-xl shadow-2xl bg-slate-200 text-lg cursor-pointer'>
                        Login
                    </div>
                </div>
            </div>
        </>
    )
}
