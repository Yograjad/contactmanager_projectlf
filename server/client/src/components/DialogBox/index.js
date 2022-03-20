import React from "react";

import ButtonNLoading from "../Button/ButtonNLoading";

const DialogBox = ({title, onClick, isLoading}) => {
	return (
		<div className="w-full md:w-80">
			<p className="text-sm font-medium mb-4">{title}</p>
			<div className="flex justify-end">
				<ButtonNLoading
					title="Done"
					onClick={onClick}
					isLoading={isLoading}
				/>
			</div>
		</div>
	);
};

export default DialogBox;
