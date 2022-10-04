import axios from 'axios';
import { setAlert } from './alert';

import {
	GET_POST,
	GET_POSTS,
	CREATE_POST,
	DELETE_POST,
	POST_ERROR,
	UPDATE_LIKES,
	ADD_COMMENT,
	REMOVE_COMMENT,
} from './types';

const baseApi = process.env.REACT_APP_RENDER_API;

// Get a Post by Id

export const getPost = (id) => async (dispatch) => {
	try {
		const res = await axios.get(`${baseApi}/api/posts/post/${id}`);
		dispatch({
			type: GET_POST,
			payload: res.data,
		});
	} catch (error) {
		console.log(error);
		dispatch({
			type: POST_ERROR,
			payload: { msg: error.response.data.msg, status: error.response.status },
		});
	}
};

// Get all Posts

export const getPosts = () => async (dispatch) => {
	try {
		const config = {
			header: {
				'Content-type': 'application/json',
			},
		};
		const body = '';
		const res = await axios.get(`${baseApi}/api/posts/all`, body, config);
		dispatch({
			type: GET_POSTS,
			payload: res.data,
		});
	} catch (error) {
		dispatch({
			type: POST_ERROR,
			payload: { msg: error.response.data.msg, status: error.response.status },
		});
	}
};

// Create a post

export const createPost = (formData) => async (dispatch) => {
	const token = localStorage.getItem('token');
	try {
		const config = {
			headers: {
				'Content-type': 'application/json',
				Authorization: token,
			},
		};
		const body = formData;
		const res = await axios.post(`${baseApi}/api/posts`, body, config);
		dispatch({
			type: CREATE_POST,
			payload: res.data,
		});
		dispatch(setAlert('Nice Post!', 'success'));
	} catch (error) {
		dispatch({
			type: POST_ERROR,
			payload: { msg: error.response.data.msg, status: error.response.status },
		});
		dispatch(setAlert(error.response.data.msg, 'danger'));
	}
};

// Delete a post

export const deletePost = (id) => async (dispatch) => {
	const token = localStorage.getItem('token');
	try {
		const config = {
			headers: {
				'Content-type': 'application/json',
				Authorization: token,
			},
		};
		const body = '';
		const res = await axios.delete(
			`${baseApi}/api/posts/delete/${id}`,
			body,
			config
		);
		dispatch({
			type: DELETE_POST,
			payload: id,
		});
		dispatch(setAlert(res.data.msg, 'success'));
	} catch (error) {
		dispatch({
			type: POST_ERROR,
			payload: { msg: error.response.data.msg, status: error.response.status },
		});
		dispatch(setAlert(error.response.data.msg, 'danger'));
	}
};

// Add a like to a post

export const addLike = (id) => async (dispatch) => {
	const token = localStorage.getItem('token');
	try {
		const config = {
			headers: {
				'Content-type': 'application/json',
				Authrorization: token,
			},
		};
		const body = '';
		const res = await axios.patch(
			`${baseApi}/api/posts/like/${id}`,
			body,
			config
		);
		dispatch({
			type: UPDATE_LIKES,
			payload: { id, likes: res.data },
		});
	} catch (error) {
		dispatch({
			type: POST_ERROR,
			payload: { msg: error.response.data.msg, status: error.response.status },
		});
	}
};

// Removing a like from a post

export const removeLike = (id) => async (dispatch) => {
	const token = localStorage.getItem('token');
	try {
		const config = {
			headers: {
				'Content-type': 'application/json',
				Authrorization: token,
			},
		};
		const body = '';
		const res = await axios.patch(
			`${baseApi}/api/posts/unlike/${id}`,
			body,
			config
		);
		dispatch({
			type: UPDATE_LIKES,
			payload: { id, likes: res.data },
		});
	} catch (error) {
		dispatch({
			type: POST_ERROR,
			payload: { msg: error.response.data.msg, status: error.response.status },
		});
	}
};

// Create a Comment on a Post

export const createComment = (id, formData) => async (dispatch) => {
	const token = localStorage.getItem('token');
	try {
		const config = {
			headers: {
				'Content-type': 'application/json',
				Authorization: token,
			},
		};
		const body = formData;
		const res = await axios.post(
			`${baseApi}/api/posts/comment/${id}`,
			body,
			config
		);
		dispatch({
			type: ADD_COMMENT,
			payload: res.data,
		});
		dispatch(setAlert('Tasty Comment!', 'success'));
	} catch (error) {
		dispatch({
			type: POST_ERROR,
			payload: { msg: error.response.data.msg, status: error.response.status },
		});
		dispatch(setAlert(error.response.data.msg, 'danger'));
	}
};

// Delete a Comment on a Post

export const removeComment = (postId, commentId) => async (dispatch) => {
	const token = localStorage.getItem('token');
	try {
		const config = {
			headers: {
				'Content-type': 'application/json',
				Authorization: token,
			},
		};
		const body = '';
		const res = await axios.delete(
			`${baseApi}/api/posts/comment/${postId}/${commentId}`,
			body,
			config
		);
		dispatch({
			type: REMOVE_COMMENT,
			payload: commentId,
		});
		dispatch(setAlert('Mind Changed Successfully...', 'success'));
	} catch (error) {
		console.log(error);
		dispatch({
			type: POST_ERROR,
			payload: { msg: error.response.data.msg, status: error.response.status },
		});
		dispatch(setAlert(error.response.data.msg, 'danger'));
	}
};
