import { axiosStandart } from '@/utils/axios'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const getSubCategory=createAsyncThunk('subCategory/getSubCategory',async () => {
try {
	let {data}=await axiosStandart('/SubCategory/get-sub-category')
	return data.data
} catch (error) {
	console.log(error);
	
}	
})
export const subCategorySlice=createSlice({
	name:'subCategory',
	initialState:{
		subCategor:[]
	},
	extraReducers:(builder)=>{
		builder.addCase(getSubCategory.fulfilled,(state,action)=>{
			state.subCategor=action.payload
		})
	}


})
export default subCategorySlice.reducer
