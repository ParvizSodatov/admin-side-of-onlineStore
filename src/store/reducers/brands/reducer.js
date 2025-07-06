import { axiosRequest, axiosStandart } from '@/utils/axios'
// import { create } from '@mui/material/styles/createTransitions'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { toast } from 'sonner'

export const getBrands=createAsyncThunk('brand/getBrands',async () => {
	try {
	let {data}=await axiosStandart.get('/Brand/get-brands')	
	return data.data
	} catch (error) {
		console.log(error);
	}
})
export const deleteBrands=createAsyncThunk('brand/deleteBrands',async (id,{dispatch}) => {
	try {
		await axiosRequest.delete(`/Brand/delete-brand?id=${id}`)
		dispatch(getBrands())
		toast.success('The brand is deleted succesfully')
	} catch (error) {
		console.log(error);
	}
})
export const editBrands=createAsyncThunk('brand/brandsSlice',async (dispatch) => {

	try {
		await axiosRequest.put(`/Brand/update-brand?Id=${dispatch.Id}&BrandName=${dispatch.BrandName}`,)
		   dispatch.dispatch(getBrands())
	} catch (error) {
		console.log(error);
	}
})

export const addBrands=createAsyncThunk('brand/addBrands',async (newBrand,{dispatch}) => {
	try {
	await axiosRequest.post(`/Brand/add-brand?BrandName=${newBrand.BrandName}`)
	dispatch(getBrands())
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