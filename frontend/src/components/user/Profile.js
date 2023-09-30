import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'

const Profile = () => {

    const { user, loading } = useSelector(state => state.auth)

    return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                    <MetaData title={'My Profile'} />
                    <h2 className="mt-5 ml-5">My Profile</h2>
                    <div className="row justify-content-around mt-5 user-info">
                        <div className="col-12 col-md-3">
                            <Link to="/me/update" id="edit_profile" className="btn btn-dark btn-block my-5">
                                Edit Profile
                            </Link>
                        </div>

                        <div className="col-12 col-md-5">
                            <h4>Full Name</h4>
                            <p>{user.name}</p>

                            <h4>Email Address</h4>
                            <p>{user.email}</p>

                            <h4>Joined date</h4>
                            <p>{String(user.createdAt).substring(0, 10)}</p>
                            {user.role !== 'admin' && (
                                <Link to="/orders/me" className="btn btn-danger btn-block mt-5">
                                    My Orders
                                </Link>
                            )}


                            <Link to="/password/change" className="btn btn-dark btn-block mt-3">
                                Change Password
                            </Link>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    )
}

export default Profile