import { useState, useEffect } from 'react'

export function AboutGig({ description }) {
  const [expanded, setExpanded] = useState(false)

  const toggleExpandDescription = () => {
    setExpanded(!expanded)
  }

  useEffect(() => {
    const paragraphs = document.querySelectorAll('.gig-description .paragraph')
    paragraphs.forEach((paragraph, index) => {
      paragraph.style.setProperty('--paragraph-index', index)
    })
  }, [expanded, description])

  const renderDescription = () => {
    const paragraphs = description.split('\n')
    const paragraphLimit = 2

    if (paragraphs.length > paragraphLimit && !expanded) {
      const truncatedParagraphs = paragraphs.slice(0, paragraphLimit)
      return (
        <>
          {truncatedParagraphs.map((paragraph, index) => (
            <p key={index} className="paragraph">{paragraph}</p>
          ))}
          <span className="read-more" onClick={toggleExpandDescription}>Read More</span>
        </>
      )
    } else {
      return (
        <>
          {paragraphs.map((paragraph, index) => (
            <p key={index} className="paragraph">{paragraph}</p>
          ))}
          {expanded && <span className="read-more" onClick={toggleExpandDescription}>Read Less</span>}
        </>
      )
    }
  }

  return (
    <div className='about-gig'>
      <h2>About this gig</h2>
      <div className="gig-description">{renderDescription()}</div>
    </div>
  )
}
