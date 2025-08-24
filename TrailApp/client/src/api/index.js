
import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });


export const signUp = (formData) => API.post('/api/user/signup', formData);
export const signIn = (formData) => API.post('/api/user/signin', formData);
export const logOut = (token) => API.post('/api/user/logout', token);

// TODO: Integrate with pages & test for functionality
export const updateUserRole = (id, roleType) => API.patch(`/api/user/updateRole/${id}`, roleType);
export const updateProfile = (id, formData) => API.patch(`/api/user/updateProfile/${id}`, formData);
export const sendResetLink = (email) => {
    return axios.post('/api/auth/send-reset-link', { email });
  };
export const resetPassword = (token, newPassword) => API.post(`/api/auth/reset/${token}`, { newPassword });
export const deleteUser = (id) => API.delete(`/api/user/${id}`);
export const fetchUsers = () => API.get('/api/user/users');
export const fetchUser = (id) => API.get(`/api/user/${id}`)

// TODO: Need to be tested and API functions need to be created server side
export const fetchVideos = () => API.get('/api/video/videos');
export const postVideo = (videoData) => API.post('/api/video/upload', videoData);
export const updateVideo = (id, videoData) => API.patch(`/api/video/${id}`, videoData);
export const addLike = (id, like) => API.patch(`/api/video/like/${id}`, like);
export const addDislike = (id, dislike) => API.patch(`/api/video/dislike/${id}`, dislike);
export const deleteVideo = (id) => API.delete(`/api/video/${id}`);
export const incrementViewCount = (id) => API.patch(`/api/video/view/${id}`);
export const getVideoViewsByUrl = (url) => API.get(`/api/video/views/${encodeURIComponent(url)}`);

export const getTrail = (id) => API.get(`/api/trails/${id}`);
export const getAllTrails = () => API.get('/api/trails/trails');
export const updateTrailCoordinate = (trailId, index, coords) => API.patch(`/api/trails/${trailId}/coordinate/${index}`, coords);
export const deleteTrailCoordinate = (trailId, index) => API.delete(`/api/trails/${trailId}/coordinate/${index}`);
export const insertTrailCoordinate = (trailId, index, coordinate) => API.patch(`/api/trails/${trailId}/coordinate`, {index, coordinate});

export const getAllBenches = () => API.get('/api/bench/benches');
export const createBench = (benchData) => API.post('/api/bench/bench', benchData);
export const updateBench = (id, benchData) => API.patch(`/api/bench/bench/${id}`, benchData);
export const deleteBench = (id) => API.delete(`/api/bench/bench/${id}`);
export const addVideoToBench = (id, videoData) => API.patch(`/api/bench/bench/${id}/add-video`, videoData);
export const deleteVideoFromBench = (id, videoId) => API.patch(`/api/bench/bench/${id}/delete-video/${videoId}`);

export const submitFeedback = (feedbackData) => API.post('/api/feedback/submit', feedbackData);
export const fetchFeedbacks = () => API.get('/api/feedback');
export const deleteFeedback = (id) => API.delete(`/api/feedback/${id}`);
