import { deleteProduct, getProduct } from '@/store/reducers/products/reducer'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import { Button, Checkbox } from '@mui/material'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import EditSquareIcon from '@mui/icons-material/EditSquare';
import { API } from '@/utils/config'
import EditIcon from '@mui/icons-material/Edit'
import { Link } from 'react-router-dom'
const Dashboard = () => {
	const dispatch = useDispatch()
	const { products } = useSelector(store => store.dashboard)

	useEffect(() => {
		dispatch(getProduct())
	}, [])
	return (
		<>
       <div className='flex justify-around'> 
			<h1 className='text-[30px]'>Products</h1>
			<Link to='/addNew'><Button  sx={{backgroundColor:'#2563EB',color:'white'}}>+Add Order</Button></Link>
		 </div>
			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 650 }} aria-label='simple table'>
					<TableHead>
						<TableRow>
							<TableCell>
								<div className='flex items-center'>
									<Checkbox defaultChecked />
									<span className='text-[30px]'>Product</span>
								</div>
							</TableCell>
							<TableCell align='center'>Inventory</TableCell>
							<TableCell align='center'>Category</TableCell>
							<TableCell align='center'>Price</TableCell>
							<TableCell align='center'>Action</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{products?.map(row => (
							<TableRow
								key={row.id}
								sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
							>
								<TableCell component='th' scope='row'>
									<div className='flex items-center gap-[30px]'>
										<Checkbox defaultChecked />
										<div className='flex items-center gap-[30px]'>
											<img
												className='w-[70px] h-[70px] rounded-[100px]'
												src={`${API}/images/${row.image}`}
												alt=''
											/>
											<h1>{row.productName}</h1>
										</div>
									</div>
								</TableCell>

								<TableCell align='center'>{row.quantity}</TableCell>
								<TableCell align='center'>{row.categoryName}</TableCell>
								<TableCell align='center'>${row.price}</TableCell>
								<TableCell align='center'>
									<div>
										<Button>
											<EditIcon sx={{ color: 'blue' }} />
										</Button>
										<Button onClick={()=>dispatch(deleteProduct(row.id))}>
											<DeleteOutlineIcon sx={{ color: 'red' }} />
										</Button>
									</div>
						</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</>
	)
}

export default Dashboard
