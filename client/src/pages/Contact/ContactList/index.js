import React from "react";
import ContactItem from "../ContactItem";

const ContactList = ({contacts, onFavourite, onEdit, onDelete}) => {
	if (contacts?.length > 0)
		return (
			<div className="border border-neutral-200">
				{contacts.map((item) => (
					<ContactItem
						key={item._id}
						WWW
						item={item}
						onFavourite={onFavourite}
						onEdit={onEdit}
						onDelete={onDelete}
					/>
				))}
			</div>
		);

	if (contacts?.length === 0)
		return (
			<div className="text-center font-medium text-base mt-10">
				No Contacts
			</div>
		);

	if (!contacts)
		return (
			<div className="text-center  font-medium text-base mt-10">Loading</div>
		);
};

export default ContactList;
