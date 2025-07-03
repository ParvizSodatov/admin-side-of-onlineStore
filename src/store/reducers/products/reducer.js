import { axiosRequest, axiosStandart } from '@/utils/axios'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'


export const getProduct=createAsyncThunk('dashboard/getProduct',async () => {
	try {
		let {data}=await axiosStandart.get('/Product/get-products')
		console.log(data)
		 return data.data.products
	} catch (error) {
		console.log(error);
	}
})
export const deleteProduct=createAsyncThunk('dashboard/deleteProduct',async (id,{dispatch}) => {
	try {
		await axiosRequest.delete(`/Product/delete-product?id=${id}`)
dispatch(getProduct())
	} catch (error) {
		console.log(error);
	}
})
export const getColors=createAsyncThunk('dashboard/getColors',async () => {
	try {
		let {data}=await axiosStandart.get("/Color/get-colors")
		return data.data
	} catch (error) {
		console.log(error);	
	}
})
export const dashbordSlice=createSlice({
	name:'dashboard',
	initialState:{
  products:[],
  colors:[]
	},
	extraReducers:(builder)=>{
		builder.addCase(getProduct.fulfilled,(state,action)=>{
			state.products=action.payload
		})
		builder.addCase(getColors.fulfilled,(state,action)=>{
			state.colors=action.payload
		})
	}
})
export default dashbordSlice.reducer