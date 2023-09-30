import React, { Fragment } from 'react'
import '../../App.css'
import Search from './Search'
import { Route, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import { logoutUser } from '../../actions/userActions'

const Header = () => {
  const alert = useAlert()
  const dispatch = useDispatch()
  const { user, loading } = useSelector(state => state.auth)
  const { cartItems } = useSelector(state => state.cart)

  const logoutHandler = () => {
    dispatch(logoutUser())
    alert.success('Logged out successfully')
  }

  return (
    <Fragment>
      <nav className="navbar row">
        <div className="col-12 col-md-3">
          <div className="navbar-brand">
            <Link to='/'>
              <svg height="50" width="200">
                <text x="25" y="45" fill="white" fontSize="60px" fontFamily="BodoniFLF Medium">GA</text>
              </svg>
            </Link>
          </div>
        </div>

        <div className="col-12 col-md-6 mt-2 mt-md-0">
          <Route render={({ history }) => <Search history={history} />} />
        </div>

        <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
          <Link to='/cart' style={{ textDecoration: 'none' }} >
            <span className="ml-1" id="cart_count" style={{ backgroundImage: 'url(/images/shopping.svg)', backgroundPositionX:'center', backgroundPositionY:'-5 0%', backgroundSize: '100%', backgroundRepeat: 'no-repeat' }}>{cartItems.length}</span>
            <span id="cart" className="ml-3">Checkout</span>
          </Link>
          {user ? (
            <div className='ml-4 dropdown d-inline'>
              <Link to='#' className='btn text-white mr-4 mt-1' type='button' id='dropDownMenuButton' data-toggle='dropdown'
                aria-haspopup='true' aria-expanded='false' >

                <figure className="avatar avatar-nav">
                  <img style={{ height:'90%', width:'90%' }}
                    src='/images/account.svg'
                    alt='profileicon'
                    className="rounded-circle"
                  />
                </figure>

                <span>{user && user.name}</span>

              </Link>

              <div className='dropdown-menu' aria-labelledby='dropDownMenuButton'>
                {user && user.role === 'admin' && (
                  <Link className='dropdown-item' to='/dashboard'> Dashboard </Link>
                )}

                <Link className='dropdown-item' to='/orders/me'> Orders </Link>
                <Link className='dropdown-item' to='/me'> Profile </Link>

                <Link className='dropdown-item text-danger' to='/' onClick={logoutHandler}> Logout </Link>
              </div>
            </div>

          ) : !loading && <Link to='/login' className="btn ml-4" id="login_btn">Login</Link>}


        </div>
      </nav>
    </Fragment>
  )
}

export default Header