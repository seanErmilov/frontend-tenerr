const hardCodedAbout = "Welcome, I'm San!"


// temporary
const hardCodedDescription = `A visionary logo and branding expert, here to craft your logo that leaves a lasting impression. With 9 years of experience under my belt, I bring a wealth of expertise to every project I undertake with a unique blend of creativity, precision & client-centric focus. Having successfully delivered over 130,000 branding orders, I stand as a testament to my unwavering commitment to excellence and client satisfaction.\n Expect nothing less than excellence. With a focus on creativity, simplicity and sophistication, the gig specializes in crafting sleek and impactful minimalist logo design that resonate with your target audience. From initial concept to final revisions, my process is collaborative and transparent, ensuring that your input is valued every step of the way.\n "In a sea of options, choose a designer who stands out for all the right reasons. Choose creativity. Choose quality. Choose results. Choose me."\n Dive into my portfolio: https://www.fiverr.com/s/rmjPDb\n Choose between standard or premium package for portfolio-quality results\n Check out my FAQs or I am just a message away!`

export function AboutGig({ description, name = 'San' }) {
  const descriptionTemp = hardCodedDescription.split('\n')

  // const paragraphs = description
  //   .split(/\n\s*\n/)
  //   .map(para => para.split(/(?=\b[A-Z]+\b)/))
  //   .flat()
  //   .filter(para => para.trim() !== '')

  return (
    <div className='about-gig'>
      <h2>About this gig</h2>
      <div className="gig-description">
        <h3 className="subtitle">Welcome, I'm {name}!</h3>
        <p>{descriptionTemp[0]}</p>

        <h3 className="subtitle">About the gig and what to expect?</h3>
        <p>{descriptionTemp[1]}</p>

        <h3 className="subtitle">My motto</h3>
        <p>{descriptionTemp[2]}</p>

        <h3 className="subtitle">Curious to see my work?</h3>
        <p>{descriptionTemp[3]}</p>
        <p className="italics">{descriptionTemp[4]}</p>

        <h3 className="subtitle">Got Questions?</h3>
        <p>{descriptionTemp[5]}</p>

      </div>
    </div>
  );
}
