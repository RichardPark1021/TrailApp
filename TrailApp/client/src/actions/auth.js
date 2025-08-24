
import { AUTH } from '../constants/actionTypes.js';
import * as api from '../api/index.js';
import axios from 'axios';


export const signin = (formData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.signIn(formData);
        console.log(data);
        dispatch({ type: AUTH, data });
        if(data.result.roleType === "Admin"){
            localStorage.setItem('roleType', JSON.stringify(data));
            navigate('/adminHome');
        } else if(data.result.roleType === "User"){
            localStorage.setItem('roleType', JSON.stringify(data));
            navigate('/userHome');
        } else {
            navigate('/');
        }

        // Refresh the page to apply changes
        window.location.reload();

    } catch (err) {
        throw err;
    }
}

export const signup = (formData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.signUp(formData);
        dispatch({ type: AUTH, data });
        signin();
        // navigate('/userHome');
    } catch (err) {
        throw err;
    }
}

export const updateProfile = async (formData, id) => {
    try {
        const { data } = await api.updateProfile(id, formData);
        return data; 
    } catch (err) {
        throw err; 
    }
}

export const resetPassword = (token, newPassword, navigate) => async (dispatch) => {
    try {
        const response = await axios.post(`/api/auth/reset-password/${token}`, { newPassword });
        dispatch({ type: 'RESET_PASSWORD_SUCCESS', payload: response.data });
        navigate('/authorization'); // Redirect to login page after successful reset
    } catch (error) {
        dispatch({ type: 'RESET_PASSWORD_FAIL', payload: error.response.data });
    }
};
