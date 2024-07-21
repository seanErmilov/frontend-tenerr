import { useState, useEffect } from 'react'
import { gigService } from '../services/gig'
import { SearchBar } from './SearchBar'

export function GigFilter({ filterBy, setFilterBy }) {
    //in dev for list page
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
    </section >
}