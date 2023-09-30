import React, { Fragment, useState, useEffect } from 'react'

import MetaData from '../layout/MetaData'
import Sidebar from './Sidebar'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { newProduct, clearErrors } from '../../actions/productActions'
import { NEW_PRODUCT_RESET } from '../../constants/productConstants'


const NewProduct = ({ history }) => {

    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState('Fountain Pens')
    const [stock, setStock] = useState(0)
    const [seller, setSeller] = useState('')
    const [images, setImages] = useState([])
    const [imagesLinks, setImagesLinks] = useState('')

    const categories = [
        'Fountain Pens',
        'Watches',
        'Stationery',
        'Accessories',
        'Supplies'
    ]

    const alert = useAlert()
    const dispatch = useDispatch()

    const { error, loading, success } = useSelector(state => state.newProduct)

    useEffect(() => {

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if (success) {
            history.push('/admin/products')
            alert.success('Product created successfully')
            dispatch({ type: NEW_PRODUCT_RESET })
        }

    }, [dispatch, alert, error, success, history])

    const submitHandler = (e) => {
        e.preventDefault()
        const results = imagesLinks.split(/\r?\n/)
        results.forEach(result => {
            images.push({
                url: result
            })
        })
        console.log(name, price, description, category, stock, seller, images)
        dispatch(newProduct(name, price, description, category, stock, seller, images))
    }

    return (
        <Fragment>
            <MetaData title={'New Product'} />

            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                        <div className="wrapper my-5">
                            <form className="shadow-lg" onSubmit={submitHandler} encType='multipart/form-data'>
                                <h1 className="mb-4">New Product</h1>

                                <div className="form-group">
                                    <label htmlFor="name_field">Name</label>
                                    <input
                                        type="text"
                                        id="name_field"
                                        className="form-control"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="price_field">Price</label>
                                    <input
                                        type="text"
                                        id="price_field"
                                        className="form-control"
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="description_field">Description</label>
                                    <textarea className="form-control" id="description_field"
                                        rows="8" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="category_field">Category</label>
                                    <select className="form-control" id="category_field" value={category} onChange={(e) => setCategory(e.target.value)}>
                                        {categories.map(category => (
                                            <option key={category} value={category}>{category}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="stock_field">Stock</label>
                                    <input
                                        type="number"
                                        id="stock_field"
                                        className="form-control"
                                        value={stock}
                                        onChange={(e) => setStock(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="seller_field">Seller Name</label>
                                    <input
                                        type="text"
                                        id="seller_field"
                                        className="form-control"
                                        value={seller}
                                        onChange={(e) => setSeller(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="images_field">Images Links</label>
                                    <textarea
                                        type="text"
                                        id="images_field"
                                        className="form-control"
                                        rows="5"
                                        value={imagesLinks}
                                        onChange={(e) => setImagesLinks(e.target.value)}
                                    />
                                </div>

                                <button
                                    id="login_button"
                                    type="submit"
                                    className="btn btn-block py-3"
                                    disabled={loading ? true : false}
                                >
                                    CREATE
                                </button>

                            </form>
                        </div>

                    </Fragment>
                </div>
            </div>

        </Fragment>
    )
}

export default NewProduct