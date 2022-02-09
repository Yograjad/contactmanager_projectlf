const successMessage = (success, message, data) => {
	return {
		success: success,
		message: message,
		data: data || "",
	};
};
const errorMessage = (success, message, error) => {
	return {
		success: success,
		message: message,
		error: error || "",
	};
};

module.exports = {successMessage, errorMessage};
