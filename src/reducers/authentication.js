import axios from "../config/axiosConfig";

const SET_TOKEN = "SET_TOKEN";
const SET_PROFILE = "SET_PROFILE";
const SET_USER = "SET_USER ";
const REMOVE_TOKEN = "REMOVE_TOKEN";

export const setToken = (token) => ({ type: SET_TOKEN, token });
export const removeToken = (token) => ({ type: REMOVE_TOKEN });
export const setUser = (user) => ({ type: SET_USER, user });

export const login = (params) => async (dispatch) => {
	const result = await axios.post("/users/login", params);

	dispatch(setToken(result.data.token));
	dispatch(setUser(result.data.user));
};
export const signup = (params) => async (dispatch) => {
	const result = await axios.post("/users", params);
	dispatch(setToken(result.data.token));
	dispatch(setUser(result.data.user));
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
				...state,
				token: action.token,
			};
		}

		case REMOVE_TOKEN: {
			const newState = { ...state };
			delete newState.token;
			return newState;
		}
		case SET_USER: {
			return {
				...state,
				user: action.user,
			};
		}

		default:
			return state;
	}
}
