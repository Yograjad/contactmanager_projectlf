export const SAVE_USER = "SAVE_USER";
export const REMOVE_USER = "REMOVE_USER";

export const saveUser = (payload) => {
	return {
		type: SAVE_USER,
		payload: payload,
	};
};

export const removeUser = () => {
	return {
		type: REMOVE_USER,
	};
};
