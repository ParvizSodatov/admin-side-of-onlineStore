import {
  addCategory,
  deletCategory,
  editCategory,
  getCategory,
} from '@/store/reducers/category/reducer'
import { API } from '@/utils/config'
import { Button, Paper, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import EditIcon from '@mui/icons-material/Edit'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import Upload from '@mui/icons-material/Upload'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { Toaster, toast } from 'sonner'

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

  const handleEditClickOpen = (el) => {
    setOpenEdit(true)
    setId(el.id)
    setEditCategoryName(el.categoryName)
    setEditImage(el.categoryImage)
  }
  const handleEditClose = () => {
    setOpenEdit(false)
  }

  const dispatch = useDispatch()
  const { category } = useSelector((store) => store.category)
  //  console.log(category)
  async function handleAdd() {
    const formData = new FormData()
    formData.append('CategoryName', addCategoryName)
    for (let i = 0; i < addImage.length; i++) {
      formData.append('CategoryImage', addImage[i])
    }
    const result = await dispatch(addCategory(formData))
    if (addCategory.fulfilled.match(result)) {
      toast.success('Category added successfully!')
    }
    setOpenAdd(false)
    setAddCategoryName('')
    setAddImage(null)
  }

  async function handleEditCategory() {
    const formData = new FormData()
    formData.append('CategoryName', editCategoryName)
    formData.append('Id', id)
    for (let i = 0; i < editImage.length; i++) {
      formData.append('CategoryImage', editImage[i])
    }
    const result = await dispatch(editCategory(formData))
    if (editCategory.fulfilled.match(result)) {
      toast.success('Category updated successfully!')
    }
    setOpenEdit(false)
  }

  useEffect(() => {
    dispatch(getCategory())
  }, [])

  return (
    <>
      <section className="flex justify-between w-[80%]">
        <div className="flex gap-[20px]">
          <Button variant='contained'>
            Category
          </Button>
          <Link to="/brand">
            <Button variant='outlined'>Brand</Button>
          </Link>
          <Link to="/subCategory">
            <Button variant='outlined'>SubCategory</Button>
          </Link>
        </div>
        <div>
          <Button
            sx={{ border: '1px solid blue' }}
            onClick={handleAddClickOpen}
          >
            +Add Category
          </Button>
        </div>
      </section>

      <div className="flex flex-wrap gap-[20px] mt-[30px]">
        {category?.map((el) => (
          <div
            key={el.id}
            className="w-[182px] border border-gray-300 rounded-[8px] overflow-hidden shadow-md transition-transform hover:scale-105 hover:shadow-lg"
          >
            <div className="flex flex-col items-center p-4">
              <img
                className="w-[100px] h-[100px] object-cover rounded-md mb-2"
                src={`${API}/images/${el.categoryImage}`}
                alt=""
              />
              <h1 className="text-center text-gray-400 font-semibold mb-3">
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

      {/* Edit Modal */}
      <Dialog open={openedit} onClose={handleEditClose}>
        <DialogTitle>Edit Category</DialogTitle>
        <DialogContent sx={{ paddingBottom: 0 }}>
          <DialogContentText>
            You can edit the category name or upload a new image.
          </DialogContentText>

          <TextField
            autoFocus
            required
            margin="dense"
            id="edit-name"
            name="text"
            value={editCategoryName}
            onChange={(e) => setEditCategoryName(e.target.value)}
            label="Category Name"
            type="text"
            fullWidth
            variant="standard"
          />

          <Paper
            variant="outlined"
            sx={{
              p: 2,
              mt: 2,
              textAlign: 'center',
              position: 'relative',
              cursor: 'pointer',
              border: '2px dashed #ccc',
              '&:hover': { borderColor: '#999' },
            }}
            onClick={() => document.getElementById('edit-file-upload')?.click()}
          >
            <input
              id="edit-file-upload"
              type="file"
              accept="image/*"
              hidden
              multiple={false}
              onChange={(e) => setEditImage(e.target.files)}
            />
            <Upload sx={{ fontSize: 30, mb: 1 }} />
            <Typography variant="body2">
              Click to upload or drag & drop
            </Typography>
            <Typography variant="caption">(SVG, JPG, PNG, or GIF)</Typography>
          </Paper>

          <DialogActions>
            <Button onClick={handleEditClose}>Cancel</Button>
            <Button type="submit" onClick={handleEditCategory}>
              Save
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>

      {/* Add Modal */}
      <Dialog open={openAdd} onClose={handleAddClose}>
        <DialogTitle>Add Category</DialogTitle>
        <DialogContent sx={{ paddingBottom: 0 }}>
          <DialogContentText>
            Enter a new category name and upload an image.
          </DialogContentText>

          <TextField
            autoFocus
            required
            margin="dense"
            id="add-name"
            name="text"
            value={addCategoryName}
            onChange={(e) => setAddCategoryName(e.target.value)}
            label="Category Name"
            type="text"
            fullWidth
            variant="standard"
          />

          <Paper
            variant="outlined"
            sx={{
              p: 2,
              mt: 2,
              textAlign: 'center',
              position: 'relative',
              cursor: 'pointer',
              border: '2px dashed #ccc',
              '&:hover': { borderColor: '#999' },
            }}
            onClick={() => document.getElementById('add-file-upload')?.click()}
          >
            <input
              id="add-file-upload"
              type="file"
              accept="image/*"
              hidden
              multiple={false}
              onChange={(e) => setAddImage(e.target.files)}
            />
            <Upload sx={{ fontSize: 30, mb: 1 }} />
            <Typography variant="body2">
              Click to upload or drag & drop
            </Typography>
            <Typography variant="caption">(SVG, JPG, PNG, or GIF)</Typography>
          </Paper>
          <DialogActions>
            <Button onClick={handleAddClose}>Cancel</Button>
            <Button type="submit" onClick={handleAdd}>
              Save
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>

      <Toaster position="top-center" richColors />
    </>
  )
}
