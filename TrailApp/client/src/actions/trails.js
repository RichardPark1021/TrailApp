import { FETCH_ALL, FETCH_ONE, START_LOADING, END_LOADING, UPDATE, DELETE } from '../constants/actionTypes.js';
import * as api from '../api/index.js';

//Action to fetch all trails
export const getTrails = () => async(dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.getAllTrails();
        dispatch({ type: FETCH_ALL, payload: data });
        dispatch({ type: END_LOADING });
    } catch (err) {
        console.log(err);
    }
}

export const updateTrailCoordinate = (trailId, index, coords) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.updateTrailCoordinate(trailId, index, coords);
        dispatch({ type: UPDATE, payload: data });
        dispatch({ type: END_LOADING });
    } catch (err) {
        console.error(err);
    }
};

export const deleteTrailCoordinate = (trailId, index) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.deleteTrailCoordinate(trailId, index);
        dispatch({ type: UPDATE, payload: data }); // We're updating the trail, not deleting it entirely
        dispatch({ type: END_LOADING });
    } catch (err) {
        console.error(err);
    }
};

export const insertTrailCoordinate = (trailId, index, coordinate) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.insertCoordinate(trailId, index, coordinate);
        dispatch({ type: UPDATE, payload: data });
        dispatch({ type: END_LOADING });
    } catch (err) {
        console.error(err);
    }
};