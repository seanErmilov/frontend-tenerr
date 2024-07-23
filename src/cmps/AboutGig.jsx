
export function AboutGig({ description }) {

  const paragraphs = description
    .split(/\n\s*\n/)
    .map(para => para.split(/(?=\b[A-Z]+\b)/))
    .flat()
    .filter(para => para.trim() !== '')

  return (
    <div className='about-gig'>
      <h2>About this gig</h2>
      <div className="gig-description">
        {paragraphs.map((para, index) => (
          <p key={index}>{para}</p>
        ))}
      </div>
    </div>
  );
}
