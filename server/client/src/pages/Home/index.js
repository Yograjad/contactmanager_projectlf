import React from "react";

import {ReactComponent as Contact} from "../../assets/contact.svg";

const Home = () => {
	return (
		<div>
			<div className="flex flex-col md:flex-row items-center justify-between bg-slate-100 px-2 md:px-20">
				<div className="w-full text-center md:text-left mt-10 md:w-1/2">
					<div>
						<p className="text-7xl font-bold text-neutral-800">
							MERN Contact Webapp
						</p>
						<p className="text-xl font-light mt-8 text-neutral-400">
							Save your{" "}
							<span className="font-bold text-orange-500">
								Favourite
							</span>{" "}
							Contact in our app.
						</p>
					</div>
				</div>
				<div className="w-full md:w-1/2">
					<div className="flex items-end justify-end float-right">
						<Contact style={{width: "80%"}} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Home;
