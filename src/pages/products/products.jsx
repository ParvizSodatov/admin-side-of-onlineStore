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
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { API } from '@/utils/config'
import EditIcon from '@mui/icons-material/Edit'
import { Link } from 'react-router-dom'
import { toast, Toaster } from 'sonner'

const Dashboard = () => {
	const dispatch = useDispatch()
	const { products } = useSelector(store => store.dashboard)

	const [selectedProducts, setSelectedProducts] = useState([])

	useEffect(() => {
		dispatch(getProduct())
	}, [dispatch])


	function handleSelect(id) {
		if (selectedProducts.includes(id)) {
			setSelectedProducts(selectedProducts.filter(pid => pid !== id))
		} else {
			setSelectedProducts([...selectedProducts, id])
		}
	}
	function handleDeleteSelected() {
		selectedProducts.forEach(id => {
			dispatch(deleteProduct(id))
		})
		setSelectedProducts([]) 	
	}
	return (
		<>
			<div className='flex justify-around items-center'>
				<h1 className='text-[30px]'>Products</h1>
				<div className='flex gap-4'>
					<Link to='/addNew'>
						<Button sx={{ backgroundColor: '#2563EB', color: 'white' }}>
							+ Add Product
						</Button>
					</Link>
					{selectedProducts.length > 0 && (
						<Button
							sx={{ backgroundColor: 'red', color: 'white' }}
							onClick={handleDeleteSelected}
						>
							Remove Selected
						</Button>
					)}
				</div>
			</div>
			<TableContainer component={Paper} sx={{ marginTop: '30px' }}>
				<Table sx={{ minWidth: 650 }} aria-label='simple table'>
					<TableHead>
						<TableRow>
							<TableCell>
								<div className='flex items-center'>
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
										<Checkbox
											checked={selectedProducts.includes(row.id)}
											onChange={() => handleSelect(row.id)}
										/>
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
										<Link to={`/editProduct/${row.id}`}>
											<Button>
												<EditIcon sx={{ color: 'blue' }} />
											</Button>
										</Link>
										<Button onClick={() => dispatch(deleteProduct(row.id))}>
											<DeleteOutlineIcon sx={{ color: 'red' }} />
										</Button>
									</div>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
			<Toaster position="bottom-right" richColors />
		</>
	)
}

export default Dashboard
