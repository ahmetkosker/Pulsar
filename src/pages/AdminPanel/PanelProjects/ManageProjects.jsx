import React from 'react'
import PanelNavbar from '../../../components/PanelNavigation/PanelNavbar'
import ShowProjects from './ShowProjects'

export default function ManageProjects() {
    return (
        <>
            <PanelNavbar
                pageTitle={"Manage Projects"}
                goBackTitle={"Go Back"}
                goBackFunction={"/panelHomepage"}
                addTitle={"Add Project"}
                addTitleFunction={"/manage-projects/addProject"}
                updateTitle={"Update Project"}
                updateTitleFunction={"/manage-projects/updateProject"}
                deleteTitle={"Delete Project"}
                deleteTitleFunction={"/manage-projects/deleteProject"}
            />
            <ShowProjects
                isHomePage={true}
            />
        </>
    )
}
