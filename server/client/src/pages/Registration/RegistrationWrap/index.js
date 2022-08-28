// Assets
import {ReactComponent as SignupSVG} from "../../../assets/signup.svg";

const RegistrationWrap = ({children}) => {
	return (
		<div>
			<div className="h-screen bg-zinc-100 flex items-center justify-center">
				{/* <div className="flex flex-col md:flex-row justify-evenly items-center"> */}
					{/* <div className="w-full md:w-1/2 h-1/2">
						<div className="flex justify-center items-center">
							<SignupSVG style={{width: "50%"}} />
						</div>
					</div> */}
					<div className="w-44  md:w-1/2 flex justify-center">
						<div className=" w-3/4 bg-white p-12 rounded-2xl">{children}</div>
					</div>
				{/* </div> */}
			</div>
		</div>
	);
};

export default RegistrationWrap;
