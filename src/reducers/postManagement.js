import axios from "../config/axiosConfig";
const DISPLAY_ALL_POSTS = "DISPLAY_ALL_POSTS ";
const SINGLE_POST = "SINGLE_POST";
const CREATE_NEW_POST = "CREATE_NEW_POST ";
const DELETE_A_POST = "DELETE_A_POST";
const EDIT_A_POST = "EDIT_A_POST";
const REPOST = "REPOST";
const LIKE_A_POST = "LIKE_A_POST";
const LIKE_A_COMMENT = "LIKE_A_COMMENT";
export const likeAComment = (likecomment) => ({
	type: LIKE_A_COMMENT,
	likecomment,
});
export const likeApost = (like) => ({ type: LIKE_A_POST, like });
export const displayAllPosts = (posts) => ({ type: DISPLAY_ALL_POSTS, posts });
export const displayAPost = (currentPost) => ({
	type: SINGLE_POST,
	currentPost,
});
export const createAPost = (post) => ({ type: CREATE_NEW_POST, post });
export const LikePost = (params) => async (dispatch) => {
	const result = await axios.post(`/likes/${params.id}`, { ...params });
	// console.log("result", result.data);

	dispatch(likeApost(result.data.like));
};
export const LikeComment = (params) => async (dispatch) => {
	const result = await axios.post(
		`/likes/${params.postId}/${params.commentId}`,
		{
			...params,
		}
	);
	console.log("FFF", result.data.like_comment);

	dispatch(likeAComment(result.data.like_comment));
};
export const deleteAPost = (post) => ({ type: DELETE_A_POST, post });
export const editAPost = (post) => ({ type: EDIT_A_POST, post });
export const repost = (post) => ({ type: REPOST, post });

export const getAllPosts = (params) => async (dispatch) => {
	const result = await axios.get("/posts", params);

	dispatch(displayAllPosts(result.data.posts));
};
export const getAPost = (params) => async (dispatch) => {
	const result = await axios.get(`/posts/${params.id}`, params);

	console.log("hghg", result);
	// dispatch(displayAPost(result.data.post));
};
export const createANewPost = (params) => async (dispatch) => {
	const result = await axios.post("/posts", params);

	dispatch(createAPost(result.data.post));
};

export const repostAPost = (params) => async (dispatch) => {
	const result = await axios.post(`/posts/`, params);
	dispatch(repost(result.data.post));
};
export const editCurrentPost = (params) => async (dispatch) => {
	const result = await axios.put(`/posts/${params.id}`, params);
	dispatch(editAPost(result.data.post));
};

export const removeAPost = (params) => async (dispatch) => {
	const result = await axios.delete(`/posts/${params.id}`, params);
	dispatch(deleteAPost(result.data));
};
const initialState = { posts: [] };
export default function reducer(state = initialState, action) {
	switch (action.type) {
		case DISPLAY_ALL_POSTS: {
			return {
				...state,
				posts: action.posts,
			};
		}
		case SINGLE_POST: {
			return {
				...state,
				currentPost: action.currentPost,
			};
		}
		case CREATE_NEW_POST: {
			return {
				...state,
				posts: [action.post, ...state.posts],
			};
		}
		case DELETE_A_POST: {
			let newState = state.posts.filter(
				(post) => Number(post.id) !== Number(action.post.postId)
			);

			return {
				...state,
				posts: [...newState],
			};
		}

		case LIKE_A_POST: {
			let newState = [...state.posts];
			console.log("oo", newState);

			console.log("jjj", action.like);
			const currentPost = newState.find(
				(post) => post.id === action.like.postId
			);

			const currentPostIndex = newState.findIndex(
				(post) => post.id === action.like.postId
			);
			console.log("find", currentPostIndex);
			console.log("gjgj", currentPost);

			const currentLike = currentPost.Likes.find(
				(like) => like.id === action.like.id
			);
			console.log("hhhhh", currentLike);
			console.log("cccc", currentPost);
			console.log("newState", newState);
			if (!currentLike) {
				console.log("ttttt2222", newState[currentPostIndex].Likes);
				newState[currentPostIndex].Likes.push(action.like);
			} else {
				console.log("xxx", newState[currentPostIndex]);
				newState[currentPostIndex].Likes = newState[
					currentPostIndex
				].Likes.filter((like) => like.id !== action.like.id);
			}

			return {
				...state,
				posts: [...newState],
			};
		}
		// case LIKE_A_POST: {
		// 	// const newState = merge({}, state);
		// 	const newState = cloneDeep(state);
		// 	const currentPost = newState.posts.find(
		// 		(post) => post.id === action.postLike.postId
		// 	);
		// 	const currentPostLike = currentPost.Likes.find(
		// 		(obj) => obj.user_id === action.postLike.userId
		// 	);
		// 	if (currentPostLike) {
		// 		currentPost.Likes = currentPost.Likes.filter(
		// 			(e) => e.id !== currentPostLike.id
		// 		);
		// 	} else {
		// 		currentPost.Likes.push(action.postLike.likeRes);
		// 	}
		// 	return newState;
		// }

		// case LIKE_A_COMMENT: {
		// 	return {
		// 		...state,
		// 		commentLikes: [action.likecomment, ...state.commentLikes],
		// 	};
		// }

		case EDIT_A_POST: {
			return {
				...state,
				posts: state.posts.map((post) => {
					if (post.id === action.post.id) {
						return action.post;
					}
					return post;
				}),
			};
		}
		case REPOST: {
			return {
				...state,
				posts: [action.post, ...state.posts],
			};
		}

		default:
			return state;
	}
}
