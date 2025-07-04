import { axiosRequest, axiosStandart } from '@/utils/axios'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const getProduct = createAsyncThunk('dashboard/getProduct', async () => {
	try {
		let { data } = await axiosStandart.get('/Product/get-products')
		// console.log(data)
		return data.data.products
	} catch (error) {
		console.log(error)
	}
})
export const deleteProduct = createAsyncThunk(
	'dashboard/deleteProduct',
	async (id, { dispatch }) => {
		try {
			await axiosRequest.delete(`/Product/delete-product?id=${id}`)
			dispatch(getProduct())
		} catch (error) {
			console.log(error)
		}
	}
)
export const getColors = createAsyncThunk('dashboard/getColors', async () => {
	try {
		let { data } = await axiosStandart.get('/Color/get-colors')
		return data.data
	} catch (error) {
		console.log(error)
	}
})

export const addProduct = createAsyncThunk(
	'dashboard/addProduct',
	async formdata => {
		try {
			await axiosRequest.post('/Product/add-product', formdata)
			//   dispatch(getProduct())
		} catch (error) {
			console.log(error)
		}
	}
)

export const getProductById = createAsyncThunk(
	'dashboard/getProductById',
	async id => {
		try {
			let { data } = await axiosRequest(`/Product/get-product-by-id?id=${id}`)
			return data.data
		} catch (error) {
			console.log()
		}
	}
)

export const editProduct = createAsyncThunk(
	'dashboard/editProduct',
	async (
		{
			id,
			BrandId,
			ProductName,
			Description,
			Quantity,
			Code,
			discpuntprice,
			Price,
			SubCategoryId,
			HasDiscount,
		},
		{ dispatch }
	) => {
		try {
			await axiosRequest.put(
				`/Product/update-product?Id=${id}&BrandId=${BrandId}&ColorId=5&ProductName=${ProductName}&Description=${Description}&Quantity=${Quantity}&Weight=XL&Size=10&Code=${Code}&Price=${Price}&HasDiscount=${HasDiscount}&DiscountPrice=5&SubCategoryId=${SubCategoryId}`
			)
			dispatch(getProduct())
		} catch (error) {
			console.log(error)
		}
	}
)
export const dashbordSlice = createSlice({
	name: 'dashboard',
	initialState: {
		products: [],
		colors: [],
		productByid: [],
	},
	extraReducers: builder => {
		builder.addCase(getProduct.fulfilled, (state, action) => {
			state.products = action.payload
		})
		builder.addCase(getColors.fulfilled, (state, action) => {
			state.colors = action.payload
		})
		builder.addCase(getProductById.fulfilled, (state, action) => {
			state.productByid = action.payload
		})
	},
})
export default dashbordSlice.reducer
