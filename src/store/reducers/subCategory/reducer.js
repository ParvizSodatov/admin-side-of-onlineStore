import { axiosRequest, axiosStandart } from '@/utils/axios'
import { Category } from '@mui/icons-material'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { toast } from 'sonner'

export const getSubCategory = createAsyncThunk(
	'subCategory/getSubCategory',
	async () => {
		try {
			let { data } = await axiosStandart('/SubCategory/get-sub-category')
			return data.data
		} catch (error) {
			console.log(error)
		}
	}
)
export const deletSubCategory = createAsyncThunk(
	'subCategory/deletSubCategory',
	async (id, { dispatch }) => {
		try {
			await axiosRequest.delete(`/SubCategory/delete-sub-category?id=${id}`)
			dispatch(getSubCategory())
			toast.success('deleted succesfully')
		} catch (error) {
			console.log(error)
		}
	}
)

export const addSubcCategory = createAsyncThunk(
	'subCategory/addSubcCategory',
	async (newSub, { dispatch }) => {
		try {
			await axiosRequest.post(
				`/SubCategory/add-sub-category?CategoryId=${newSub.CategoryId}&SubCategoryName=${newSub.SubCategoryName}`
			)
			dispatch(getSubCategory())
		} catch (error) {
			console.log()
		}
	}
)
export const editSubCategory = createAsyncThunk(
	'subCategory/editSubCategory',
	async ({id, CategoryId, SubCategoryName},{dispatch}) => {
		try {
			await axiosRequest.put(
				`/SubCategory/update-sub-category?Id=${id}&CategoryId=${CategoryId}&SubCategoryName=${SubCategoryName}`
			)
			dispatch(getSubCategory())
		} catch (error) {
			console.log(error)
		}
	}
)
export const subCategorySlice = createSlice({
	name: 'subCategory',
	initialState: {
		subCategor: [],
	},
	extraReducers: builder => {
		builder.addCase(getSubCategory.fulfilled, (state, action) => {
			state.subCategor = action.payload
		})
	},
})
export default subCategorySlice.reducer
