import React from 'react'
import PanelNavbar from '../../../components/PanelNavigation/PanelNavbar'

export default function UpdateBlog() {
    return (
        <>
            <PanelNavbar
                pageTitle={"Update Blog"}
                goBackTitle={"Go Back"}
                goBackFunction={"/manage-blogs"}
            />
            <div>UpdateBlog</div>
        </>
    )
}
