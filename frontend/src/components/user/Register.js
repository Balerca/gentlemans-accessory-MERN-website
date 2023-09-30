import React, { Fragment, useState, useEffect } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import MetaData from '../layout/MetaData'
import { register, clearErrors } from '../../actions/userActions'


const Register = ({ history }) => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const alert = useAlert()

    const dispatch = useDispatch()

    const { isAuthenticated, error, loading } = useSelector(state => state.auth)

    useEffect(() => {

        if (isAuthenticated) {
            history.push('/')
        }

        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }

    }, [dispatch, alert, isAuthenticated, error, history])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(register(name,email,password))
    }
    

    return (
        <Fragment>
            <MetaData title={'Register User'} />
            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={submitHandler} encType='application/json'>
                        <h1 className="mb-3">Register</h1>

                        <div className="form-group">
                            <label htmlFor="email_field">Name</label>
                            <input type="name" id="name_field" className="form-control"
                                name='name'
                                value={name}
                                onChange={(e) => setName(e.target.value)} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email_field">Email</label>
                            <input
                                type="email"
                                id="email_field"
                                className="form-control"
                                name='email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password_field">Password</label>
                            <input
                                type="password"
                                id="password_field"
                                className="form-control"
                                name='password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <button
                            id="register_button"
                            type="submit"
                            className="btn btn-block py-3"
                            disabled={loading ? true : false}
                        >
                            REGISTER
                        </button>
                    </form>
                </div>
            </div>
        </Fragment>
    )
}

export default Register