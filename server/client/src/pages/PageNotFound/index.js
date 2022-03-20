// Packages
import {useNavigate} from "react-router-dom";

// Assets
import {ReactComponent as NotSVG} from "../../assets/404.svg";

// Components
import Button from "../../components/Button";

const PageNotFound = () => {
	const navigate = useNavigate();

	const onClick = () => {
		navigate("/");
	};

	return (
		<div className="h-screen overflow-y-auto bg-slate-100 flex  items-center justify-center">
			<div className=" flex flex-col items-center justify-center">
				<div className="w-1/2">
					<NotSVG style={{width: "100%", height: "400px"}} />
				</div>
				<div>
					<p className="text-2xl font-bold text-red-500">Page Not Found</p>
				</div>
				<div className="mt-10">
					<Button label="Go To Home" onClick={onClick} />
				</div>
			</div>
		</div>
	);
};

export default PageNotFound;
