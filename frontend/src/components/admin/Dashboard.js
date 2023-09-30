import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import MetaData from '../layout/MetaData'
import Loader from '../layout//Loader'
import Sidebar from './Sidebar'
import { getAdminProducts } from '../../actions/productActions'
import { useDispatch, useSelector } from 'react-redux'
import { allOrders } from '../../actions/orderActions'
import { allUsers } from '../../actions/userActions'
import { Bar } from 'react-chartjs-2'
import { Chart } from 'chart.js/auto'

const Dashboard = () => {

    const dispatch = useDispatch()
    const { products } = useSelector(state => state.products)
    const { users } = useSelector(state => state.allUsers)
    const { orders, totalAmount, loading } = useSelector(state => state.allOrders)


    let outOfStock = 0

    products.forEach(product => {
        if (product.stock === 0) {
            outOfStock += 1
        }
    })

    const prepareRevenueData = () => {
        const monthlyRevenue = new Array(12).fill(0);
        orders.forEach(order => {
            const month = new Date(order.createdAt).getMonth();
            if (monthlyRevenue[month]) {
                monthlyRevenue[month] += order.totalPrice;
            } else {
                monthlyRevenue[month] = order.totalPrice;
            }
        });

        const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const data = Object.values(monthlyRevenue);

        return {
            labels,
            datasets: [
                {
                    label: 'Revenue',
                    data,
                    backgroundColor: 'rgba(0, 255, 140, 0.5)',
                    borderColor: 'rgba(0, 215, 118, 1)',
                    borderWidth: 3,
                },
            ],
        };
    };

    const prepareProductsSoldData = () => {
        const monthlyProductSold  = new Array(12).fill(0);
        orders.forEach(order => {
            const month = new Date(order.createdAt).getMonth();
            if (monthlyProductSold [month]) {
                monthlyProductSold[month] += order.orderItems.reduce((acc, item) => acc + item.quantity, 0);
            } else {
                monthlyProductSold[month] = order.orderItems.reduce((acc, item) => acc + item.quantity, 0);
            }
        });

        const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const data = Object.values(monthlyProductSold);

        return {
            labels,
            datasets: [
                {
                    label: 'Products Sold',
                    data,
                    backgroundColor: 'rgba(0, 103, 255, 0.5)',
                    borderColor: 'rgba(0, 61, 255, 1)',
                    borderWidth: 3,
                },
            ],
        };
    };

    useEffect(() => {
        dispatch(getAdminProducts())
        dispatch(allOrders())
        dispatch(allUsers())

    }, [dispatch])

    return (
        <Fragment>
            <div className='row'>
                <div className='col-12 col-md-2'>
                    <Sidebar />
                </div>
                <div className="col-12 col-md-10">
                    <h1 className="my-4">Dashboard</h1>

                    {loading ? <Loader /> : (
                        <Fragment>
                            <MetaData title={'Admin Dashboard'} />
                            <div className="row pr-4">
                                <div className="col-xl-12 col-sm-12 mb-3">
                                    <div className="card text-white bg-success o-hidden h-100">
                                        <div className="card-body">
                                            <div className="text-center card-font-size">Total Amount<br /> <b>${totalAmount?.toFixed(2)}</b>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <center>
                                <div className="row">
                                    <div className="col-12 center">
                                        <div className="card-body" style={{width: 500}}>
                                            <Bar
                                                data={prepareRevenueData()}
                                            />
                                        </div>
                                        <div className='card-body' style={{width: 500}}>
                                        <Bar
                                                data={prepareProductsSoldData()}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </center>

                            <div className="row pr-4">
                                <div className="col-xl-3 col-sm-6 mb-3">
                                    <div className="card text-white bg-dark o-hidden h-100">
                                        <div className="card-body">
                                            <div className="text-center card-font-size">Products<br /> <b>{products && products.length}</b></div>
                                        </div>
                                        <Link className="card-footer text-white clearfix small z-1" to="/admin/products">
                                            <span className="float-left">View Details</span>
                                            <span className="float-right">
                                                <i className="fa fa-angle-right"></i>
                                            </span>
                                        </Link>
                                    </div>
                                </div>


                                <div className="col-xl-3 col-sm-6 mb-3">
                                    <div className="card text-white bg-dark o-hidden h-100">
                                        <div className="card-body">
                                            <div className="text-center card-font-size">Orders<br /> <b>{orders && orders.length}</b></div>
                                        </div>
                                        <Link className="card-footer text-white clearfix small z-1" to="/admin/orders">
                                            <span className="float-left">View Details</span>
                                            <span className="float-right">
                                                <i className="fa fa-angle-right"></i>
                                            </span>
                                        </Link>
                                    </div>
                                </div>


                                <div className="col-xl-3 col-sm-6 mb-3">
                                    <div className="card text-white bg-dark o-hidden h-100">
                                        <div className="card-body">
                                            <div className="text-center card-font-size">Users<br /> <b>{users && users.length}</b></div>
                                        </div>
                                        <Link className="card-footer text-white clearfix small z-1" to="/admin/users">
                                            <span className="float-left">View Details</span>
                                            <span className="float-right">
                                                <i className="fa fa-angle-right"></i>
                                            </span>
                                        </Link>
                                    </div>
                                </div>


                                <div className="col-xl-3 col-sm-6 mb-3">
                                    <div className="card text-white bg-danger o-hidden h-100">
                                        <div className="card-body">
                                            <div className="text-center card-font-size">Out of Stock<br /> <b>{outOfStock}</b></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Fragment>
                    )}
                </div>
            </div>
        </Fragment>
    )
}

export default Dashboard