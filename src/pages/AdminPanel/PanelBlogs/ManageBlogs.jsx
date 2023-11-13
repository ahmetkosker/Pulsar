import React from 'react'
import PanelNavbar from '../../../components/PanelNavigation/PanelNavbar'
import ShowBlogs from './ShowBlogs'

export default function ManageBlogs() {
    return (
        <>
            <PanelNavbar
                pageTitle={"Manage Blogs"}
                goBackTitle={"Go Back"}
                goBackFunction={"/panelHomepage"}
                addTitle={"Add Blog"}
                addTitleFunction={"/manage-blogs/addBlog"}
                updateTitle={"Update Blog"}
                updateTitleFunction={"/manage-blogs/updateBlog"}
                deleteTitle={"Delete Blog"}
                deleteTitleFunction={"/manage-blogs/deleteBlog"}
            />
            <ShowBlogs
                isHomePage={true}
            />
        </>
    )
}
