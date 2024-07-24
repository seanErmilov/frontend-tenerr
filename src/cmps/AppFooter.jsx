import { useSelector } from 'react-redux'
import tennerLogo from '../assets/img/logos/tenner-loggo.png' // Import the image


export function AppFooter() {

	return (
		<footer className="app-footer">
			<p> LET IT BE - TOO COOL FOR SCHOOL</p>
			<p> &copy; Sean Ermilov - Shlomi Plishtiev - Amir Boxer 2024</p>
			{/* <img src={tennerLogo} alt="" /> */}

			<p id='shadow'>tennerr</p>
		</footer>
	)
}