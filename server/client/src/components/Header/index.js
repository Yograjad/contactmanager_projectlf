import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";

import UserProfile from "./UserProfile";

const Header = () => {
	const path = window.location.pathname;
	const navigate = useNavigate();

	const user = useSelector((state) => state.user?.userDetails);

	const [active, setActive] = useState(path);

	useEffect(() => {
		setActive(path);
	}, [path]);

	const goTo = (path) => {
		if (user) return navigate(`/contact`);

		navigate(`${path}`);
	};

	return (
		<header className="flex items-center justify-between">
			<div onClick={() => goTo("/")} className="cursor-pointer ">
				<p className="font-bold text-neutral-800 hover:text-blue-500 transition duration-50000 ease-in">
					Contact Webapp
				</p>
			</div>
			{user ? (
				<UserProfile />
			) : (
				<div className="flex items-center">
					<div
						onClick={() => goTo("login")}
						className={`mr-10 cursor-pointer ${
							active === "/login"
								? "text-neutral-800 font-bold"
								: "text-neutral-500 font-light"
						} `}
					>
						<p>Login</p>
					</div>
					<div
						onClick={() => goTo("signup")}
						className={`cursor-pointer ${
							active === "/signup"
								? "text-neutral-800 font-bold"
								: "text-neutral-400 font-light"
						}`}
					>
						<p>Signup</p>
					</div>
				</div>
			)}
		</header>
	);
};

export default Header;
