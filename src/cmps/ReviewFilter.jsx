import { useState } from 'react';

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
        <img src='	http://localhost:5173/src/assets/icon/search%20white.svg' />
      </button>
    </div>
  );
}
