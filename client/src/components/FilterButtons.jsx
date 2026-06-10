import React from 'react'

export default function FilterButtons({
  filters,
  selectedFilter,
  onFilterChange,
}) {
  return (
    <div className="filter-section">
      {filters.map((filter) => (
        <button
          key={filter.id}
          className={`filter-btn ${selectedFilter === filter.id ? 'active' : ''}`}
          onClick={() => onFilterChange(filter.id)}
        >
          {filter.label}
        </button>
      ))}
    </div>
  )
}
