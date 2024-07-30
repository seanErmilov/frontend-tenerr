import { useState, useEffect } from 'react'
import { gigService } from '../services/gig'
import { SearchBar } from './SearchBar'
import { useEffectUpdate } from '../customHooks/useEffectUpdate'

export function GigFilter({ filterBy, setFilterBy }) {
    //in dev for list page
    const [filterToEdit, setFilterToEdit] = useState(structuredClone(filterBy))
    const [costumPrice, setCostumPrice] = useState()


    useEffectUpdate(() => {
        setFilterBy(filterToEdit)
    }, [filterToEdit])

    function onfilterBySubmit(ev, type) {
        ev.preventDefault()

        const formData = new FormData(ev.target)
        const selectedValue = +formData.get(type)
        if (!selectedValue || selectedValue <= 0) return
        setFilterToEdit({ ...filterToEdit, [type]: selectedValue })

    }

    function onChamgeCostumPrice(val) {
        setCostumPrice(val)
    }

    // function handleChange(ev) {
    //     const type = ev.target.type
    //     const field = ev.target.name
    //     let value

    //     switch (type) {
    //         case 'text':
    //         case 'radio':
    //             value = field === 'sortDir' ? +ev.target.value : ev.target.value
    //             if (!filterToEdit.sortDir) filterToEdit.sortDir = 1
    //             break
    //         case 'number':
    //             value = +ev.target.value || ''
    //             break
    //     }
    //     setFilterToEdit({ ...filterToEdit, [field]: value })
    // }

    function clearFilter() {
        setFilterToEdit({ ...filterToEdit, txt: '', minSpeed: '', maxPrice: '' })
    }

    function clearSort() {
        setFilterToEdit({ ...filterToEdit, sortField: '', sortDir: '' })
    }

    return <div className="filter-btn-container">
        <div className="filter-btn"><span>Budget</span>
            <div className='index-filter-container'>
                <form action="" onSubmit={ev => onfilterBySubmit(ev, 'price')}>

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
                        <input type="radio" id="toopy" name="price" value={costumPrice} />
                        <label htmlFor="toopy">Costum
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
                <form action="" onSubmit={ev => onfilterBySubmit(ev, 'daysToMake')}>

                    <div className='opt'>
                        <input type="radio" id="huey" name="daysToMake" value="1" />
                        <label htmlFor="huey"><span>Express 24H</span></label>
                    </div>

                    <div className='opt'>
                        <input type="radio" id="dewey" name="daysToMake" value="3" />
                        <label htmlFor="dewey"><span>Up to 3 days</span></label>
                    </div>

                    <div className='opt'>
                        <input type="radio" id="louie" name="daysToMake" value="7" />
                        <label htmlFor="louie"><span>Up to 7 days</span></label>
                    </div>

                    <div className='opt'>
                        <input type="radio" id="toopy" name="daysToMake" value={Infinity} defaultChecked />
                        <label htmlFor="toopy"><span>Anytime</span></label>
                    </div>

                    <div className='btn-container'>
                        <button type="submit" className='apply'>Apply</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
}