import { useSelector } from 'react-redux'

export function AppFooter() {

	return (
		<footer className="app-footer full">
			<p>Coffeerights &copy; 2024</p>

			{import.meta.env.VITE_LOCAL ?
				<span className="local-services">Local Services</span> :
				<span className="remote-services">Remote Services</span>}
		</footer>
	)
}