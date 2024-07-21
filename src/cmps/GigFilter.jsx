import { useState, useEffect } from 'react'
import { gigService } from '../services/gig'
import { SearchBar } from './SearchBar'

export function GigFilter({ filterBy, setFilterBy }) {
    const [filterToEdit, setFilterToEdit] = useState(structuredClone(filterBy))
    const [primeTags, setPrimeTags] = useState(gigService.getPrimeryTags())

    useEffect(() => {
        setFilterBy(filterToEdit)
    }, [filterToEdit])

    function handleChange(ev) {
        const type = ev.target.type
        const field = ev.target.name
        let value

        switch (type) {
            case 'text':
            case 'radio':
                value = field === 'sortDir' ? +ev.target.value : ev.target.value
                if (!filterToEdit.sortDir) filterToEdit.sortDir = 1
                break
            case 'number':
                value = +ev.target.value || ''
                break
        }
        setFilterToEdit({ ...filterToEdit, [field]: value })
    }

    function clearFilter() {
        setFilterToEdit({ ...filterToEdit, txt: '', minSpeed: '', maxPrice: '' })
    }

    function clearSort() {
        setFilterToEdit({ ...filterToEdit, sortField: '', sortDir: '' })
    }

    return <section className="gig-filter">

        <input className='search-input'
            type="text"
            name="txt"
            value={filterToEdit.txt}
            placeholder="Search for any service..."
            onChange={handleChange}
            required
        />
        <button className='btn-search'>
            <img src="src/assets/icon/search white.svg" alt="" />
        </button>

        {/* <input
        
            type="number"
            min="0"
            name="minSpeed"
            value={filterToEdit.minSpeed}
            placeholder="min. speed"
            onChange={handleChange}
            required
        /> */}
        {/* <button
            className="btn-clear"
            onClick={clearFilter}>Clear</button>
        <h3>Sort:</h3>
        <div className="sort-field">
            <label>
                <span>Speed</span>
                <input
                    type="radio"
                    name="sortField"
                    value="speed"
                    checked={filterToEdit.sortField === 'speed'}
                    onChange={handleChange}
                />
            </label>
            <label>
                <span>Vendor</span>
                <input
                    type="radio"
                    name="sortField"
                    value="vendor"
                    checked={filterToEdit.sortField === 'vendor'}
                    onChange={handleChange}
                /> */}
        {/* </label>
            <label>
                <span>Owner</span>
                <input
                    type="radio"
                    name="sortField"
                    value="owner"
                    checked={filterToEdit.sortField === 'owner'}
                    onChange={handleChange}
                />
            </label>
        </div> */}
        {/* <div className="sort-dir">
            <label>
                <span>Asce</span>
                <input
                    type="radio"
                    name="sortDir"
                    value="1"
                    checked={filterToEdit.sortDir === 1}
                    onChange={handleChange}
                />
            </label>
            <label>
                <span>Desc</span>
                <input
                    type="radio"
                    name="sortDir"
                    value="-1"
                    onChange={handleChange}
                    checked={filterToEdit.sortDir === -1}
                />
            </label>
        </div>

        <button
            className="btn-clear"
            onClick={clearSort}>

            Clear
        </button>

        <h3>Prime Tags:</h3>
        <div className="prime-labels">
            {primeTags.map(tag => (
                <button key={tag} onClick={() => handleTagClick(tag)}>
                    {tag}
                </button>
            ))}  */}
        {/* </div> */}
    </section >
}