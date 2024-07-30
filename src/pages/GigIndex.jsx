
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { loadGigs, setFilter } from '../store/actions/gig.actions'

import { GigList } from '../cmps/GigList'
import { GigFilter } from '../cmps/GigFilter'
import { FilterBtn } from '../cmps/FilterBtn'
import { Inside } from '../cmps/Inside'
import { useLocation, useParams } from 'react-router'
import { useSearchParams } from 'react-router-dom'
import { gigService } from '../services/gig'




export function GigIndex() {
    const [searchParams, setSearchParams] = useSearchParams()
    const defaultFilter = gigService.getFilterFromSearchParams(searchParams)
    const filterBy = useSelector((storeState) => storeState.gigModule.filterBy)

    const [costumPrice, setCostumPrice] = useState()

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

    function onChamgeCostumPrice(val) {
        setCostumPrice(val)
    }


    function onfilterByPriceSubmit(ev) {
        ev.preventDefault()

        const formData = new FormData(ev.target)

        // 
        const selectedPrice = +formData.get('price')

        if (!selectedPrice || selectedPrice <= 0) return
        console.log("Selected Price:", selectedPrice)
    }

    
    function onfilterByDateSubmit(ev) {
        ev.preventDefault()

        const formData = new FormData(ev.target);

        const selectedDate = +formData.get('date')

        if (!selectedDate || selectedDate <= 0) return
        console.log("Selected date:", selectedDate)
    }


    if (!gigs.length) return
    const innerText = filterBy.title ? filterBy.title : filterBy.tags[0]
    return (
        <main className="gig-index">
            <Inside filterBy={filterBy}
                innerText={innerText} />
            <h1>Logo Design</h1>
            <h4>Stand out from the crowd with a logo that fits your brand personality</h4>

            <div className="filter-btn-container">
                <div className="filter-btn"><span>Budget</span>
                    <div className='index-filter-container'>
                        <form action="" onSubmit={ev => onfilterByPriceSubmit(ev)}>

                            <div className='opt'>
                                <input type="radio" id="huey" name="price" value="50" defaultChecked />
                                <label htmlFor="huey"><span>value</span>Under $50</label>
                            </div>

                            <div className='opt'>
                                <input type="radio" id="dewey" name="price" value="100" />
                                <label htmlFor="dewey"><span>value</span>Under $100</label>
                            </div>

                            <div className='opt'>
                                <input type="radio" id="louie" name="price" value="200" />
                                <label htmlFor="louie"><span>value</span>Under $200</label>
                            </div>

                            <div className='costum opt'>
                                <input type="radio" id="louie" name="price" value={costumPrice} />
                                <label htmlFor="louie">Costum
                                    <br />
                                    <input type="number" name="" id="" onChange={e => onChamgeCostumPrice(e.target.value)} placeholder='Enter Budget                     $' />
                                </label>
                            </div>

                            <div className='btn-container'>
                                <button type="submit" className='apply'>Apply</button>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="filter-btn"><span>Delivery time</span>

                    <div className='index-filter-container'>
                        <form action="" onSubmit={ev => onfilterByDateSubmit(ev)}>

                            <div className='opt'>
                                <input type="radio" id="huey" name="date" value="1"/>
                                <label htmlFor="huey"><span>Express 24H</span></label>
                            </div>

                            <div className='opt'>
                                <input type="radio" id="dewey" name="date" value="3" />
                                <label htmlFor="dewey"><span>Up to 3 days</span></label>
                            </div>

                            <div className='opt'>
                                <input type="radio" id="louie" name="date" value="7" />
                                <label htmlFor="louie"><span>Up to 7 days</span></label>
                            </div>

                            <div className='opt'>
                                <input type="radio" id="louie" name="date" value="0" defaultChecked />
                                <label htmlFor="louie"><span>Anytime</span></label>
                            </div>

                            <div className='btn-container'>
                                <button type="submit" className='apply'>Apply</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>


            {/* <FilterBtn /> */}
            <GigFilter filterBy={filterBy} setFilterBy={onSetFilterBy} />
            <GigList
                gigs={gigs}
            />
        </main>
    )
}