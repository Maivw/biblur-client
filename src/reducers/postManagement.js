import axios from "../config/axiosConfig";
const DISPLAY_ALL_POSTS = "DISPLAY_ALL_POSTS ";
const SINGLE_POST = "SINGLE_POST";
const CREATE_NEW_POST = "CREATE_NEW_POST ";
const DELETE_A_POST = "DELETE_A_POST";
const EDIT_A_POST = "EDIT_A_POST";

export const displayAllPosts = (posts) => ({ type: DISPLAY_ALL_POSTS, posts });
export const displayAPost = (post) => ({ type: SINGLE_POST, post });
export const createAPost = (post) => ({ type: CREATE_NEW_POST, post });

export const getAllPosts = (params) => async (dispatch) => {
	const result = await axios.get("/posts", params);
	console.log("GGGGG", result.data.posts);
	dispatch(displayAllPosts(result.data.posts));
};
export const createANewPost = (params) => async (dispatch) => {
	const result = await axios.post("/posts", params);
	dispatch(displayAllPosts());
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
			console.log(action);

			return {
				...state,
				posts: [action.post.post, ...state.posts],
			};
		}
		case DELETE_A_POST: {
			return {
				posts: state.posts.filter((post) => post.id != action.payload.post_id),
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

		// case EDIT_A_POST: {
		// 	return {
		// 		...state,
		// 		posts: state.posts.map((post) => {
		// 			if (post.id == action.payload.id) {
		// 				return action.payload;
		// 			}
		// 			return post;
		// 		}),
		// 		post: action.payload,
		// 	};
		// }

		default:
			return state;
	}
}
