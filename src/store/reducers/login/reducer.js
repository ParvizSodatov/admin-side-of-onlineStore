import { axiosStandart } from '@/utils/axios'
import { saveToken } from '@/utils/token'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const LoginAdmin=createAsyncThunk('login/Login',async (user) => {
	try {
		let data=await axiosStandart.post("/Account/login",user)
		saveToken(data.data.data)
	} catch (error) {
		console.log(error);
		
	}
})


export const LoginSlice=createSlice({
	name:'login',
	initialState:{
		error:null
	}	
})
export default LoginSlice.reducer