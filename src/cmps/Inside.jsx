import { useNavigate } from 'react-router-dom'

export function Inside() {
    const navigate = useNavigate()

    function goToHome() {
        navigate('/')
    }

    function goToGig() {
        navigate('/gig')
    }

    return (
        <div className='navigate'>
            <button onClick={goToHome}>
                <img
                    src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBmaWxsPSJjdXJyZW50RmlsbCI+PHBhdGggZD0iTTEyLjc3MyAxNC41SDMuMjI3YS42OTIuNjkyIDAgMCAxLS40ODItLjE5NC42NTIuNjUyIDAgMCAxLS4yLS40NjhWNy44ODRILjVsNy4wNDEtNi4yMTJhLjY5NC42OTQgMCAwIDEgLjkxOCAwTDE1LjUgNy44ODRoLTIuMDQ2djUuOTU0YS42NTIuNjUyIDAgMCAxLS4yLjQ2OC42OTIuNjkyIDAgMCAxLS40ODEuMTk0Wm0tNC4wOTEtMS4zMjNoMy40MDlWNi42NjRMOCAzLjA1NiAzLjkxIDYuNjY0djYuNTEzaDMuNDA4di0zLjk3aDEuMzY0djMuOTdaIi8+PC9zdmc+"
                />
            </button>
                <span>/</span>
            <button onClick={goToGig}>Logo Design</button>
        </div>
    )
}
