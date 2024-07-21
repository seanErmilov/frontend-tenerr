import { useEffect } from 'react'

export function AboutGig({ description }) {

  useEffect(() => {
    const paragraphs = document.querySelectorAll('.gig-description .paragraph')
    paragraphs.forEach((paragraph, index) => {
      paragraph.style.setProperty('--paragraph-index', index)
    })
  }, [description])

  function renderDescription() {
    const paragraphs = description.split('\n')

    return (
      <>
        {paragraphs.map((paragraph, index) => (
          <p key={index} className="paragraph">{paragraph}</p>
        ))}
      </>
    )
  }

  return (
    <div className='about-gig'>
      <h2>About this gig</h2>
      <div className="gig-description">{renderDescription()}</div>
    </div>
  )
}
