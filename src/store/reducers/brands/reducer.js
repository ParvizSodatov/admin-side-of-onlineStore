import { axiosStandart } from '@/utils/axios'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const getBrands=createAsyncThunk('brand/getBrands',async () => {
	try {
	let {data}=await axiosStandart.get('/Brand/get-brands')	
	return data.data
	} catch (error) {
		console.log(error);
		
	}
})
export const brandsSlice=createSlice({
	name:'brand',
	initialState:{
		brand:[]
	},
	extraReducers:(builder)=>{
	builder.addCase(getBrands.fulfilled,(state,action)=>{
		state.brand=action.payload
	})
	}
})
export default brandsSlice.reducer