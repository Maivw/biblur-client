import axios from "../config/axiosConfig";
const CREATE_NEW_COMMENT = "CREATE_NEW_COMMENT";
const DELETE_A_COMMENT = "DELETE_A_COMMENT";
const EDIT_A_COMMENT = "EDIT_A_COMMENT";
const DISPLAY_A_COMMENT = "DISPLAY_A_COMMENT ";
const DISPLAY_ALL_COMMENTS = "DISPLAY_ALL_COMMENTS ";

export const createNewComment = (comment) => {
	return {
		type: CREATE_NEW_COMMENT,
		comment,
	};
};
export const deleteComment = (comment) => ({
	type: DELETE_A_COMMENT,
	comment,
});
export const editComment = (comment) => ({
	type: EDIT_A_COMMENT,
	comment,
});
export const displayComment = (comment) => ({
	type: DISPLAY_A_COMMENT,
	comment,
});

export const displayAllComments = (comments) => ({
	type: DISPLAY_ALL_COMMENTS,
	comments: comments,
});

export const MakeAComment = (params) => async (dispatch) => {
	const result = await axios.post(`/posts/${params.id}`, params);

	dispatch(createNewComment(result.data));
};
export const GetComments = (params) => async (dispatch) => {
	console.log("CCCommtent", params);
	const result = await axios.get(`/comments/${params.postId}`, params);
	console.log("CC222", result.data.comments);
	dispatch(displayAllComments(result.data.comments));
};

const initialState = {
	comments: [],
};

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case CREATE_NEW_COMMENT: {
			return {
				...state,
				comments: [action.comment, ...state.comments],
			};
		}
		case DISPLAY_ALL_COMMENTS: {
			console.log("Kgh", action.comments);
			return {
				...state,
				comments: action.comments,
			};
		}
		default:
			return state;
	}
}
