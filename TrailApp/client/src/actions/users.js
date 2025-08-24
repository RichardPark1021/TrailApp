import { FETCH_ALL, FETCH_ONE, START_LOADING, END_LOADING, UPDATE, DELETE } from '../constants/actionTypes.js';
import * as api from '../api/index.js';

// Action to fetch all users
export const getUsers = () => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.fetchUsers();
        dispatch({ type: FETCH_ALL, payload: data });
        dispatch({ type: END_LOADING });
    } catch (err) {
        console.log(err);
    }
};

// Action to fetch a single user
export const getUser = (id) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.fetchUser(id);
        dispatch({ type: FETCH_ONE, payload: data });
        dispatch({ type: END_LOADING });
    } catch (err) {
        console.log(err);
    }
};

// Action to update a user's role
export const updateUserRole = (id, roleType) => async (dispatch) => {
    try {
        const { data } = await api.updateUserRole(id, roleType);
        dispatch({ type: UPDATE, payload: data });
    } catch (err) {
        console.log(err);
    }
};

// Action to delete a user
export const deleteUser = (id) => async (dispatch) => {
    try {
        // Perform the delete API request
        const { data } = await api.deleteUser(id);
        console.log("User deleted successfully:", data);

        dispatch({ type: DELETE, payload: id });
    } catch (error) {
        console.error("Error deleting user:", error);
    }
};
