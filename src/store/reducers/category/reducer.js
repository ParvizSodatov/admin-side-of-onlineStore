import { axiosStandart } from '@/utils/axios'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
export const getCategory=createAsyncThunk('category/getCategory',async () => {
	try {
		let {data}=await axiosStandart.get('/Category/get-categories')
		return data.data
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