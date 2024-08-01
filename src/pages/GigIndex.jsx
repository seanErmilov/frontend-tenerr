
import { useEffect, useState, useRef } from 'react'
import { useSelector } from 'react-redux'

import { loadGigs, setFilter } from '../store/actions/gig.actions'

import { GigList } from '../cmps/GigList'
import { GigFilter } from '../cmps/GigFilter'
import { Inside } from '../cmps/Inside'
import { useSearchParams } from 'react-router-dom'
import { gigService } from '../services/gig'





export function GigIndex() {

    const [searchParams, setSearchParams] = useSearchParams()
    const defaultFilter = gigService.getFilterFromSearchParams(searchParams)
    const filterBy = useSelector((storeState) => storeState.gigModule.filterBy)

    const gigs = useSelector(storeState => storeState.gigModule.gigs)

    useEffect(() => {
        setFilter(defaultFilter)
    }, [])


    useEffect(() => {
        loadGigs(filterBy)
        setSearchParams(filterBy)
    }, [filterBy])

    function onSetFilterBy(filterBy) {
        setFilter(filterBy)
    }
    const categoriesMap = {
        programming: ["Programming & Tech","Let us manage your Programming & Tech project"],
        graphics: ["Graphics & Design","Stand out from the crowd with a logo that fits your brand personality"],
        digital: ["Digital Marketing","Find a comprehensive digital marketing agency to handle it all."],
        writing: ["Writing & Translation","Most Popular in Writing & Translation"],
        video: ["Video & Animation","Let us manage your Video & Animation project"],
        ai: ["AI Services","Add AI with the help of experts who get it"],
        music: ["Music & Audio","Most Popular in Music & Audio"],
        business: ["Business","Most popular in Business"],
        consulting: ["Consulting","Access experts to accelerate your business."]
    }
    if (!gigs.length) return
    const innerText = filterBy.title ? filterBy.title : filterBy.tags[0]
    return (
        <main className="gig-index">
            <Inside filterBy={filterBy}
                innerText={categoriesMap[innerText][0]} />

            <h1>{categoriesMap[innerText][0]}</h1>
            <h4>{categoriesMap[innerText][1]}</h4>
            {/* <FilterBtn /> */}
            <GigFilter filterBy={filterBy} setFilterBy={onSetFilterBy} />
            <GigList
                gigs={gigs}
            />
        </main>
    )
}