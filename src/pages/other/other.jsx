import { deletCategory, editCategory, getCategory } from '@/store/reducers/category/reducer'
import { API } from '@/utils/config'
import { Button } from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useFetcher } from 'react-router-dom'
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
// import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { editProduct } from '@/store/reducers/products/reducer'
export default function Other(){
const [id,setId]=useState('')
const [editImage,setEditImage]=useState(null)
const [editCategoryName,setEditCategoryName]=useState('')
const [openedit, setOpenEdit] = useState(false);
  const handleEditClickOpen = (el) => {
    setOpenEdit(true);
    setId(el.id)
    setEditCategoryName(el.categoryName)
    setEditImage(el.categoryImage)
  };
  const handleEditClose = () => {
    setOpenEdit(false);
  };
  const{category}=useSelector((store)=>store.category)
  const dispatch=useDispatch()
  function handleEditCategory(){
  //  e.preventDefault()
   const formdata=new FormData()
   formdata.append('CategoryName',editCategoryName)
   formdata.append('Id',id)
   for(let i=0;i<editImage.length;i++){
     formdata.append('CategoryImage',editImage[i])
   }
   dispatch(editCategory(formdata))
  }
  useEffect(()=>{
dispatch(getCategory())
  },[])
  return <>
 <div className='flex gap-[20px]'>
   <Button sx={{border:'1px solid blue'}}>Category</Button>
   <Button sx={{border:'1px solid blue'}}>Brand</Button>
 </div>
 <div>
     <Button sx={{border:'1px solid blue'}}>+Add</Button>
 </div>
<div className='border-[1px] border-red-600 border-solid flex flex-wrap gap-[20px] '>
{
  category?.map((el)=>(
    <div className='border-[1px] border-gray-600 border-solid w-[182px] rounded-[4px]'>
    <img className='w-[100px]' src={`${API}/images/${el.categoryImage}`} alt="" />
    <h1>{el.categoryName}</h1>
    <Button onClick={()=>handleEditClickOpen(el)}><EditIcon/>
    </Button> 
    <Button onClick={()=>dispatch(deletCategory(el.id))}>
         <DeleteOutlineIcon color='error'/> 
      </Button> 
    </div>
  ))
}

</div>


{/* editModal */}
      <Dialog open={openedit} onClose={handleEditClose}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent sx={{ paddingBottom: 0 }}>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText>
         
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              name="text"
              value={editCategoryName}
              onChange={(e)=>setEditCategoryName(e.target.value)}
              label="Email Address"
              type="text"
              fullWidth
              variant="standard"
            />
              <input className='border-[1px] border-solid border-black' type="file"  onChange={(e)=>setEditImage(e.target.files)} />
            <DialogActions>
              <Button onClick={handleEditClose}>Cancel</Button>
              <Button type="submit" onClick={handleEditCategory}>Subscribe</Button>
            </DialogActions>
         
        </DialogContent>
      </Dialog>
  </>
}