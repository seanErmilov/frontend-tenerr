import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Avatar } from '@mui/material';
import { StatusSelect } from './StatusSelect';

export function OrderList({ orders, onStatusSelect }) {

    function createData(fullname, buyerImg, title, price, status, _id) {
        return { fullname, buyerImg, title, price, status, _id }
    }
    console.log("Orders: ", orders)
    const rows = orders.map(order => {
        return createData(order.buyer.fullname, order.buyer.imgUrl, order.gig.name, order.gig.price, order.status, order._id)
    })

    const muiTheme = {
        text: {
            '& .MuiOutlinedInput-root': {
                '&.Mui-focused fieldset': {
                    borderColor: '#52b69a',
                },
            },
            '& .MuiInputLabel-root.Mui-focused': {
                color: '#ffd56b',
            },
        },
        select: {
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#52b69a',
            },
        },
        button: {
            color: 'black',
            backgroundColor: '#ffd56b',
            '&:hover': {
                backgroundColor: '#52b69a',
            },
        },
        checkbox: {
            color: '#52b69a',
            '&.Mui-checked': {
                color: '#52b69a',
            },
        },
    }




    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Buyer</TableCell>
                        <TableCell align="left" className="title-column" >Gig</TableCell>
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
                            <td className="title-column" style={{ borderBottom: '1px solid #ddd', padding: '8px' }} align="left">{row.title}</td>
                            <TableCell className='total' align="left">${row.price}</TableCell>
                            <TableCell className='status' align="left"><StatusSelect sx={muiTheme} onStatusSelect={onStatusSelect} status={row.status} orderId={row._id} /></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}