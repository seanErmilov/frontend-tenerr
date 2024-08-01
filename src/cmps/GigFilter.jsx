import { useState, useEffect, useRef } from 'react'
import { gigService } from '../services/gig'
import { SearchBar } from './SearchBar'
import { useEffectUpdate } from '../customHooks/useEffectUpdate'
import { useSelector } from 'react-redux'

export function GigFilter({ setFilterBy }) {
    //in dev for list page
    const filterBy = useSelector((storeState) => storeState.gigModule.filterBy)
    const [costumPrice, setCostumPrice] = useState()

    const [priceOptionsVisible, setPriceListVisible] = useState(false)
    const [dateOptionsVisible, setDateListVisible] = useState(false)


    const priceList = useRef(null)
    const dateList = useRef(null)

    useEffect(() => {
        if (priceList.current && priceOptionsVisible) priceList.current.focus()
    }, [priceOptionsVisible])

    useEffect(() => {
        if (dateList.current && dateOptionsVisible) dateList.current.focus()

    }, [dateOptionsVisible])



    function onfilterBySubmit(ev, type, visibilitySetter) {
        ev.preventDefault()
        visibilitySetter(false)
        const formData = new FormData(ev.target)
        const selectedValue = +formData.get(type)
        if (!selectedValue || selectedValue <= 0) return
        setFilterBy({ ...filterBy, [type]: selectedValue })
    }

    function onChamgeCostumPrice(val) {
        setCostumPrice(val)
    }

    function handleBlur(e, setter, ignoreName) {
        if (e.currentTarget.contains(e.relatedTarget) || e.relatedTarget && e.relatedTarget.dataset.preventchildblur === ignoreName) return
        setter(false)
    }

    function clearFilter() {
        setFilterBy({ ...filterBy, txt: '', minSpeed: '', maxPrice: '' })
    }

    function clearSort() {
        setFilterBy({ ...filterBy, sortField: '', sortDir: '' })
    }

    return <div className="filter-btn-container">
        <div className="filter-btn" onClick={() => setPriceListVisible(prev => !prev)} tabIndex="-1" data-preventchildblur="prices-btn"><span>Budget</span>
            {/* price */}
            {priceOptionsVisible &&
                <div className='index-filter-container' ref={priceList} onBlur={e => handleBlur(e, setPriceListVisible, 'prices-btn')} tabIndex="-1" onClick={e => e.stopPropagation()}>
                    <form action="" onSubmit={ev => onfilterBySubmit(ev, 'price', setPriceListVisible)}>

                        <div className='opt'>
                            <label htmlFor="Under50">
                                <input type="radio" id="Under50" name="price" value="50" defaultChecked />
                                <span>value</span>
                                Under $50</label>
                        </div>

                        <div className='opt'>
                            <label htmlFor="Under100">
                                <input type="radio" id="Under100" name="price" value="100" />
                                <span>value</span>Under $100
                            </label>
                        </div>

                        <div className='opt'>
                            <label htmlFor="Under200">
                                <input type="radio" id="Under200" name="price" value="200" />
                                <span>value</span>Under $200
                            </label>
                        </div>

                        <div className='costum opt'>
                            <label htmlFor="costum">
                                <input type="radio" id="costum" name="price" value={costumPrice} />
                                <span>Costum</span>
                                <br />
                                <input type="number" name="" id="" onChange={e => onChamgeCostumPrice(e.target.value)} placeholder='Enter Budget                     $' />
                            </label>
                        </div>

                        <div className='btn-container'>
                            <button type="submit" className='apply'>Apply</button>
                        </div>
                    </form>
                </div>}
        </div>

        {/* dates */}
        <div className="filter-btn" onClick={() => setDateListVisible(prev => !prev)} tabIndex="-1" data-preventchildblur="date-btn"><span>Delivery time</span>
            {dateOptionsVisible &&

                <div className='index-filter-container' ref={dateList} onBlur={e => handleBlur(e, setDateListVisible, 'date-btn')} tabIndex="-1" onClick={e => e.stopPropagation()}>
                    <form action="" onSubmit={ev => onfilterBySubmit(ev, 'daysToMake', setDateListVisible)}>
                        <div className='opt'>
                            <label htmlFor="1">
                                <input type="radio" id="1" name="daysToMake" value="1" />
                                <span>Express 24H</span>
                            </label>
                        </div>

                        <div className='opt'>
                            <label htmlFor="3">
                                <input type="radio" id="3" name="daysToMake" value="3" />
                                <span>Up to 3 days</span>
                            </label>
                        </div>

                        <div className='opt'>
                            <label htmlFor="7">
                                <input type="radio" id="7" name="daysToMake" value="7" />
                                <span>Up to 7 days</span>
                            </label>
                        </div>

                        <div className='opt'>
                            <label htmlFor="inf">
                                <input type="radio" id="inf" name="daysToMake" value={Infinity} defaultChecked />
                                <span>Anytime</span>
                            </label>
                        </div>

                        <div className='btn-container'>
                            <button type="submit" className='apply'>Apply</button>
                        </div>
                    </form>
                </div>}
        </div>
    </div>
}