import React, {useState, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";

// Functions
import {saveContact, removeContact} from "../../redux/actions/contact";
import ApiService from "../../services";
import {GET_CONTACT, DELETE_CONTACT} from "../../constants";

// Components
import Modals from "../../components/Modals";
import DialogBox from "../../components/DialogBox";
import ContactHeader from "./ContactHeader";
import ContactList from "./ContactList";
import useToastBar from "../../components/Toast";
import Button from "../../components/Button";

const Contact = () => {
	console.log("Contact", localStorage.getItem("token"));

	const {Toast} = useToastBar();
	const dispatch = useDispatch();
	const history = useNavigate();

	const user = useSelector((state) => state.user?.userDetails);

	const [contacts, setContacts] = useState(null);
	const [favouriteContacts, setFavouriteContacts] = useState(null);
	const [selectedContact, setSelectedContact] = useState(null);

	const [isOpen, setIsOpen] = useState(false);
	const [isUpdate, setIsUpdate] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		// Call Get contact api
		ApiService.sendGetRequest(`${GET_CONTACT}/${user._id}`)
			.then((res) => {
				console.log("Res", res);

				if (res.data.success) {
					const favouriteList = res.data.data
						.filter((item) => item.favourite)
						.sort((a, b) => (a.name > b.name ? 1 : -1));
					console.log("fav", favouriteList);
					setFavouriteContacts(favouriteList);

					const unFavouriteList = res.data.data
						.filter((item) => !item.favourite)
						.sort((a, b) => (a.name > b.name ? 1 : -1));
					console.log("unFavouriteList", unFavouriteList);
					setContacts(unFavouriteList);
				}
			})
			.catch((err) => {
				console.log("Error", err);
			});
	}, [user._id, isUpdate]);

	const onFavourite = (item) => {
		console.log("fav", item);
	};

	// Redirect to edit page
	const onEdit = (item) => {
		console.log("edit", item);
		dispatch(saveContact(item));
		history("/editcontact");
	};

	// Show delete modal
	const onDeleteModal = (item) => {
		console.log("delete", item);
		setSelectedContact(item);
		setIsOpen((prev) => !prev);
	};

	// Call delete api
	const onDelete = () => {
		console.log("selectd item delete", selectedContact._id);
		setIsLoading((prev) => !prev);
		ApiService.sendDeleteRequest(`${DELETE_CONTACT}/${selectedContact._id}`)
			.then((res) => {
				console.log("Res", res);
				if (res.data.success) {
					Toast(`${res.data.message}`, "success");
					updateUI();
				}
			})
			.catch((err) => {
				console.log("Error", err);
				if (err.response.status === 404 || err.response.status === 500) {
					if (!err.response.data.success) {
						Toast(`${err.response.data.message}`, "error");
						updateUI();
					}
				}
			});
	};

	const updateUI = () => {
		setIsUpdate((prev) => !prev);
		setIsOpen((prev) => !prev);
		setIsLoading((prev) => !prev);
	};

	const goTo = () => {
		history("/addcontact");
		dispatch(removeContact());
	};

	return (
		<>
			<Modals isOpen={isOpen}>
				<DialogBox
					title={`Are you sure want to delete ${selectedContact?.email}?`}
					onClick={onDelete}
					isLoading={isLoading}
				/>
			</Modals>

			<div className="h-screen bg-slate-50 ">
				<div className="px-4 md:px-20 pt-8 md:pt-12">
					<div className="flex items-baseline justify-between my-4">
						<p className="font-medium text-neutral-800 text-lg">
							Favourite
						</p>
						<div className="w-32">
							<Button label="Add Contact" onClick={goTo} />
						</div>
					</div>
					<ContactHeader />
					<ContactList
						contacts={favouriteContacts}
						onFavourite={onFavourite}
						onEdit={onEdit}
						onDelete={onDeleteModal}
					/>
					<div className="my-4">
						<p className="font-medium text-neutral-800 text-lg">Others</p>
					</div>
					<ContactHeader />
					<ContactList
						contacts={contacts}
						onFavourite={onFavourite}
						onEdit={onEdit}
						onDelete={onDeleteModal}
					/>
				</div>
			</div>
		</>
	);
};

export default Contact;
