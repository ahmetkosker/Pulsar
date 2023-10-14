import React from 'react'
import PanelNavbar from '../../../components/PanelNavigation/PanelNavbar'
import ShowArtists from './ShowArtists'

export default function ManageArtists() {
    return (
        <div>
            <PanelNavbar
                pageTitle={'Manage Artists'}
                addTitle={'Add Artist'}
                updateTitle={'Update Artist'}
                deleteTitle={'Delete Artist'}
                addTitleFunction={'/manage-artists/addArtist'}
                updateTitleFunction={'/manage-artists/panelUpdate'}
                deleteTitleFunction={'/manage-artists/deleteArtist'}
                goBackTitle={'Go Back'}
                goBackFunction={'/panelHomepage'}
            />
            <ShowArtists
                isHomePage={true}
            />
        </div>
    )
}
