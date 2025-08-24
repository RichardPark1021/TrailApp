import { FETCH_ALL, FETCH_ONE, CREATE, UPDATE, DELETE, START_LOADING, END_LOADING } from '../constants/actionTypes.js';

const user = (state = { isLoading: true, users: [], user: {} }, action) => {
    switch (action.type) {
        case START_LOADING:
            return { ...state, isLoading: true };
        case END_LOADING:
            return { ...state, isLoading: false };
        case FETCH_ALL:
            return { ...state, users: action.payload };
        case FETCH_ONE: // New case for fetching a single user
            return { ...state, user: action.payload };
        case CREATE:
            return { ...state, users: [ ...state.users, action.payload ] };
        case UPDATE:
            return { ...state, users: state.users.map((user) => user._id === action.payload._id ? action.payload : user) };
        // Use the existing DELETE action here
        case DELETE:
            return { ...state, users: state.users.filter((user) => user._id !== action.payload) }; // Remove user by id
        default:
            return state;
    }
};

export default user;
