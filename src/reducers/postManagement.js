import axios from "../config/axiosConfig";
const DISPLAY_ALL_POSTS = "DISPLAY_ALL_POSTS ";
const SINGLE_POST = "SINGLE_POST";
const CREATE_NEW_POST = "CREATE_NEW_POST ";
const DELETE_A_POST = "DELETE_A_POST";
const EDIT_A_POST = "EDIT_A_POST";

export const displayAllPosts = (posts) => ({ type: DISPLAY_ALL_POSTS, posts });
export const displayAPost = (currentPost) => ({
	type: SINGLE_POST,
	currentPost,
});
export const createAPost = (post) => ({ type: CREATE_NEW_POST, post });
export const deleteAPost = (post) => ({ type: DELETE_A_POST, post });
export const editAPost = (post) => ({ type: EDIT_A_POST, post });

export const getAllPosts = (params) => async (dispatch) => {
	const result = await axios.get("/posts", params);
	dispatch(displayAllPosts(result.data.posts));
};
export const getAPost = (params) => async (dispatch) => {
	const result = await axios.get(`/posts/${params.id}`, params);
	dispatch(displayAPost(result.data.post));
};
export const createANewPost = (params) => async (dispatch) => {
	const result = await axios.post("/posts", params);

	dispatch(createAPost(result.data.post));
};
export const editCurrentPost = (params) => async (dispatch) => {
	console.log("kkkk", params);

	const result = await axios.put(`/posts/${params.id}`, params);
	console.log("RES", result.data);

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
			console.log("lllll", action.post);

			return {
				...state,
				posts: [action.post, ...state.posts],
			};
		}
		case DELETE_A_POST: {
			console.log("HHHHHH", action.post);
			let newState = state.posts.filter(
				(post) => Number(post.id) !== Number(action.post.postId)
			);

			console.log("tggjj", newState);

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

		case EDIT_A_POST: {
			console.log("LLLL", action.post);
			return {
				...state,
				posts: state.posts.map((post) => {
					if (post.id == action.post.id) {
						return action.post;
					}
					return post;
				}),
				// post: action.payload,
			};
		}

		default:
			return state;
	}
}
