const Button = ({label, onClick}) => {
	return (
		<button
			id={label.replace(" ", "_")}
			className="w-full bg-blue-500 py-3 px-3 rounded text-white text-sm hover:bg-blue-600 transition duration-150 ease-in"
			onClick={onClick}
		>
			{label}
		</button>
	);
};

export default Button;
