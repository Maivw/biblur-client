import axios from "../config/axiosConfig";
const LIKE_A_POST = "LIKE_A_POST";
const ALL_LIKES_POST = "ALL_LIKES_POST";
const ALL_LIKES_COMMENT = "ALL_LIKES_COMMENT ";
const LIKE_A_COMMENT = "LIKE_A_COMMENT";
export const likeApost = (post) => ({ type: LIKE_A_POST, post });

export const LikePost = (params) => async (dispatch) => {
	const result = await axios.post(`/likes/${params.postId}`, { ...params });
	console.log("FFF", result.data.like);

	dispatch(likeApost(result.data.like));
};

const initialState = {
	postLikes: [],
	commentLikes: [],
};

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case ALL_LIKES_POST: {
			return {
				...state,
				postLikes: [action.postLikes, ...state.postLikes],
			};
		}

		default:
			return state;
	}
}
