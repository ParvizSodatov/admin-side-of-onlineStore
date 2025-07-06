import {
	addBrands,
	deleteBrands,
	editBrands,
	getBrands,
} from '@/store/reducers/brands/reducer'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { Button } from '@mui/material'
// import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
// import EditSquareIcon from '@mui/icons-material/EditSquare';
import EditNoteIcon from '@mui/icons-material/EditNote'
import DeleteIcon from '@mui/icons-material/Delete'
import { Link } from 'react-router-dom'
import { blue } from '@mui/material/colors'
import { toast, Toaster } from 'sonner'
export default function Brand() {
	const [openEdit, setOpenEdit] = useState(false)
	const [brandId, setBrandId] = useState(null)
	const [brandName, setBrandName] = useState('')
	const [openAdd, setOpenAdd] = useState(false)
	const [addName, setAddName] = useState('')

	const handleAddClickOpen = () => {
		setOpenAdd(true)
	}
	const handleAddClose = () => {
		setOpenAdd(false)
	}
	function handleAddBrand() {
		let newAddBrand = {
			BrandName: addName,
			// dispatch
		}
		console.log(addName)

		dispatch(addBrands(newAddBrand))
      toast.success('the brand added succesfuly')
		  		setOpenAdd(false)
				setAddName('')

	}
	const handleEditClickOpen = el => {
		setOpenEdit(true)
		setBrandId(el.id)
		setBrandName(el.brandName)
	}
	const handleEditClose = () => {
		setOpenEdit(false)
	}
	function handleEdit() {
		let newEditUser = {
			BrandName: brandName,
			Id: brandId,
			dispatch,
		}
		dispatch(editBrands(newEditUser))
		setOpenEdit(false)
		toast.success('The brand updated succesfully')
	}
	const dispatch = useDispatch()
	const { brand } = useSelector(store => store.brand)
	console.log('brand :', brand)
	useEffect(() => {
		dispatch(getBrands())
	}, [])
	return (
		<>
			<h1 className='text-[20px]'>
				<Link className='hover:underline' to='/'>
					Dasboard
				</Link>
				/
				<Link className='hover:underline' to='/other'>
					Other
				</Link>
				<h1 className='text-[30px]'>Other</h1>
			</h1>
			<div className='mt-[30px] flex justify-between w-[75%]'>
				<div className='flex gap-[6px]'>
					<Link to='/other'>
						<Button sx={{ border: '1px solid blue' }}>Category</Button>
					</Link>

					<Button sx={{ backgroundColor:'blue',color:'white' }}>Brand</Button>
				</div>

				<Button onClick={handleAddClickOpen} sx={{ border: '1px solid blue' }}>
					+Add Brand
				</Button>
			</div>
			<TableContainer
				component={Paper}
				sx={{ width: '65%', marginTop: '50px' }}
			>
				<Table sx={{ minWidth: 650 }} aria-label='simple table'>
					<TableHead>
						<TableRow>
							<TableCell align='center' sx={{ color: 'gray' }}>
								ID
							</TableCell>
							<TableCell align='center' sx={{ color: 'gray' }}>
								Brand
							</TableCell>
							<TableCell align='center' sx={{ color: 'gray' }}>
								Action
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{brand?.map(row => (
							<TableRow
								key={row.id}
								sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
							>
								<TableCell align='center'>
									<span className='text-gray-600'>{row.id}</span>
								</TableCell>
								<TableCell align='center'>
									<span className='font-bold'>{row.brandName}</span>
								</TableCell>
								<TableCell align='center'>
									<div>
										<Button onClick={() => dispatch(deleteBrands(row.id))}>
											<DeleteIcon color='error' sx={{ fontSize: '30px' }} />
										</Button>
										<Button onClick={() => handleEditClickOpen(row)}>
											<EditNoteIcon sx={{ fontSize: '40px' }} />
										</Button>
									</div>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>

			{/* editModal */}
			<Dialog open={openEdit} onClose={handleEditClose}>
				<DialogTitle>Subscribe</DialogTitle>
				<DialogContent sx={{ paddingBottom: 0 }}>
					<DialogContentText>
						To subscribe to this website, please enter your email address here.
						We will send updates occasionally.
					</DialogContentText>
					<TextField
						autoFocus
						required
						margin='dense'
						id='name'
						name='email'
						label='Email Address'
						value={brandName}
						onChange={e => setBrandName(e.target.value)}
						type='text'
						fullWidth
						variant='standard'
					/>
					<DialogActions>
						<Button onClick={handleEditClose}>Cancel</Button>
						<Button type='submit' onClick={handleEdit}>
							Subscribe
						</Button>
					</DialogActions>
				</DialogContent>
			</Dialog>

			{/* addModal */}
			<Dialog open={openAdd} onClose={handleAddClose}>
				<DialogTitle>Subscribe</DialogTitle>
				<DialogContent sx={{ paddingBottom: 0 }}>
					<DialogContentText>
						To subscribe to this website, please enter your email address here.
						We will send updates occasionally.
					</DialogContentText>
					<TextField
						autoFocus
						required
						margin='dense'
						id='name'
						name='email'
						label='Add Brand'
						value={addName}
						onChange={e => setAddName(e.target.value)}
						type='text'
						fullWidth
						variant='standard'
					/>
					<DialogActions>
						<Button onClick={handleAddClose}>Cancel</Button>
						<Button type='submit' onClick={handleAddBrand}>
							Subscribe
						</Button>
					</DialogActions>
				</DialogContent>
			</Dialog>
			  <Toaster position="top-center" richColors />
		</>
	)
}
