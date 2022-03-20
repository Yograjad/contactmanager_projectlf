import {SAVE_USER, REMOVE_USER} from "../../actions/user";

const initialState = {
	userDetails: null,
};

const saveUserReducer = (state = initialState, action) => {
	switch (action.type) {
		case SAVE_USER:
			return {
				...state,
				userDetails: action.payload,
			};
		case REMOVE_USER:
			return {
				...state,
				userDetails: null,
			};

		default:
			return state;
	}
};

export default saveUserReducer;
