import { AUTH, LOGOUT } from '../constants/actionTypes.js';

const authReducer = (state = { authData: []}, action) => {
    switch (action.type) {
        case AUTH:
            localStorage.setItem('profile', JSON.stringify({ ...action?.data }));

            return { ...state, authData: action?.data.token };
        case LOGOUT:
            localStorage.clear();
            sessionStorage.clear();
            return { ...state, authData: null };
        default:
            return state;
    }
};

export default authReducer;