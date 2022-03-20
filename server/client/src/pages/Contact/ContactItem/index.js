import React from "react";

import {capitalizeFirstLetter} from "../../../utils/capitalizeFirstLetter";

import {UisFavorite} from "@iconscout/react-unicons-solid";
import {UilTrash} from "@iconscout/react-unicons";
import {UilPen} from "@iconscout/react-unicons";
import IconButton from "../../../components/Button/IconButton";

const ContactItem = ({item, onFavourite, onEdit, onDelete}) => {
	return (
		<tr className="flex items-center bg-white hover:bg-gray-50 px-4 py-2 border-b border-neutral-200 transition duration-500 ease-in">
			<div
				style={{minWidth: "48px", minHeight: "48px"}}
				className="overflow-hidden flex items-center rounded-full bg-slate-300 mr-4"
			>
				<img
					className="w-12 h-12 object-cover"
					src={item.photoGraph}
					alt={item.email}
				/>
			</div>
			<div style={{width: "20%"}} className="pr-4">
				<p className="font-medium text-neutral-600">
					{capitalizeFirstLetter(item.name)}
				</p>
			</div>
			<div style={{width: "20%"}} className="pr-4">
				<p className="font-light text-neutral-500">{item.email}</p>
			</div>
			<div style={{width: "20%"}} className="pr-4">
				<p className="font-light text-neutral-500">{item.phone}</p>
			</div>
			<div style={{width: "20%"}} className="pr-4">
				<p className="font-light text-neutral-500">{item.address}</p>
			</div>
			<div
				style={{width: "20%"}}
				className="flex items-center justify-between "
			>
				{item.favourite ? (
					<div>
						<UisFavorite className="text-orange-500" />
					</div>
				) : (
					<div className="invisible">
						<UisFavorite className="text-orange-500" />
					</div>
				)}

				<div className="flex items-center justify-end ">
					<IconButton
						id="Edit"
						className="mr-6 hover:bg-blue-100 p-2 rounded-full transition duration-150 ease-in"
						onClick={() => onEdit(item)}
					>
						<UilPen className="text-gray-400  hover:text-blue-500 hover:-translate-y-1 transition duration-150 ease-in" />
					</IconButton>
					<IconButton
						id="Delete"
						className=" hover:bg-red-100 p-2 rounded-full transition duration-150 ease-in"
						onClick={() => onDelete(item)}
					>
						<UilTrash className="text-gray-400 hover:text-red-500 hover:-translate-y-1 transition duration-150 ease-in" />
					</IconButton>
				</div>
			</div>
		</tr>
	);
};

export default ContactItem;
