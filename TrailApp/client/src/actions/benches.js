import { FETCH_ALL, START_LOADING, END_LOADING, UPDATE, DELETE } from '../constants/actionTypes.js';
import * as api from '../api/index.js';

// Action to fetch all benches
export const getBenches = () => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.getAllBenches();
        dispatch({ type: FETCH_ALL, payload: data });
        dispatch({ type: END_LOADING });
    } catch (err) {
        console.error(err);
    }
};

export const createBenchAction = (benchData) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.createBench(benchData);
        dispatch({ type: UPDATE, payload: data });
        dispatch({ type: END_LOADING });
    } catch (err) {
        console.error(err);
    }
};

export const updateBenchAction = (id, benchData) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.updateBench(id, benchData);
        dispatch({ type: UPDATE, payload: data });
        dispatch({ type: END_LOADING });
    } catch (err) {
        console.error(err);
    }
};

export const deleteBenchAction = (id) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        await api.deleteBench(id);
        dispatch({ type: DELETE, payload: id });
        dispatch({ type: END_LOADING });
    } catch (err) {
        console.error(err);
    }
};

export const addVideoToBenchAction = (id, video) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.addVideoToBench(id, video);
        dispatch({ type: UPDATE, payload: data });
        dispatch({ type: END_LOADING });
    } catch (err) {
        console.error(err);
    }
};

export const deleteVideoFromBenchAction = (id, videoId) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.deleteVideoFromBench(id, videoId);
        dispatch({ type: UPDATE, payload: data });
        dispatch({ type: END_LOADING });
    } catch (err) {
        console.error(err);
    }
};