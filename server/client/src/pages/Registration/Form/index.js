// Packages
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";

// Functions
import {saveUser} from "../../../redux/actions";
import useFormData from "../../../hooks/useFormData";
import {
	capitalizeFirstLetter,
	capitalizeFirstLetterSentence,
} from "../../../utils/capitalizeFirstLetter";
import ApiService from "../../../services";
import {REGISTER, LOGIN} from "../../../constants";

// Components
import ButtonNLoading from "../../../components/Button/ButtonNLoading";
import Input from "../../../components/Input";
import useToastBar from "../../../components/Toast";

const Form = ({title}) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});
	const [formError, setFormError] = useState({
		email: "",
		password: "",
	});

	const [isLoading, setIsLoading] = useState(false);
	const {Toast} = useToastBar();
	const {onChange, onFocus, setError} = useFormData(setFormData, setFormError);

	// Call api to register user
	const onRegister = () => {
		setIsLoading((prev) => !prev);
		ApiService.sendPostRequest(REGISTER, formData)
			.then((res) => {
				console.log("res", res);
				if (res.data.success) return successMessage(res, "signup");
			})
			.catch((err) => {
				console.log("error", err.response);
				if (err.response.status === 400) return fieldValidation(err);
				if (err.response.status === 409) return statusError(err);
			});
	};

	// Call api to login
	const onLogin = () => {
		setIsLoading((prev) => !prev);
		ApiService.sendPostRequest(LOGIN, formData)
			.then((res) => {
				console.log("res", res);
				if (res.data.success) return successMessage(res, "login");
			})
			.catch((err) => {
				console.log("error", err.response);
				if (err.response.status === 400) return fieldValidation(err);
				if (err.response.status === 401) return statusError(err);
			});
	};

	// Show success message
	const successMessage = (res, type) => {
		if (type === "login") {
			localStorage.setItem("token", res.data.data.accessToken);
			dispatch(saveUser(res.data.data));
			navigate("/contact");
		}

		if (type === "signup") {
			navigate("/");
		}

		Toast(`${res.data.message}`, "success");
		setIsLoading((prev) => !prev);
	};

	// Validation field
	const fieldValidation = (err) => {
		if (!err.response.data.success) {
			for (let item of err.response.data.error) {
				setError(
					item.context.key,
					`${capitalizeFirstLetterSentence(
						item.message.replaceAll('"', "")
					)}`
				);
			}
		}
		setIsLoading((prev) => !prev);
	};

	const statusError = (err) => {
		if (!err.response.data.success) {
			Toast(`${err.response.data.message}`, "error");
		}
		setIsLoading((prev) => !prev);
	};

	return (
		<div>
			<div>
				<p className="text-2xl mb-6 font-bold">{title}</p>
				{Object.keys(formData).map((item, i) => (
					<Input
						key={i}
						label={capitalizeFirstLetter(item)}
						error={formError[item]}
						type={`${
							item === "email"
								? "email"
								: item === "password"
								? "password"
								: "text"
						}`}
						value={formData[item]}
						onChange={(e) => onChange(e, item)}
						onFocus={() => onFocus(item)}
					/>
				))}
				<ButtonNLoading
					title={title}
					onClick={title === "Signup" ? onRegister : onLogin}
					isLoading={isLoading}
					className="mt-4"
				/>
			</div>
		</div>
	);
};

export default Form;
