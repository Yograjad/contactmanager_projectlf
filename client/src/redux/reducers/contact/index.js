import {SAVE_CONTACT, REMOVE_CONTACT} from "../../actions/contact";

const initialState = {
	selectedContact: null,
};

const saveContactReducer = (state = initialState, action) => {
	switch (action.type) {
		case SAVE_CONTACT:
			return {
				...state,
				selectedContact: action.payload,
			};
		case REMOVE_CONTACT:
			return {
				...state,
				selectedContact: null,
			};

		default:
			return state;
	}
};

export default saveContactReducer;
