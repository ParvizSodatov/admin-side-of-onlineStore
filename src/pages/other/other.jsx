import {
  addCategory,
	deletCategory,
	editCategory,
	getCategory,
} from '@/store/reducers/category/reducer'
import { API } from '@/utils/config'
import { Button } from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useFetcher } from 'react-router-dom'
import EditIcon from '@mui/icons-material/Edit'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
// import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
// import { editProduct } from '@/store/reducers/products/reducer'
export default function Other() {
	const [id, setId] = useState('')
	const [editImage, setEditImage] = useState(null)
	const [editCategoryName, setEditCategoryName] = useState('')
	const [openedit, setOpenEdit] = useState(false)

 const [addImage, setAddImage] = useState(null)
	const [addCategoryName, setAddCategoryName] = useState('')
	const [openAdd, setOpenAdd] = useState(false)
	const handleAddClickOpen = () => {
		setOpenAdd(true)

	}
	const handleAddClose = () => {
		setOpenAdd(false)
	}

function handleAdd(){
  const formData=new FormData()
   formData.append('CategoryName',addCategoryName)
   for(let i=0;i<addImage.length;i++){
formData.append('CategoryImage',addImage[i])
   }
   dispatch(addCategory(formData))
}
	const handleEditClickOpen = el => {
		setOpenEdit(true)
		setId(el.id)
		setEditCategoryName(el.categoryName)
		setEditImage(el.categoryImage)
	}
	const handleEditClose = () => {
		setOpenEdit(false)
	}
	const { category } = useSelector(store => store.category)
	const dispatch = useDispatch()
	function handleEditCategory() {
		//  e.preventDefault()
		const formdata = new FormData()
		formdata.append('CategoryName', editCategoryName)
		formdata.append('Id', id)
		for (let i = 0; i < editImage.length; i++) {
			formdata.append('CategoryImage', editImage[i])
		}
		dispatch(editCategory(formdata))
		setOpenEdit(false)
	}
	useEffect(() => {
		dispatch(getCategory())
	}, [])
	return (
		<>
		<section className='flex justify-between w-[80%]'>
      	<div className='flex gap-[20px]'>
				<Button sx={{ border: '1px solid blue' }}>Category</Button>
				<Button sx={{ border: '1px solid blue' }} >Brand</Button>
			</div>
			<div>
				<Button sx={{ border: '1px solid blue' }} onClick={handleAddClickOpen}>+Add</Button>
			</div>
    </section>
			<div className="flex flex-wrap gap-[20px] mt-[30px]">
  {category?.map(el => (
    <div
      key={el.id}
      className="w-[182px] border border-gray-300 rounded-[8px] overflow-hidden shadow-md bg-white transition-transform hover:scale-105 hover:shadow-lg"
    >
      <div className="flex flex-col items-center p-4">
        <img
          className="w-[100px] h-[100px] object-cover rounded-md mb-2"
          src={`${API}/images/${el.categoryImage}`}
          alt=""
        />
        <h1 className="text-center text-gray-800 font-semibold mb-3">
          {el.categoryName}
        </h1>
        <div className="flex justify-center gap-2">
          <Button
            className="!min-w-0 !p-2 hover:scale-110 hover:bg-blue-100 transition-all rounded-full"
            onClick={() => handleEditClickOpen(el)}
          >
            <EditIcon className="text-blue-500" />
          </Button>
          <Button
            className="!min-w-0 !p-2 hover:scale-110 hover:bg-red-100 transition-all rounded-full"
            onClick={() => dispatch(deletCategory(el.id))}
          >
            <DeleteOutlineIcon className="text-red-500" />
          </Button>
        </div>
      </div>
    </div>
  ))}
</div>


			{/* editModal */}
			<Dialog open={openedit} onClose={handleEditClose}>
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
						name='text'
						value={editCategoryName}
						onChange={e => setEditCategoryName(e.target.value)}
						label='Email Address'
						type='text'
						fullWidth
						variant='standard'
					/>
					<input
						className='border-[1px] border-solid border-black'
						type='file'
						onChange={e => setEditImage(e.target.files)}
					/>
					<DialogActions>
						<Button onClick={handleEditClose}>Cancel</Button>
						<Button type='submit' onClick={handleEditCategory}>
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
						name='text'
						value={addCategoryName}
						onChange={e => setAddCategoryName(e.target.value)}
						label='Email Address'
						type='text'
						fullWidth
						variant='standard'
					/>
					<input
						className='border-[1px] border-solid border-black'
						type='file'
						onChange={e => setAddImage(e.target.files)}
					/>
					<DialogActions>
						<Button onClick={handleAddClose}>Cancel</Button>
						<Button type='submit' onClick={handleAdd}>
							Subscribe
						</Button>
						
					</DialogActions>
				</DialogContent>
			</Dialog>
		</>
	)
}
