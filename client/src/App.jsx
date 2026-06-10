import React, { useState, useEffect } from 'react'
import axios from 'axios'
import SearchBox from './components/SearchBox'
import ResultCard from './components/ResultCard'
import FilterButtons from './components/FilterButtons'

export default function App() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [selectedFilter, setSelectedFilter] = useState('all')
  const [totalResults, setTotalResults] = useState(0)

  const filters = [
    { id: 'all', label: 'All Sources' },
    { id: 'duckduckgo', label: 'DuckDuckGo' },
    { id: 'bing', label: 'Bing' },
    { id: 'google', label: 'Google' },
  ]

  const handleSearch = async (searchQuery) => {
    if (!searchQuery.trim()) {
      setError('Please enter a search query')
      return
    }

    setQuery(searchQuery)
    setLoading(true)
    setError('')
    setResults([])
    setSelectedFilter('all')

    try {
      const response = await axios.get('/api/search', {
        params: {
          q: searchQuery,
          limit: 20,
        },
      })

      setResults(response.data.results || [])
      setTotalResults(response.data.totalResults || 0)
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch search results')
      console.error('Search error:', err)
    } finally {
      setLoading(false)
    }
  }

  const filteredResults = results.filter((result) => {
    if (selectedFilter === 'all') return true
    return result.source.toLowerCase() === selectedFilter.toLowerCase()
  })

  return (
    <div className="container">
      <div className="header">
        <h1>🔍 Aggregate Search Hub</h1>
        <p>Search across multiple sources at once</p>
      </div>

      <SearchBox onSearch={handleSearch} isLoading={loading} />

      {error && <div className="error">{error}</div>}

      {query && (
        <>
          <FilterButtons
            filters={filters}
            selectedFilter={selectedFilter}
            onFilterChange={setSelectedFilter}
          />

          {loading ? (
            <div className="loading">
              <div className="loading-spinner"></div>
              <p style={{ marginTop: '15px' }}>Searching...</p>
            </div>
          ) : filteredResults.length > 0 ? (
            <>
              <div className="results-info">
                Found {totalResults} results
                {selectedFilter !== 'all' && ` from ${selectedFilter}`}
              </div>
              <div className="results-container">
                {filteredResults.map((result, index) => (
                  <ResultCard key={index} result={result} />
                ))}
              </div>
            </>
          ) : (
            <div className="no-results">
              No results found. Try a different search query.
            </div>
          )}
        </>
      )}
    </div>
  )
}
