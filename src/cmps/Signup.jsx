import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

import { signup } from '../store/actions/user.actions'

import { ImgUploader } from './ImgUploader'
import { userService } from '../services/user'

export function Signup({ handleClose }) {
    const [credentials, setCredentials] = useState(userService.getEmptyUser())
    const navigate = useNavigate()

    function clearState() {
        setCredentials({ username: '', password: '', fullname: '', imgUrl: '' })
    }

    function handleChange(ev) {
        const field = ev.target.name
        const value = ev.target.value
        setCredentials({ ...credentials, [field]: value })
    }

    async function onSignup(ev = null) {
        if (ev) ev.preventDefault()

        if (!credentials.username || !credentials.password || !credentials.fullname) return
        credentials.rate = 4
        credentials.level = 'standard'
        credentials.descripton = 'An experienced logo designer with a passion for creating unique brand identities.'

        await signup(credentials)
        clearState()
        handleClose()
    }

    function onUploaded(imgUrl) {
        setCredentials({ ...credentials, imgUrl })
    }

    return (
        <form className="signup-form" onSubmit={onSignup}>
            <input
                type="text"
                name="fullname"
                value={credentials.fullname}
                placeholder="Fullname"
                onChange={handleChange}
                required
            />
            <input
                type="text"
                name="username"
                value={credentials.username}
                placeholder="Username"
                onChange={handleChange}
                required
            />
            <input
                type="password"
                name="password"
                value={credentials.password}
                placeholder="Password"
                onChange={handleChange}
                required
            />
            <ImgUploader onUploaded={onUploaded} />
            <button>Signup</button>
        </form>
    )
}
