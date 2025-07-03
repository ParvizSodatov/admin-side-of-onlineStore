import { configureStore } from '@reduxjs/toolkit'
import LoginSlice from './reducers/login/reducer'
import dashbordSlice from './reducers/products/reducer'
import  categorySlice  from './reducers/category/reducer'
import  brandsSlice  from './reducers/brands/reducer'
import  subCategorySlice  from './reducers/subCategory/reducer'

export const store = configureStore({
	reducer: {
		login: LoginSlice,
		dashboard: dashbordSlice,
		category:categorySlice,
		brand:brandsSlice,
		subCategory:subCategorySlice
	},
})
