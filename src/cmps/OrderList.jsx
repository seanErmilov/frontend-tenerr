import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Avatar, Button } from '@mui/material';
import { StatusSelect } from './StatusSelect';
import { useState } from 'react';

export function OrderList({ orders, onStatusSelect }) {

    function createData(fullname, buyerImg, title, price, status, _id) {
        return { fullname, buyerImg, title, price, status, _id }
    }

    console.log(orders)
    const rows = orders.map(order => {
        return createData(order.buyer.fullname, order.buyer.imgUrl, order.gig.name, order.gig.price, order.status, order._id)
    })

    const muiTheme = {
        text: {
            '& .MuiOutlinedInput-root': {
                '&.Mui-focused fieldset': {
                    borderColor: '#52b69a', // Change border color when focused
                },
            },
            '& .MuiInputLabel-root.Mui-focused': {
                color: '#ffd56b', // Change label color when focused
            },
        },
        select: {
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#52b69a', // Border color when focused
            },
        },
        button: {
            color: 'black',
            backgroundColor: '#ffd56b',
            '&:hover': {
                backgroundColor: '#52b69a', // Background color on hover
            },
        },
        checkbox: {
            color: '#52b69a', // Default color
            '&.Mui-checked': {
                color: '#52b69a', // Color when checked
            },
        },
    }




    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Buyer</TableCell>
                        <TableCell align="left">Gig</TableCell>
                        <TableCell align="left">Total</TableCell>
                        <TableCell align="left">Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={row._id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row" align='left'>
                                <Avatar alt="Remy Sharp" src={row.buyerImg} />
                                {row.fullname}
                            </TableCell>
                            <TableCell align="left">{row.title}</TableCell>
                            <TableCell align="left">US${row.price}</TableCell>
                            <TableCell align="left"><StatusSelect sx={muiTheme} onStatusSelect={onStatusSelect} status={row.status} orderId={row._id} /></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}