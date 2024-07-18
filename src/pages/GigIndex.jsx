
import { useState, useEffect } from 'react'

import { loadGigs, addGig, removeGig, setFilter } from '../store/actions/gig.actions'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { gigService } from '../services/gig'
import { userService } from '../services/user'

import { GigList } from '../cmps/GigList'
import { GigFilter } from '../cmps/GigFilter'
import { useSelector } from 'react-redux'

export function GigIndex() {
    const filterBy = useSelector((storeState) => storeState.gigModule.filterBy)
    const gigs = useSelector(storeState => storeState.gigModule.gigs)

    useEffect(() => {
        loadGigs(filterBy)
    }, [filterBy])

    function onSetFilterBy(filterBy) {
        setFilter(filterBy)
    }

    async function onRemoveGig(gigId) {
        try {
            await removeGig(gigId)
            showSuccessMsg('Gig removed')
        } catch (err) {
            showErrorMsg('Cannot remove gig')
        }
    }

    async function onAddGig() {
        const gig = gigService.getEmptyGig()
        gig.vendor = prompt('Vendor?')
        try {
            const savedGig = await addGig(gig)
            showSuccessMsg(`Gig added (id: ${savedGig._id})`)
        } catch (err) {
            showErrorMsg('Cannot add gig')
        }
    }

    return (
        <main className="gig-index">
            <header>
                <h2>Gigs</h2>
                {userService.getLoggedinUser() && <button onClick={onAddGig}>Add a Gig</button>}
            </header>
            <GigFilter filterBy={filterBy} setFilterBy={onSetFilterBy} />
            <GigList
                gigs={gigs}
            // onRemoveGig={onRemoveGig}
            // onUpdateGig={onUpdateGig} 
            />
        </main>
    )
}