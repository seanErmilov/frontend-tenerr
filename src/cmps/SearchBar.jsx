import { useState, useEffect } from 'react'
import { gigService } from '../services/gig'

export function SearchBar({ filterToEdit, handleChange }) {


    return <section className="search-bar">
        <input className='search-input'
            type="text"
            name="txt"
            // value={filterToEdit.txt}
            placeholder="Search for any service..."
            // onChange={handleChange}
            required
        />
        <button className='btn-search'>
            <img src="src/assets/icon/search white.svg" alt="" />
        </button>
    </section>
}