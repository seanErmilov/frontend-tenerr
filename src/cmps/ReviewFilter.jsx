
import { useState } from 'react'

export function ReviewFilter({ onFilterChange }) {
  const [filterText, setFilterText] = useState('')

  function handleChange(event) {
    setFilterText(event.target.value)
    onFilterChange(event.target.value)
  }

  return (
    <div className="review-filter">
      <input
        type="text"
        placeholder="Filter reviews by text..."
        value={filterText}
        onChange={handleChange}
        
      />
      <button className='btn-filter-review'><img src=""/></button>
    </div>
  )
}
