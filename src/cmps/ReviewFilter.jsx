import { useState } from 'react'
import magnifyingGlass from '../assets/img/svg/searchBar/magnifyingGlass.svg'


export function ReviewFilter({ onFilterChange }) {
  const [filterText, setFilterText] = useState('');

  function handleChange(event) {
    setFilterText(event.target.value);
    onFilterChange(event.target.value);
  }

  return (
    <div className="review-filter">
      <input
        type="text"
        placeholder="Filter reviews"
        value={filterText}
        onChange={handleChange}
      />
      <button className='btn-filter-review'>
        <img src={magnifyingGlass} alt="Search" />
      </button>
    </div>
  );
}
