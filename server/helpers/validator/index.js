const validateBody = (schema) => {
	return (req, res, next) => {
		const {body} = req;
		const options = {abortEarly: false};
		const {error} = schema.validate(body, options);

		if (error) {
			req.error = error.details;
		}
		next();
	};
};

module.exports = {validateBody};
