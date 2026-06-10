import React, { useState } from 'react'

export default function SearchBox({ onSearch, isLoading }) {
  const [input, setInput] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onSearch(input)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !isLoading) {
      handleSubmit(e)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="search-box">
      <input
        type="text"
        className="search-input"
        placeholder="Enter your search query..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={isLoading}
        autoFocus
      />
      <button
        type="submit"
        className="search-button"
        disabled={isLoading}
      >
        {isLoading ? 'Searching...' : 'Search'}
      </button>
    </form>
  )
}
