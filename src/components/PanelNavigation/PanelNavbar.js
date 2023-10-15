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
                <p className='lg:text-2xl font-light'>{pageTitle}</p>
            </div>
            <div className='flex gap-x-6 justify-between items-center'>
                <p
                    onClick={() => navigation(addTitleFunction)}
                    className='lg:text-2xl font-light relative  cursor-pointer hover:border-b-4 border-[#A59719]'>{addTitle}</p>
                <p
                    onClick={() => navigation(updateTitleFunction)}
                    className='lg:text-2xl font-light relative  cursor-pointer hover:border-b-4 border-[#A59719]'>{updateTitle}</p>
                <p
                    onClick={() => navigation(deleteTitleFunction)}
                    className='lg:text-2xl font-light relative  cursor-pointer hover:border-b-4 border-[#A59719]'>{deleteTitle}</p>
                <p
                    onClick={logOutFunction}
                    className='lg:text-2xl font-light text-red-600 relative cursor-pointer hover:border-b-4 border-red-500'>{logOutTitle}</p>
                <p
                    onClick={() => navigation(goBackFunction)}
                    className='lg:text-2xl font-light text-red-600 right-2 relative cursor-pointer hover:border-b-4 border-red-500'>{goBackTitle}</p>
            </div>
        </div >
    )
}
