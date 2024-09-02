import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material'; // Assuming you're using Material-UI for the Button component
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service';

// Import addGig function if it's in another file
// import { addGig } from './path-to-service'; 

// Placeholder function for addGig. Replace this with the actual implementation or import.
const addGig = (values) => {
    return new Promise((resolve, reject) => {
        // Simulate a successful response
        setTimeout(() => resolve(), 1000);
        // Simulate an error response
        // setTimeout(() => reject(new Error('Failed to save')), 1000);
    });
};

export function BecomeSeller() {
    const navigate = useNavigate();

    function onSaveSeller(values, { setSubmitting }) {
        addGig(values)
            .then(() => {
                showSuccessMsg('Seller saved successfully');
                navigate('/');
            })
            .catch(err => {
                showErrorMsg('Cannot save seller');
            })
            .finally(() => {
                setSubmitting(false);
            });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const values = Object.fromEntries(formData.entries());
        onSaveSeller(values, { setSubmitting: () => {} });
    };

    return (
        <section className="seller-register main-layout full">
            <h1>Register as Seller</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    <span>Full Name
                        <p>Ex. John Smith</p>
                    </span>
                    <input type="text" name="fullName" />
                </label>
                <label>
                    <span>Username
                        <p>This name will be shown to other users</p>
                    </span>
                    <input type="text" name="username" />
                </label>
                <label>
                    <span>Password
                        <p>4 characters or more</p>
                    </span>
                    <input type="password" name="password" />
                </label>
                <div>
                    <span className="flex-column">Profile Picture
                        <p>Add a profile picture of yourself so customers will know exactly who they’ll be working with.</p>
                    </span>
                </div>
                <label>
                    <section className="img-profile-uploader">
                        <div className="img-container">
                            <img
                                src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/b0b4c759-ad9c-4425-a9f4-ab89e2fd9837/de8cefl-35c0bc59-59b9-42ab-b19f-5c73828bb78e.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2IwYjRjNzU5LWFkOWMtNDQyNS1hOWY0LWFiODllMmZkOTgzN1wvZGU4Y2VmbC0zNWMwYmM1OS01OWI5LTQyYWItYjE5Zi01YzczODI4YmI3OGUucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.81ixeN9b4cfDmfBlskK9CUyAMDtRhYNU7lfwTI8WI5Q"
                                alt="Profile placeholder"
                            />
                        </div>
                        <input type="file" accept="image/*" name="profilePicture" id="imgUpload" />
                    </section>
                </label>
                <label>
                    <span>Description
                        <p>Share a bit about your work experience, cool projects you’ve completed, and your area of expertise.</p>
                    </span>
                    <textarea name="description" />
                </label>
                <label>
                    <span>Country
                        <p>Where are you from?</p>
                    </span>
                    <input name="country" />
                </label>
                <div className='btn-form'>
                    <Button variant="contained" color="primary" onClick={() => navigate('/')}>
                        Cancel
                    </Button>
                    <Button variant="contained" color="primary" type="submit">
                        Save
                    </Button>
                </div>
            </form>
        </section>
    );
}
