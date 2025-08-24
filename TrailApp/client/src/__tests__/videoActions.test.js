// actions.test.js
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../actions/videos';
import * as api from '../api/index';
import { FETCH_ALL, START_LOADING, END_LOADING, CREATE, UPDATE, DELETE } from '../constants/actionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

// Mock API functions
jest.mock('../api/index');

describe('Video Actions', () => {
    let store;

    beforeEach(() => {
        store = mockStore({});
    });

    it('dispatches START_LOADING, FETCH_ALL, and END_LOADING for getVideos', async () => {
        const mockData = [{ id: 1, title: 'Test Video' }];
        api.fetchVideos.mockResolvedValue({ data: mockData });

        const expectedActions = [
            { type: START_LOADING },
            { type: FETCH_ALL, payload: mockData },
            { type: END_LOADING },
        ];

        await store.dispatch(actions.getVideos());
        expect(store.getActions()).toEqual(expectedActions);
    });

    it('dispatches UPDATE with data for updateVideo', async () => {
        const id = '1';
        const videoData = { title: 'Updated Video' };
        const mockResponse = { data: videoData };
        api.updateVideo.mockResolvedValue(mockResponse);

        const expectedActions = [{ type: UPDATE, payload: videoData }];

        await store.dispatch(actions.updateVideo(id, videoData));
        expect(store.getActions()).toEqual(expectedActions);
    });

    it('dispatches UPDATE with data for addLike', async () => {
        const id = '1';
        const like = true;
        const mockResponse = { data: { id, likes: 1 } };
        api.addLike.mockResolvedValue(mockResponse);

        const expectedActions = [{ type: UPDATE, payload: mockResponse.data }];

        await store.dispatch(actions.addLike(id, like));
        expect(store.getActions()).toEqual(expectedActions);
    });

    it('dispatches UPDATE with data for addDislike', async () => {
        const id = '1';
        const dislike = true;
        const mockResponse = { data: { id, dislikes: 1 } };
        api.addDislike.mockResolvedValue(mockResponse);

        const expectedActions = [{ type: UPDATE, payload: mockResponse.data }];

        await store.dispatch(actions.addDislike(id, dislike));
        expect(store.getActions()).toEqual(expectedActions);
    });

    it('dispatches START_LOADING, CREATE for postVideo', async () => {
        const videoData = { title: 'New Video' };
        const mockResponse = { data: videoData };
        api.postVideo.mockResolvedValue(mockResponse);

        const expectedActions = [
            { type: START_LOADING },
            { type: CREATE, payload: videoData },
        ];

        await store.dispatch(actions.postVideo(videoData));
        expect(store.getActions()).toEqual(expectedActions);
    });

    it('dispatches DELETE with id for deleteVideo', async () => {
        const id = '1';
        api.deleteVideo.mockResolvedValue({});

        const expectedActions = [{ type: DELETE, payload: id }];

        await store.dispatch(actions.deleteVideo(id));
        expect(store.getActions()).toEqual(expectedActions);
    });
});
