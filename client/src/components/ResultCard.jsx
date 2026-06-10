import React from 'react'

export default function ResultCard({ result }) {
  const getSourceClass = (source) => {
    return source.toLowerCase().replace(/\s+/g, '')
  }

  const handleClick = () => {
    window.open(result.url, '_blank')
  }

  return (
    <div className="result-card" onClick={handleClick}>
      <span className={`result-source ${getSourceClass(result.source)}`}>
        {result.source}
      </span>
      <h3 className="result-title">{result.title}</h3>
      <p className="result-url">{result.url}</p>
      <p className="result-snippet">{result.snippet}</p>
    </div>
  )
}
