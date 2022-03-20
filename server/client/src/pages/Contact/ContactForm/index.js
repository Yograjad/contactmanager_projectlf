import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

import {removeContact} from "../../../redux/actions";
import useFormData from "../../../hooks/useFormData";
import {
	capitalizeFirstLetter,
	capitalizeFirstLetterSentence,
} from "../../../utils/capitalizeFirstLetter";
import {ADD_CONTACT, UPDATE_CONTACT} from "../../../constants";
import ApiService from "../../../services";

import Input from "../../../components/Input";
import InputWrapper from "../../../components/InputWrapper";
import ButtonNLoading from "../../../components/Button/ButtonNLoading";
import useToastBar from "../../../components/Toast";
import ImageResize from "../../../components/ImageResize";

const ContactForm = ({title}) => {
	const {Toast} = useToastBar();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const user = useSelector((state) => state.user?.userDetails);
	const selectedContact = useSelector(
		(state) => state.contact?.selectedContact
	);

	const [formData, setFormData] = useState({
		userId: user._id || "",
		name: "",
		phone: 0,
		photoGraph: "",
		favourite: false,
		email: "",
		address: "",
	});
	const [formError, setFormError] = useState({
		userId: "",
		name: "",
		phone: "",
		photoGraph: "",
		favourite: "",
		email: "",
		address: "",
	});

	const [isLoading, setIsLoading] = useState(false);
	const [updateImageContainer, setUpdateImageContainer] = useState(false);
	const {onChange, onFocus, setError} = useFormData(setFormData, setFormError);

	useEffect(() => {
		if (title === "Edit Contact") {
			setFormData({
				userId: user._id,
				name: selectedContact?.name,
				phone: selectedContact?.phone,
				photoGraph: selectedContact?.photoGraph,
				favourite: selectedContact?.favourite,
				email: selectedContact?.email,
				address: selectedContact?.address,
			});
		}
	}, []);

	const onChangeFavourite = (e) => {
		setFormData((prevState) => {
			return {
				...prevState,
				favourite: !formData.favourite,
			};
		});
	};

	const onAddContact = () => {
		setIsLoading((prev) => !prev);
		ApiService.sendPostRequest(ADD_CONTACT, formData)
			.then((res) => {
				console.log("res", res);
				if (res.data.success) return successMessage(res);
			})
			.catch((err) => {
				console.log("error", err.response);
				if (err.response.status === 400) return fieldValidation(err);
				if (err.response.status === 404) return statusError(err);
			});
	};
	const onEditContact = () => {
		console.log("onedit contact ", formData);
		setIsLoading((prev) => !prev);
		ApiService.sendPutRequest(
			`${UPDATE_CONTACT}/${selectedContact._id}`,
			formData
		)
			.then((res) => {
				console.log("res", res);
				if (res.data.success) return successMessage(res);
			})
			.catch((err) => {
				console.log("error", err?.response);
				if (err.response.status === 400) return fieldValidation(err);
				// if (err.response.status === 404) return statusError(err);
			});
	};

	const successMessage = (res) => {
		Toast(`${res.data.message}`, "success");
		setIsLoading((prev) => !prev);
		setUpdateImageContainer((prev) => !prev);
		resetField();
		dispatch(removeContact());
		navigate("/contact");
	};

	const resetField = () => {
		Object.keys(formData).map((item) => {
			return setFormData((prevState) => {
				return {
					...prevState,
					[item]:
						item === "favourite"
							? false
							: item === "userId"
							? user._id
							: "",
				};
			});
		});
	};

	const fieldValidation = (err) => {
		if (!err.response.data.success) {
			for (let item of err.response.data.error) {
				setError(
					item.context.key,
					`${capitalizeFirstLetterSentence(
						item.message.replaceAll('"', "")
					)}`
				);
				if (item.context.key === "photoGraph") {
					Toast("Select and Upload Photo", "error");
				}
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

	const callback = (url) => {
		console.log("URL for photograph", url);
		Toast("Upload Successful", "success");
		setFormData((prevState) => {
			return {
				...prevState,
				photoGraph: url,
			};
		});
	};

	return (
		<div className="flex justify-center bg-slate-100">
			<div className="w-full md:w-3/4 bg-white p-4 md:p-10 mx-4 my-10">
				<p className="text-2xl mb-6 font-bold">
					{title}{" "}
					<span className="text-orange-500 font-normal">
						{title === "Edit Contact" ? `(${selectedContact?.name})` : ""}
					</span>
				</p>
				{Object.keys(formData)
					.filter(
						(item) =>
							item !== "favourite" &&
							item !== "userId" &&
							item !== "photoGraph"
					)
					.map((item, i) => (
						<Input
							key={i}
							label={capitalizeFirstLetter(item)}
							error={formError[item]}
							type={`${
								item === "email"
									? "email"
									: item === "phone"
									? "number"
									: "text"
							}`}
							value={formData[item]}
							onChange={(e) => onChange(e, item)}
							onFocus={() => onFocus(item)}
						/>
					))}
				<InputWrapper label="Favourite" error={formError.favourite}>
					<input
						type="checkbox"
						checked={formData.favourite}
						onChange={onChangeFavourite}
					/>
				</InputWrapper>
				<p className="text-sm font-normal mb-4">PhotoGraph</p>
				<ImageResize
					callback={callback}
					update={updateImageContainer}
					photoGraph={selectedContact?.photoGraph}
				/>

				<ButtonNLoading
					title={title === "Add Contact" ? "Add" : "Update"}
					onClick={title === "Add Contact" ? onAddContact : onEditContact}
					isLoading={isLoading}
					className="mt-4"
				/>
			</div>
		</div>
	);
};

export default ContactForm;
