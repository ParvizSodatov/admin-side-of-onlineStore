import {
	addSubcCategory,
	deletSubCategory,
	getSubCategory,
} from '@/store/reducers/subCategory/reducer'
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TextField,
} from '@mui/material'
import { useEffect, useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

export default function SubCategory() {
	const dispatch = useDispatch()
	// const subCategor = useSelector(store => store.subCategory)
	const { subCategor } = useSelector(store => store.subCategory)
	console.log('subCategor :', subCategor)
	const [openAdd, setOpenAdd] = useState(false)
	const [addName, setAddName] = useState('')
	const [id,setId]=useState('')
	const handleAddClickOpen = () => {
		setOpenAdd(true)
	}
	const handleAddClose = () => {
		setOpenAdd(false)
	}
	function handleAddSubCategory() {
		let newSub = {
			CategoryId: Number(id),
			SubCategoryName: addName,
		}
		console.log(newSub);
		
		dispatch(addSubcCategory(newSub))
	}

	useEffect(() => {
		dispatch(getSubCategory())
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
			<div className='flex justify-between w-[65%]'>

				<div className='flex gap-[20px]'>
					<Link to='/other'>
				 	<Button variant='outlined'>
				 Categoriya
				</Button>
				</Link>
				<Link to='/brand'>
				 	<Button variant='outlined'>
				 Brand
				</Button>
				</Link>
					<Button variant='contained'>
				 SubCategory
				</Button>
				</div>


				<Button onClick={handleAddClickOpen} variant='outlined'>
					+addSub
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
						{subCategor?.map(row => (
							<TableRow
								key={row.id}
								sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
							>
								<TableCell align='center'>
									<span className='text-gray-600'>{row.id}</span>
								</TableCell>
								<TableCell align='center'>
									<span className='font-bold'>{row.subCategoryName}</span>
								</TableCell>
								<TableCell align='center'>
									<div>
										<Button onClick={() => dispatch(deletSubCategory(row.id))}>
											<DeleteIcon color='error' sx={{ fontSize: '30px' }} />
										</Button>
										{/* <Button onClick={() => handleEditClickOpen(row)}>
											<EditNoteIcon sx={{ fontSize: '40px' }} />
										</Button> */}
									</div>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>

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
						label='CategoryId'
						value={id}
						onChange={e => setId(e.target.value)}
						type='number'
						fullWidth
						variant='standard'
					/>
					<TextField
						autoFocus
						required
						margin='dense'
						id='name'
						name='email'
						label='Add Subcategory'
						value={addName}
						onChange={e => setAddName(e.target.value)}
						type='text'
						fullWidth
						variant='standard'
					/>
					<DialogActions>
						<Button onClick={handleAddClose}>Cancel</Button>
						<Button type='submit' onClick={handleAddSubCategory}>
							Subscribe
						</Button>
					</DialogActions>
				</DialogContent>
			</Dialog>
		</>
	)
}
