import React from "react";

const InputWrapper = ({label, error, children}) => {
	return (
		<div className="w-full mb-1">
			<div className="flex justify-between items-center mb-2">
				<p className="text-sm font-normal">{label}</p>
			</div>
			{children}

			<div
				className={`flex justify-between items-center px-4 py-3 transition duration-100 ease-linear rounded ${
					error === "" ? "none" : "bg-red-50"
				}`}
			>
				<p
					className={`text-sm font-normal text-red-500 transition duration-150 ease-linear ${
						error === "" ? "invisible" : "visible"
					}`}
				>
					{error === "" ? "d" : error}
				</p>
			</div>
		</div>
	);
};

export default InputWrapper;
