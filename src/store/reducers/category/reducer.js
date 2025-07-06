import { axiosRequest, axiosStandart } from '@/utils/axios'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { toast } from 'sonner'
export const getCategory=createAsyncThunk('category/getCategory',async () => {
	try {
		let {data}=await axiosStandart.get('/Category/get-categories')
		return data.data
	} catch (error) {
		console.log(error);
		
	}
})
  export const deletCategory=createAsyncThunk('category/deletCategory',async (id,{dispatch}) => {
	  try {
	await axiosRequest.delete(`/Category/delete-category?id=${id}`)
		dispatch(getCategory())
		toast.success('the category is deleted successfully')
	  } catch (error) {
		console.log(error);
		
	  }
  })

  export const editCategory=createAsyncThunk('category/categorySlice',async (formdata,{dispatch}) => {
	try {
		await axiosRequest.put('/Category/update-category',formdata)
		dispatch(getCategory())
		toast.success('the category is updated successfully 	')
	} catch (error) {
		console.log(error);
	}
  })

  export const addCategory=createAsyncThunk('category/addCategory',async (fromData,{dispatch}) => {
	try {
		await axiosRequest.post('/Category/add-category',fromData)
		dispatch(getCategory())
		toast.success('the category is added successfully')
	} catch (error) {
		console.log(error);
		
	}
  })

export const categorySlice=createSlice({
	name:'category',
	initialState:{
		category:[]
	},
	extraReducers:(builder)=>{
		builder.addCase(getCategory.fulfilled,(state,action)=>{
			state.category=action.payload
		})
	}
})
export default categorySlice.reducer