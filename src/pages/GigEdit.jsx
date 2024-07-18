import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { gigService } from '../services/gig';
import { showSuccessMsg } from '../services/event-bus.service';

export function GigEdit() {
    const navigate = useNavigate();
    const [gigToEdit, setGigToEdit] = useState({
        title: '',
        filledField: '',
        standardField: ''
    });

    function onSaveGig(ev) {

        // ev.preventDefault();
        // gigService.save(gigToEdit)
        //     .then(() => {
        //         navigate('/');
        //         showSuccessMsg(`Gig saved successfully!`);
        //     })
        //     .catch(err => console.log('err:', err));
    }

    function handleChange({ target }) {
        const field = target.name;
        let value = target.value;
        console.log('value :', value)

        switch (target.type) {
            case 'number':
            case 'range':
                value = +value;
                break;
            case 'checkbox':
                value = target.checked;
                break;
            default:
                break;
        }

        setGigToEdit(prevGig => ({ ...prevGig, [field]: value }));
    }

    return (
        <main className="GigEdit">
            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
                onSubmit={onSaveGig}
            >
                <TextField
                    id="title"
                    name="title"
                    label="Outlined"
                    variant="outlined"
                    value={gigToEdit.title}
                    onChange={handleChange}
                />
                <TextField
                    id="price"
                    name="price"
                    label="Outlined"
                    variant="outlined"
                    value={gigToEdit.price}
                    onChange={handleChange}
                />
                <TextField
                    id="title"
                    name="title"
                    label="Outlined"
                    variant="outlined"
                    value={gigToEdit.title}
                    onChange={handleChange}
                />
                <TextField
                    id="title"
                    name="title"
                    label="Outlined"
                    variant="outlined"
                    value={gigToEdit.title}
                    onChange={handleChange}
                />
                <TextField
                    id="title"
                    name="title"
                    label="Outlined"
                    variant="outlined"
                    value={gigToEdit.title}
                    onChange={handleChange}
                />
                <TextField
                    id="title"
                    name="title"
                    label="Outlined"
                    variant="outlined"
                    value={gigToEdit.title}
                    onChange={handleChange}
                />
                <TextField
                    id="title"
                    name="title"
                    label="Outlined"
                    variant="outlined"
                    value={gigToEdit.title}
                    onChange={handleChange}
                />
                <TextField
                    id="title"
                    name="title"
                    label="Outlined"
                    variant="outlined"
                    value={gigToEdit.title}
                    onChange={handleChange}
                />
            </Box>
        </main>
    );
}
