import axios from "../config/axiosConfig";

const SET_TOKEN = "SET_TOKEN";
const SET_PROFILE = "SET_PROFILE";
const SET_USER = "SET_USER ";
const REMOVE_TOKEN = "REMOVE_TOKEN";

export const setToken = (token) => ({ type: SET_TOKEN, token });
export const removeToken = (token) => ({ type: REMOVE_TOKEN });

export const login = (params) => async (dispatch) => {
	const result = await axios.post("/users/login", params);
	dispatch(setToken(result.data.token));
};

export const logout = (params) => async (dispatch) => {
	dispatch(removeToken());
};
const initialState = {
	user: { token: "" },
};
export default function reducer(state = initialState, action) {
	switch (action.type) {
		case SET_TOKEN: {
			return {
				...state.user,
				token: action.token,
			};
		}

		case REMOVE_TOKEN: {
			const newState = { ...state };
			console.log(newState);
			delete newState.token;
			return newState;
		}
		// case SET_USER: {
		// 	return {
		// 		...state,
		// 		user: action.user,
		// 	};
		// }

		default:
			return state;
	}
}
