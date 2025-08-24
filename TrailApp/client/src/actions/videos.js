import { FETCH_ALL, START_LOADING, END_LOADING, CREATE, UPDATE, DELETE } from '../constants/actionTypes.js';
import * as api from '../api/index.js';

// TODO: Possibly create LIKE() DISLIKE() functions in actionTypes? Not sure how to handle that

export const getVideos = () => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.fetchVideos();

        dispatch({ type: FETCH_ALL, payload: data });
        dispatch({ type: END_LOADING });
    } catch (err) {
        console.log(err);
    }
}
export const updateVideo = (id, videoData) => async (dispatch) => {
    try {
        const { data } = await api.updateVideo(id, videoData);
        console.log(data);
        dispatch({ type: UPDATE, payload: data });
    } catch (err) {
        console.log(err);
    }
}
export const addLike = (id, like) => async (dispatch) => {
    try {
        const { data } = await api.addLike(id, like);
        console.log(data);
        dispatch({ type: UPDATE, payload: data });
    } catch (err) {
        console.log(err);
    }
}
export const addDislike = (id, dislike) => async (dispatch) => {
    try {
        const { data } = await api.addDislike(id, dislike);
        console.log(data);
        dispatch({ type: UPDATE, payload: data });
    } catch (err) {
        console.log(err);
    }
}
export const postVideo = (videoData) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.postVideo(videoData);

        dispatch({ type: CREATE, payload: data });
    } catch (err) {
        console.log(err);
    }
}
export const deleteVideo = (id) => async (dispatch) => {
    try {
        await api.deleteVideo(id);

        dispatch({ type: DELETE, payload: id });
    } catch (err) {
        console.log(err);
    }
}

export const incrementViewCount = (id) => async (dispatch) => {
    try {
        const { data } = await api.incrementViewCount(id); 
        console.log(data);
        dispatch({ type: UPDATE, payload: data });
    } catch (err) {
        console.log(err);
    }
};
