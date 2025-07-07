import {
	addSubcCategory,
	deletSubCategory,
	editSubCategory, // ✅ Добавил сюда!
	getSubCategory,
} from '@/store/reducers/subCategory/reducer'

import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	FormControl,
	InputLabel,
	MenuItem,
	Paper,
	Select,
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
import { getCategory } from '@/store/reducers/category/reducer'
import { toast, Toaster } from 'sonner'

export default function SubCategory() {
	const dispatch = useDispatch()
	const { subCategor } = useSelector(store => store.subCategory)
	const { category } = useSelector(store => store.category)
	const [openAdd, setOpenAdd] = useState(false)
	const [openEdit, setOpenEdit] = useState(false)
	const [addName, setAddName] = useState('')
	const [id, setId] = useState('')
	const [editName, setEditName] = useState('')
	const [idx, setIdx] = useState(null)
	const handleAddClickOpen = () => setOpenAdd(true)
	const handleAddClose = () => setOpenAdd(false)
	const [categoryId, setCategoryId] = useState(null)

	const handleEditClickOpen = el => {
		console.log('salom');
		
		category.find(cat =>
			cat.subCategories.find(sub =>
				sub.id === el.id ? setCategoryId(cat.id) : null
			)
		)
		console.log('categoryId = ', categoryId)
		setOpenEdit(true)
		setEditName(el.subCategoryName)
		setId(el.categoryId)
		setIdx(el.id)
	}

	const handleEditClose = () => setOpenEdit(false)

	const handleAddSubCategory = () => {
		const newSub = {
			CategoryId: id,
			SubCategoryName: addName,
		}
		dispatch(addSubcCategory(newSub))
		toast.success('Added success')

		setId('')
		setAddName('')
		setOpenAdd(false)
	}
	const handleEditSubCategory = () => {
		const updatedSub = {
			id: idx,
			CategoryId: categoryId,
			SubCategoryName: editName,
		}
		dispatch(editSubCategory(updatedSub))
		toast.success('Updated success')
		//  console.log(updatedSub);

		setEditName('')
		setId('')
		setIdx(null)
		setOpenEdit(false)
	}

	useEffect(() => {
		dispatch(getSubCategory())
		dispatch(getCategory())
	}, [dispatch])

	return (
		<>
			<h1 className='text-[20px]'>
				<Link className='hover:underline' to='/'>
					Dashboard
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
						<Button variant='outlined'>Categoriya</Button>
					</Link>
					<Link to='/brand'>
						<Button variant='outlined'>Brand</Button>
					</Link>
					<Button variant='contained'>SubCategory</Button>
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
										<Button onClick={() => handleEditClickOpen(row)}>
											Edit
										</Button>
									</div>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>

			{/* Add Modal */}
			<Dialog open={openAdd} onClose={handleAddClose}>
				<DialogTitle>Add Subcategory</DialogTitle>
				<DialogContent sx={{ paddingBottom: 0 }}>
					<DialogContentText>
						Please enter subcategory details below.
					</DialogContentText>
					<Box sx={{ minWidth: 120, width: '180px' }}>
						<FormControl fullWidth>
							<InputLabel id='add-category-label'>Categories</InputLabel>
							<Select
								value={id}
								onChange={e => setId(e.target.value)}
								labelId='add-category-label'
								id='add-category-select'
								label='Categories'
							>
								{category?.map(el => (
									<MenuItem key={el.id} value={el.id}>
										{el.categoryName}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</Box>
					<TextField
						autoFocus
						required
						margin='dense'
						label='Add Subcategory'
						value={addName}
						onChange={e => setAddName(e.target.value)}
						type='text'
						fullWidth
						variant='standard'
					/>
					<DialogActions>
						<Button onClick={handleAddClose}>Cancel</Button>
						<Button onClick={handleAddSubCategory}>Add</Button>
					</DialogActions>
				</DialogContent>
			</Dialog>

			{/* Edit Modal */}
			<Dialog open={openEdit} onClose={handleEditClose}>
				<DialogTitle>Edit Subcategory</DialogTitle>
				<DialogContent sx={{ paddingBottom: 0 }}>
					<DialogContentText>
						Update subcategory details below.
					</DialogContentText>
					
					<TextField
						autoFocus
						required
						margin='dense'
						label='Edit Subcategory'
						value={editName}
						onChange={e => setEditName(e.target.value)}
						type='text'
						fullWidth
						variant='standard'
					/>
					<DialogActions>
						<Button onClick={handleEditClose}>Cancel</Button>
						<Button onClick={handleEditSubCategory}>Save</Button>
					</DialogActions>
				</DialogContent>
			</Dialog>
<Toaster richColors position="top-right" />

		</>
	)
}
