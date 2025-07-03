import { getBrands } from '@/store/reducers/brands/reducer'
import { getCategory } from '@/store/reducers/category/reducer'
import { getColors } from '@/store/reducers/products/reducer'
import { getSubCategory } from '@/store/reducers/subCategory/reducer'
import { Upload } from '@mui/icons-material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import {
	Box,
	Button,
	FormControl,
	InputLabel,
	MenuItem,
	Paper,
	Select,
	TextareaAutosize,
	TextField,
	Typography,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
export default function AddNew() {
	const dispatch = useDispatch()
	const { colors } = useSelector(store => store.dashboard)
	const [productName, setAddName] = useState('')
	const [code, setCode] = useState('')
	const [description, setDescription] = useState('')
	const [categories, setCategories] = useState('')
	const [brands, setBrands] = useState('')
	const [subcategory, setSubcategories] = useState('')
	const [price, setPrice] = useState('')
	const [discount, setDiscount] = useState('')
	const [count, setCount] = useState('')

	const { category } = useSelector(store => store.category)
	const { brand } = useSelector(store => store.brand)
   const {subCategor}=useSelector((store)=>store.subCategory)

	useEffect(() => {
		dispatch(getCategory())
		dispatch(getColors())
		dispatch(getSubCategory())
		dispatch(getBrands())
	}, [])
	return (
		<>
			<div className='flex text-[40px] items-center justify-around gap-[550px]'>
				<div>
					{' '}
					<Link to='/products'>
						<Button>
							<ArrowBackIcon sx={{ fontSize: '44px' }} />
						</Button>
					</Link>
					<span className='font-bold'>Product/Add new</span>
				</div>
				<div className='flex gap-[10px]'>
					<Button variant='outlined'>Cancel</Button>
					<Button variant='contained'>Save</Button>
				</div>
			</div>
			<h1 className='font-bold mt-[30px] ml-[30px] text-[26px]'>information</h1>
			<section className='flex  gap-[100px]'>
				<aside className='mt-[30px] w-[60%]'>
					<div className='w-[100%] flex justify-between'>
						<TextField
							sx={{ width: '70%' }}
							id='outlined-basic'
							label='Product Name'
							value={productName}
							onChange={e => setAddName(e.target.value)}
							variant='outlined'
						/>
						<TextField
							sx={{ width: '25%' }}
							id='outlined-basic'
							label='Code'
							value={code}
							onChange={e => setCode(e.target.value)}
							variant='outlined'
						/>
					</div>
					<TextareaAutosize
						aria-label='empty textarea'
						value={description}
						onChange={e => setDescription(e.target.value)}
						placeholder='Description'
						style={{
							width: '100%',
							border: '1px solid grey',
							marginTop: '20px',
							borderRadius: '6px',
							height: '35vh',
							paddingLeft: '10px',
							paddingTop: '10px',
						}}
					/>
					<div className='w-[100%] flex justify-between mt-[30px] gap-[20px]'>
						<Box sx={{ minWidth: 120, width: '180px' }}>
							<FormControl fullWidth>
								<InputLabel id='demo-simple-select-label'>
									Categories
								</InputLabel>
								<Select
									value={categories}
									onChange={e => setCategories(e.target.value)}
									labelId='demo-simple-select-label'
									id='demo-simple-select'
									label='Categories'
								>
									{category?.map(el => (
										<MenuItem key={el.id} value={el.id}>
											{el.categoryName}
										</MenuItem>
									))}
								</Select>
							</FormControl>
						</Box>
						<Box sx={{ minWidth: 120, width: '180px' }}>
							<FormControl fullWidth>
								<InputLabel id='demo-simple-select-label'>Brands</InputLabel>
								<Select
									labelId='demo-simple-select-label'
									id='demo-simple-select'
									value={brands}
									onChange={e => setBrands}
									label='Categories'
								>
									{brand?.map(el => (
										<MenuItem key={el.id} value={el.id}>
											{el.brandName}
										</MenuItem>
									))}
								</Select>
							</FormControl>
						</Box>
						<Box sx={{ minWidth: 120, width: '180px' }}>
							<FormControl fullWidth>
								<InputLabel id='demo-simple-select-label'>
									subcategory
								</InputLabel>
								<Select
									labelId='demo-simple-select-label'
									id='demo-simple-select'
									value={subcategory}
									onChange={e => setSubcategories(e.target.value)}
									label='Categories'	
								>
									{
										subCategor?.map((el)=>(
											 <MenuItem value={el.id}>{el.subCategoryName}</MenuItem>
											
										))
									}

									
								</Select>
							</FormControl>
						</Box>
					</div>
					<h1 className='font-bold mt-[20px] ml-[10px] text-[25px]'>Price</h1>
					<div className='flex justify-between mt-[20px] gap-[20px]'>
						<TextField
							id='outlined-basic'
							label='Product price'
							value={price}
							onChange={e => setPrice(e.target.value)}
							variant='outlined'
							type='number'
						/>
						<TextField
							id='outlined-basic'
							label='Discount'
							value={discount}
							onChange={e => setDiscount(e.target.value)}
							variant='outlined'
							type='number'
						/>
						<TextField
							id='outlined-basic'
							label='Count'
							value={count}
							onChange={e => setCount(e.target.value)}
							variant='outlined'
							type='number'
						/>
					</div>
				</aside>
				<aside>
					<div>
						<h1>Color</h1>
						<div className='flex flex-wrap gap-[20px] mt-[30px] border-[1px] border-solid border-gray-500 justify-around  px-[10px] py-[19px] rounded-[10px] '>
							{colors.map(el => (
								<div
									key={el.id}
									style={{ backgroundColor: el.colorName }}
									className='w-[70px] h-[70px] rounded-full border border-gray-400 dark:border-gray-600'
								></div>
							))}
						</div>
					</div>
					<div className='mt-[60px]'>
						<Paper
							variant='outlined'
							sx={{
								p: 2,
								textAlign: 'center',
								position: 'relative',
								cursor: 'pointer',
								border: '2px dashed #ccc',
								'&:hover': { borderColor: '#999' },
							}}
							onClick={() => document.getElementById('file-upload')?.click()}
						>
							<input
								id='file-upload'
								type='file'
								accept='image/*'
								multiple
								hidden
								onChange={e => setFiles(e.target.files)}
							/>
							<Upload size={20} style={{ marginBottom: 4, margin: 'auto' }} />
							<Typography variant='body2'>
								Click to upload or drag and drop
							</Typography>
							<Typography variant='caption'>
								(SVG, JPG, PNG, or GIF maximum 900×400)
							</Typography>
						</Paper>
					</div>
				</aside>
			</section>
		</>
	)
}
