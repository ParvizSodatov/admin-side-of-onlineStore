import { axiosRequest, axiosStandart } from '@/utils/axios'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
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
	  } catch (error) {
		console.log(error);
		
	  }
  })

  export const editCategory=createAsyncThunk('category/categorySlice',async (formdata,{dispatch}) => {
	try {
		await axiosRequest.put('/Category/update-category',formdata)
		dispatch(getCategory())
	} catch (error) {
		console.log(error);
	}
  })

  export const addCategory=createAsyncThunk('category/addCategory',async (fromData,{dispatch}) => {
	try {
		await axiosRequest.post('/Category/add-category',fromData)
		dispatch(getCategory())
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