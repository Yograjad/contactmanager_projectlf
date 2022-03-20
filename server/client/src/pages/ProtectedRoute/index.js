import React from "react";
import {Outlet, Navigate} from "react-router-dom";
import {useSelector} from "react-redux";

const ProtectedRoute = () => {
	console.log("ProtectedRoute");
	const user = useSelector((state) => state.user?.userDetails);

	if (user) return <Outlet />;
	return <Navigate to="/" />;
};

export default ProtectedRoute;
