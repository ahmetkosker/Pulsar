import React from 'react'
import PanelNavbar from '../../../components/PanelNavigation/PanelNavbar'

export default function DeleteBlog() {
    return (
        <>
            <PanelNavbar
                pageTitle={"Delete Blog"}
                goBackTitle={"Go Back"}
                goBackFunction={"/manage-blogs"}
            />
            <div>DeleteBlog</div>
        </>
    )
}
