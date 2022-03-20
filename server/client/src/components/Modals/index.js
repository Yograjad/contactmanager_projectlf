// Packages
import React, {useEffect} from "react";

// Components
import Modal from "react-modal";
import {UilTimes} from "@iconscout/react-unicons";
import "./modal.css";

const customStyles = {
	content: {
		top: "50%",
		left: "50%",
		right: "auto",
		bottom: "auto",
		marginRight: "-50%",
		transform: "translate(-50%, -50%)",
	},
};

Modal.setAppElement("#root");

const Modals = ({isOpen, children}) => {
	const [modalIsOpen, setIsOpen] = React.useState(true);

	useEffect(() => {
		setIsOpen((prev) => !prev);
	}, [isOpen]);

	function afterOpenModal() {
		// references are now sync'd and can be accessed.
		// subtitle.style.color = "#f00";
	}

	function closeModal() {
		setIsOpen((prev) => !prev);
	}
	return (
		<div>
			{/* <button onClick={openModal}>Open Modal{modalIsOpen.toString()}</button> */}
			<Modal
				isOpen={modalIsOpen}
				onAfterOpen={afterOpenModal}
				onRequestClose={closeModal}
				style={customStyles}
				contentLabel="Example Modal"
				overlayClassName="myoverlay"
			>
				<div className="flex justify-end mb-4">
					<div onClick={closeModal}>
						<UilTimes />
					</div>
				</div>
				{children}
			</Modal>
		</div>
	);
};

export default Modals;
