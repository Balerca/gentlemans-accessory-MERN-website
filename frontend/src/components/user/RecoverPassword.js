import React, { Fragment, useState, useEffect } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import MetaData from '../layout/MetaData'
import { recoverPassword, clearErrors } from '../../actions/userActions'

const RecoverPassword = () => {

    const [email, setEmail] = useState('')

    const alert = useAlert()

    const dispatch = useDispatch()

    const { error, loading, message } = useSelector(state => state.recoverPassword)

    useEffect(() => {

        if (error) {
            alert.error(error.message)
            dispatch(clearErrors())
        }

        if (message) {

            alert.success('Email sent')
        
        }

    }, [dispatch, alert, error, message])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(recoverPassword(email))
    }

  return (
    <Fragment>
        <MetaData title={'Recover Password'} />

        <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={submitHandler}>
                        <h1 className="mb-3">Forgot Password</h1>
                        <div className="form-group">
                            <label htmlFor="email_field">Enter Email</label>
                            <input
                                type="email"
                                id="email_field"
                                className="form-control"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <button
                            id="forgot_password_button"
                            type="submit"
                            className="btn btn-block py-3"
                            disabled={loading ? true : false}>
                            Send Email
                    </button>

                    </form>
                </div>
            </div>
    </Fragment>
  )
}

export default RecoverPassword