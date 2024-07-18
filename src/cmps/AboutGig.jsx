import  { useState } from 'react'

export function AboutGig({ description }) {
  const [expanded, setExpanded] = useState(false);

  const toggleExpandDescription = () => {
    setExpanded(!expanded)
  };

  const renderDescription = () => {
    const words = description.split(' ')
    const wordLimit = 10

    if (words.length > wordLimit && !expanded) {
      const truncatedText = words.slice(0, wordLimit).join(' ')
      return (
        <>{truncatedText}... <span className="read-more" onClick={toggleExpandDescription}>Read More</span></>
      )
    } else {
      return (
        <>{description} {expanded && <span className="read-more" onClick={toggleExpandDescription}>Read Less</span>}</>
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
