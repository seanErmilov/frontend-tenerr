import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { useState } from 'react'

export function StatusSelect({ status, onStatusSelect, orderId }) {
    const [statusToEdit, setStatusToEdit] = useState(status)

    function handleChange(event) {
        setStatusToEdit(event.target.value)
        if (handleChange) {
            onStatusSelect(event.target.value, orderId)
        }
    }

    const statusColors = {
        pending: '#f8e5a0',  // Soft yellow
        completed: '#a3d9a5', // Soft green
        rejected: '#f4a6a1'  // Soft red
    }

    const selectColor = statusColors[statusToEdit]

    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id="status-select-label">Status</InputLabel>
                <Select
                    labelId="status-select-label"
                    id="status-select"
                    value={statusToEdit}
                    label="Status"
                    onChange={handleChange}
                    sx={{ color: selectColor }} // Dynamic color
                >
                    <MenuItem sx={{ color: '#f8e5a0' }} value={'pending'}>In progress</MenuItem>
                    <MenuItem sx={{ color: '#a3d9a5' }} value={'completed'}>Completed</MenuItem>
                    <MenuItem sx={{ color: '#f4a6a1' }} value={'rejected'}>Rejected</MenuItem>
                </Select>
            </FormControl>
        </Box>
    )
}
