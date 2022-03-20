import {useState, useEffect} from "react";

// Packages
import {Watch} from "react-loader-spinner";

const ButtonNLoading = ({type, title, onClick, isLoading, className}) => {
	let [loading, setLoading] = useState(false);

	useEffect(() => {
		if (isLoading) {
			setLoading(true);
		} else {
			setLoading(false);
		}
	}, [isLoading]);

	return (
		<button
			id={title.replace(" ", "_")}
			type={type}
			disabled={loading}
			onClick={onClick}
			style={{minWidth: "120px"}}
			className={`flex items-center justify-center ${
				loading
					? "bg-gray-400 cursor-wait"
					: "bg-blue-500 hover:bg-blue-700 transition ease-in-out duration-500"
			} px-3 py-3 rounded ${className}`}
		>
			{loading ? (
				<div className="mr-3">
					<Watch
						height={25}
						width={25}
						color="white"
						ariaLabel="loading"
					/>
				</div>
			) : (
				<div style={{height: "25px"}} className="opacity-0"></div>
			)}
			<p className=" text-sm text-white">{loading ? "Loading" : title}</p>
		</button>
	);
};

export default ButtonNLoading;
