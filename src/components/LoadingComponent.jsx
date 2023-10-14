import Lottie from 'lottie-react'
import React from 'react'



export default function LoadingComponent() {
    return (
        <main className="w-full h-screen flex justify-center items-center flex-row font-semibold text-2xl text-[#A59719]">
            <Lottie
                className="w-32 h-32 object-contain"
                animationData={require("./loadingAnimation.json")} />
            Loading...
        </main>
    )
}
