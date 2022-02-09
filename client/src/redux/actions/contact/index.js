export const SAVE_CONTACT = "SAVE_CONTACT";
export const REMOVE_CONTACT = "REMOVE_CONTACT";

export const saveContact = (payload) => {
	return {
		type: SAVE_CONTACT,
		payload: payload,
	};
};
export const removeContact = () => {
	return {
		type: REMOVE_CONTACT,
	};
};
