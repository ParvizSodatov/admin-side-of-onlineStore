import { getBrands } from '@/store/reducers/brands/reducer'
import { getCategory } from '@/store/reducers/category/reducer'
import {
	addProduct,
	editProduct,
	getColors,
	getProductById,
} from '@/store/reducers/products/reducer'
import { getSubCategory } from '@/store/reducers/subCategory/reducer'
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
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useEffect, useState } from 'react'
import { Upload } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'

export default function EditProduct() {
	const { id } = useParams()
	const { productByid } = useSelector(store => store.dashboard)
	console.log('productByid :', productByid)

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
	const [colorId, setColorId] = useState(null)
	const { category } = useSelector(store => store.category)
	const { brand } = useSelector(store => store.brand)
	const { subCategor } = useSelector(store => store.subCategory)
 const navigate=useNavigate()
	function clearAllForms() {
		setAddName('')
		setCode('')
		setDescription('')
		setBrands('')
		setCategories('')
		setSubcategories('')
		setPrice('')
		setDiscount('')
		setCount('')
		setColorId('')
		setImage('')
		setFiles(null)
	}

	async function handleEdit() {
		let newEditUser = {
			id: id,
			ProductName: productName,
			Code: code,
			Description: description,
			BrandId: brands,
			SubCategoryId: subcategory,
			Price: price,
			HasDiscount: false,
			ColorId: colorId,
			Quantity: count,
		}
		const result=await dispatch(editProduct(newEditUser))
		if(editProduct.fulfilled.match(result)){
			navigate('/products')
		}
	}

	
	useEffect(() => {
		if (productByid && brand.length > 0 && subCategor.length > 0) {
			setAddName(productByid.productName)
			setCode(productByid.code)
			setDescription(productByid.description)
			const foundBrand = brand.find(b => b.brandName === productByid.brand)
			setBrands(foundBrand ? foundBrand.id : '')
			setSubcategories(productByid.subCategoryId)
			setPrice(productByid.price)
			setDiscount(productByid.discountPrice)
			setCount(productByid.quantity)
		}
	}, [productByid, brand, subCategor])
	useEffect(() => {
		dispatch(getCategory())
		dispatch(getColors())
		dispatch(getProductById(id))
		dispatch(getSubCategory())
		dispatch(getBrands())
	}, [])
	return (
		<>
			<div className='flex text-[40px] items-center justify-around gap-[550px]'>
				<div>
					<Link to='/products'>
						<Button>
							<ArrowBackIcon sx={{ fontSize: '44px' }} />
						</Button>
					</Link>
					<span className='font-bold'>Product/Edit product</span>
				</div>
				<div className='flex gap-[10px]'>
					<Button variant='outlined' onClick={clearAllForms}>
						Cancel
					</Button>
					<Button variant='contained' onClick={handleEdit}>
						Save
					</Button>
				</div>
			</div>
			<h1 className='font-bold mt-[30px] ml-[30px] text-[26px]'>information</h1>
			<section className='flex gap-[100px]'>
				<aside className='mt-[30px] w-[90%]'>
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
						<Box sx={{ minWidth: 120, width: '260px' }}>
							<FormControl fullWidth>
								<InputLabel id='demo-simple-select-label'>Brands</InputLabel>
								<Select
									labelId='demo-simple-select-label'
									id='demo-simple-select'
									value={brands}
									onChange={e => setBrands(e.target.value)}
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
						<Box sx={{ minWidth: 120, width: '260px' }}>
							<FormControl fullWidth>
								<InputLabel id='demo-simple-select-label'>
									Subcategory
								</InputLabel>
								<Select
									labelId='demo-simple-select-label'
									id='demo-simple-select'
									value={subcategory}
									onChange={e => setSubcategories(e.target.value)}
									label='Categories'
								>
									{subCategor?.map(el => (
										<MenuItem key={el.id} value={el.id}>
											{el.subCategoryName}
										</MenuItem>
									))}
								</Select>
							</FormControl>
						</Box>
					</div>
					<h1 className='font-bold mt-[20px] ml-[10px] text-[25px]'>Price</h1>
					<div className='flex justify-between mt-[20px] gap-[20px]'>
						<TextField
							id='outlined-basic'
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
						<div className='flex flex-wrap gap-[20px] mt-[30px] border-[1px] border-solid border-gray-500 justify-around px-[10px] py-[19px] rounded-[10px]'>
							{colors.map(el => (
								<div
									onClick={() => setColorId(el.id)}
									key={el.id}
									style={{ backgroundColor: el.colorName }}
									className={`w-[70px] h-[70px] rounded-full border 
										${colorId === el.id ? 'border-4 border-blue-600' : 'border-gray-400 dark:border-gray-600'}`}
								></div>
							))}
						</div>
					</div>
				</aside>
			</section>
		</>
	)
}
