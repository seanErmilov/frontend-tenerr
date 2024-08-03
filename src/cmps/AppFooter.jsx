import { useSelector } from 'react-redux'
import tennerLogo from '../assets/img/logos/tenner-loggo.png' // Import the image
import linkedIn from '../assets/img/in.png'

export function AppFooter() {

	// return
	return (
		<footer className="app-footer">
			{/* <p> LET IT BE - TOO COOL FOR SCHOOL</p> */}
			<img src={tennerLogo} alt="" />
			{/* <img src="" alt="" /> */}
			<p className='txt'> &copy; Sean Ermilov - Shlomi Plishtiev - Amir Boxer 2024</p>

			{/* <p id='shadow'>tennerr</p> */}
		</footer>
	)
}