import { configureStore } from '@reduxjs/toolkit'
import  LoginSlice  from './reducers/login/reducer'

export const store=configureStore({
	reducer:{
     login:LoginSlice
	}
})