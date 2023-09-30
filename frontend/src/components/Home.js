import React, { Fragment, useEffect, useState } from 'react'
import MetaData from './layout/MetaData'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../actions/productActions'
import Product from './product/Product'
import Loader from './layout/Loader'
import { useAlert } from 'react-alert'
import Pagination from 'react-js-pagination'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'

const createSliderWithToolTip = Slider.createSliderWithTooltip
const Range = createSliderWithToolTip(Slider.Range)

const Home = ({ match }) => {

    const [currentPage, setCurrentPage] = useState(1)
    const [price, setPrice] = useState([1, 31000])
    const [category, setCategory] = useState('')
    const [rating, setRating] = useState(0)

    const categories = [
        'Fountain Pens',
        'Watches',
        'Stationery',
        'Accessories',
        'Supplies'
    ]

    const alert = useAlert()
    const dispatch = useDispatch()

    const { loading, products, error, count, resultsPage, filteredProductsCount } = useSelector(state => state.products)
    const keyword = match.params.keyword

    useEffect(() => {

        if (error) {
            alert.success('Success')
            alert.error(error.message)
        }
        dispatch(getProducts(keyword, currentPage, price, category, rating))



    }, [dispatch, alert, error, keyword, currentPage, price, category, rating])

    function setCurrentPageNo(pageNumber) {
        setCurrentPage(pageNumber)
    }

    let counter = count
    if(keyword) {
        counter = filteredProductsCount
    }

    return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                    <MetaData title={'Buy Best Products Online'} />
                    <h1 id="products_heading">{category}</h1>

                    <section id="products" className="container mt-5">
                        <div className="row">
                            <Fragment>
                                    <div>
                                        <div className='px-5'>
                                            <Range
                                                marks={{
                                                    1: `$1`,
                                                    31000: `$31000`
                                                }}
                                                min={1}
                                                max={31000}
                                                defaultValue={[1, 31000]}
                                                tipFormatter={value => `$${value}`}
                                                tipProps={{
                                                    placement: 'top',
                                                    visible: true
                                                }}
                                                value={price}
                                                onChange={price => setPrice(price)}
                                            />

                                            <hr className='my-5'/>
                                            <div className='mt-5'>
                                                <h4 className='mb-3'>
                                                    Categories
                                                </h4>

                                                <ul className='pl-0'>
                                                    {categories.map(category => (
                                                        <li style={{cursor: 'pointer', listStyleType: 'none'}} key={category} onClick={() => setCategory(category)}>
                                                            {category}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>

                                            <hr className='my-3'/>
                                            <div className='mt-5'>
                                                <h4 className='mb-3'>
                                                    Ratings
                                                </h4>
                                                
                                                <ul className='pl-0'>
                                                    {[5, 4, 3, 2, 1].map(star => (
                                                        <li style={{cursor: 'pointer', listStyleType: 'none'}} key={star} onClick={() => setRating(star) }>
                                                            <div className='rating-outer'>
                                                                <div className='rating-inner' style= {{width: `${star*20}%`}}>

                                                                </div>
                                                            </div>
                                                        </li>
                                                    ))}
                                                </ul>
                                                <h4 className='mb-3'>
                                                    Filters:
                                                </h4>
                                                
                                                <ul className='pl-0'>
                                                        Category: {category ? (`${category}`):("All")} <br></br>
                                                        Rating: {rating}+
                                                </ul>
                                                <Link to={`/`} id="view_btn" className="btn btn-block" onClick={() => {setCategory(''); setRating(0); setCurrentPage(1); setPrice([1, 31000])}}>Reset Filters</Link>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='col-6 col-md-9'>
                                        <div className='row'>
                                            {products.map(product => (
                                                <Product key={product._id} product={product} col={4} />
                                            ))}
                                        </div>

                                    </div>
                                </Fragment>
                        </div>
                    </section>
                    {resultsPage <= counter && (
                        <div className='d-flex justify-content-center mt-5'>
                            <Pagination
                                activePage={currentPage}
                                itemsCountPerPage={resultsPage}
                                totalItemsCount={count}
                                onChange={setCurrentPageNo}
                                nextPageText={'Next'}
                                prevPageText={'Previous'}
                                firstPageText={'First'}
                                lastPageText={'Last'}
                                itemClass='page-item'
                                linkClass='page-link'
                            />
                        </div>
                    )}

                </Fragment>
            )}

        </Fragment>
    )
}

export default Home