import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function PanelNavbar({
    pageTitle,
    addTitle,
    updateTitle,
    deleteTitle,
    addTitleFunction,
    updateTitleFunction,
    deleteTitleFunction,
    goBackTitle,
    goBackFunction,
    logOutTitle,
    logOutFunction
}) {
    const navigation = useNavigate()
    return (
        <div className='w-screen h-32 flex justify-between items-center bg-[#d4d3c6]'>
            <div className='flex justify-between items-center'>
                <img
                    onClick={() => navigation('/')}
                    className='w-32 h-24 object-contain cursor-pointer'
                    src='/pulsarMainLogo.png' />
                <p className='text-2xl font-light'>{pageTitle}</p>
            </div>
            <div className='flex justify-between items-center'>
                <p
                    onClick={() => navigation(addTitleFunction)}
                    className='text-2xl font-light relative right-48 cursor-pointer hover:border-b-4 border-[#A59719]'>{addTitle}</p>
                <p
                    onClick={() => navigation(updateTitleFunction)}
                    className='text-2xl font-light relative right-36 cursor-pointer hover:border-b-4 border-[#A59719]'>{updateTitle}</p>
                <p
                    onClick={() => navigation(deleteTitleFunction)}
                    className='text-2xl font-light relative right-24 cursor-pointer hover:border-b-4 border-[#A59719]'>{deleteTitle}</p>
                <p
                    onClick={logOutFunction}
                    className='text-2xl font-light text-red-600 relative right-12 cursor-pointer hover:border-b-4 border-red-500'>{logOutTitle}</p>
                <p
                    onClick={() => navigation(goBackFunction)}
                    className='text-2xl font-light text-red-600 relative right-12 cursor-pointer hover:border-b-4 border-red-500'>{goBackTitle}</p>
            </div>
        </div >
    )
}
