import axios from 'axios'
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAIL, REGISTER_USER_FAIL, REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS,
    LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOAD_USER_FAIL, LOGOUT_SUCCESS, LOGOUT_FAIL,
    UPDATE_PROFILE_FAIL, UPDATE_PASSWORD_REQUEST, UPDATE_PASSWORD_SUCCESS, CLEAR_ERRORS, UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_SUCCESS,
    FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS, FORGOT_PASSWORD_FAIL, UPDATE_PASSWORD_FAIL, NEW_PASSWORD_REQUEST,
    NEW_PASSWORD_SUCCESS, NEW_PASSWORD_FAIL, ALL_USERS_FAIL, ALL_USERS_REQUEST, ALL_USERS_SUCCESS, UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS, UPDATE_USER_FAIL, USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_DETAILS_FAIL, DELETE_USER_REQUEST, DELETE_USER_SUCCESS, DELETE_USER_FAIL } from "../constants/userConstants" 

//Login
export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: LOGIN_REQUEST })
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.post('/api/v1/login', { email, password }, config)
        dispatch({ type: LOGIN_SUCCESS, payload: data.user })

    } catch (error) {
        dispatch({ type: LOGIN_FAIL, payload: error.response.data.message })
    }
}

//Register
export const register = (name, email, password) => async (dispatch) => {
    try {
        
        dispatch({ type: REGISTER_USER_REQUEST })
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.post('/api/v1/register', { name, email, password } , config)
        dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user })

    } catch (error) {
        dispatch({ type: REGISTER_USER_FAIL, payload: error.response.data.message })
    }
}

//Load user
export const loadUser = () => async (dispatch) => {
    try {
        
        dispatch({ type: LOAD_USER_REQUEST })
        
        const { data } = await axios.get('/api/v1/me')
        dispatch({ type: LOAD_USER_SUCCESS, payload: data.user })

    } catch (error) {
        dispatch({ type: LOAD_USER_FAIL, payload: error.response.data.stack })
    }
}

//Logout user
export const logoutUser = () => async (dispatch) => {
    try {
        
        await axios.get('/api/v1/logout')
        dispatch({ type: LOGOUT_SUCCESS })

    } catch (error) {
        dispatch({ type: LOGOUT_FAIL, payload: error.response.data.message })
    }
}

//Update
export const update = (name, email) => async (dispatch) => {
    try {
        
        dispatch({ type: UPDATE_PROFILE_REQUEST })
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.put('/api/v1/me/update', { name, email } , config)
        dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data.success })

    } catch (error) {
        dispatch({ type: UPDATE_PROFILE_FAIL, payload: error.response.data.message })
    }
}

//Change password
export const changePassword = (oldPassword, newPassword) => async (dispatch) => {
    try {
        
        dispatch({ type: UPDATE_PASSWORD_REQUEST })
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.put('/api/v1/password/change', {oldPassword, newPassword} , config)
        dispatch({ type: UPDATE_PASSWORD_SUCCESS, payload: data.success })

    } catch (error) {
        dispatch({ type: UPDATE_PASSWORD_FAIL, payload: error.response.data.message })
    }
}

//Recover password
export const recoverPassword = (email) => async (dispatch) => {
    try {
        
        dispatch({ type: FORGOT_PASSWORD_REQUEST })
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.post('/api/v1/password/recover', {email} , config)
        dispatch({ type: FORGOT_PASSWORD_SUCCESS, payload: data.message })

    } catch (error) {
        dispatch({ type: FORGOT_PASSWORD_FAIL, payload: error.response.data.stack })
    }
}

//Reset password
export const resetPassword = (token, password, confirmPassword) => async (dispatch) => {
    try {
        
        dispatch({ type: NEW_PASSWORD_REQUEST })
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.put(`/api/v1/password/reset/${token}`, {password, confirmPassword} , config)
        dispatch({ type: NEW_PASSWORD_SUCCESS, payload: data.success })

    } catch (error) {
        dispatch({ type: NEW_PASSWORD_FAIL, payload: error.response.data.message })
    }
}

export const allUsers = () => async (dispatch) => {
    try {
        
        dispatch({ type: ALL_USERS_REQUEST })
        
        const { data } = await axios.get('/api/v1/admin/users')
        dispatch({ type: ALL_USERS_SUCCESS, payload: data.users })

    } catch (error) {
        dispatch({ type: ALL_USERS_FAIL, payload: error.response.data.stack })
    }
}

export const updateUser = (id, name, email, role) => async (dispatch) => {
    try {
        
        dispatch({ type: UPDATE_USER_REQUEST })
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.put(`/api/v1/admin/user/${id}`, {name, email, role} , config)
        dispatch({ type: UPDATE_USER_SUCCESS, payload: data.success })

    } catch (error) {
        dispatch({ type: UPDATE_USER_FAIL, payload: error.response.data.stack })
    }
}

export const getUserDetails = (id) => async (dispatch) => {
    try {
        
        dispatch({ type: USER_DETAILS_REQUEST })
        
        const { data } = await axios.get(`/api/v1/admin/user/${id}`)
        dispatch({ type: USER_DETAILS_SUCCESS, payload: data.user })

    } catch (error) {
        dispatch({ type: USER_DETAILS_FAIL, payload: error.response.data.stack })
    }
}

export const deleteUser = (id) => async (dispatch) => {
    try {
        
        dispatch({ type: DELETE_USER_REQUEST })
        
        const { data } = await axios.delete(`/api/v1/admin/user/${id}`)
        dispatch({ type: DELETE_USER_SUCCESS, payload: data.success })

    } catch (error) {
        dispatch({ type: DELETE_USER_FAIL, payload: error.response.data.stack })
    }
}

export const clearErrors = () => async(dispatch) => {
    dispatch({
        type: CLEAR_ERRORS 
    })
}

