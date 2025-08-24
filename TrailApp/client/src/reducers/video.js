import { FETCH_ALL, FETCH_ONE, CREATE, UPDATE, DELETE, START_LOADING, END_LOADING } from '../constants/actionTypes.js';

const video = (state = { isLoading: true, videos: [], video: {} }, action) => {
    switch (action.type) {
        case START_LOADING:
            return { ...state, isLoading: true };
        case END_LOADING:
            return { ...state, isLoading: false };
        case FETCH_ALL:
            return { ...state, videos: action.payload };
        case FETCH_ONE:
            return { ...state, video: action.payload };
        case CREATE:
            return { ...state, videos: [ ...state.videos, action.payload ] };
        case DELETE:
            return { ...state, videos: state.videos.filter((video) => video._id !== action.payload) };
        case UPDATE:
            return { ...state, videos: state.videos.map((video) => video._id === action.payload._id ? action.payload : video) };
        default:
            return state;
    }
};

export default video;
