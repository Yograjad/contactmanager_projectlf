const Joi = require("joi");
const myCustomJoi = Joi.extend(require("joi-phone-number"));

const registerUserSchema = Joi.object({
	email: Joi.string()
		.email({minDomainSegments: 2, tlds: {allow: ["com"]}})
		.required(),
	password: Joi.string().min(10).required(),
});

const contactSchema = Joi.object({
	userId: Joi.string().required(),
	name: Joi.string().required(),
	phone: Joi.number()
		.custom((value, helper) => {
			console.log(value.toString().length);
			if (value.toString().length < 10) {
				return helper.message("Phone must be at least 10 digit");
			} else {
				return true;
			}
		})
		.required(),
	photoGraph: Joi.string().required(),
	favourite: Joi.boolean().required(),
	email: Joi.string().email({minDomainSegments: 2, tlds: {allow: ["com"]}}),
	address: Joi.string(),
});

module.exports = {registerUserSchema, contactSchema};
