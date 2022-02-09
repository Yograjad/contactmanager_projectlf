import React, {useState} from "react";

import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

import {removeUser, removeContact} from "../../../redux/actions";
import {auth} from "../../../config/firebaseConfig";

import {UilAngleUp} from "@iconscout/react-unicons";
import {UilUserCircle} from "@iconscout/react-unicons";
import useToastBar from "../../../components/Toast";
import Button from "../../Button";

const UserProfile = () => {
	console.log("UserProfile");
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const {Toast} = useToastBar();

	const user = useSelector((state) => state?.user?.userDetails);

	const [show, setShow] = useState(false);

	const logout = () => {
		auth
			.signOut()
			.then((cred) => {
				console.log("logout", cred);
				auth.signOut();
				dispatch(removeUser());
				dispatch(removeContact());
				localStorage.clear();
				navigate("/");
				Toast("User Signout Successfully", "success");
			})
			.catch((error) => {
				console.log("error logout " + error);
			});
	};

	const showComponent = () => {
		console.log("alert open");
		setShow((prev) => !prev);
	};

	return (
		<div className="relative  mx-4 ">
			<div onClick={showComponent}>
				<UilUserCircle className="text-neutral-800" />
			</div>
			<div
				className={`${
					show ? "visible" : "invisible"
				} fixed md:absolute top-18 z-50 md:top-12 flex flex-col justify-between right-0 w-full md:w-60 h-auto  md:h-auto overflow-y-auto border border-gray-200 bg-white rounded-md shadow-md transition duration-500 ease-in-out`}
			>
				<div className="text-sm p-3 ">
					<p className="font-medium text-neutral-800 mb-3">Profile</p>
					<div className="flex items-center mb-2">
						{/* <UilEnvelope className="text-neutral-800 mr-2" /> */}
						<p className="font-normal text-neutral-400">{user.email}</p>
					</div>
					<div className="bg-red-300 mt-4">
						<Button label="Logout" onClick={logout} />
					</div>
				</div>
				<div
					onClick={showComponent}
					className="w-full flex items-center justify-center py-1 bg-slate-100"
				>
					<UilAngleUp className="text-neutral-800" />
				</div>
			</div>
		</div>
	);
};

export default UserProfile;
