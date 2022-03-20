// Packages
import {Route, Routes} from "react-router-dom";

// Pages
import Home from "../pages/Home";
import Contact from "../pages/Contact";
import Login from "../pages/Registration/Login";
import Signup from "../pages/Registration/Signup";
import ProtectedRoute from "../pages/ProtectedRoute";
import PageNotFound from "../pages/PageNotFound";
import ContactForm from "../pages/Contact/ContactForm";

const RouteContent = () => {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route element={<ProtectedRoute />}>
				<Route path="contact" element={<Contact />} />
				<Route
					path="addcontact"
					element={<ContactForm title="Add Contact" />}
				/>
				<Route
					path="editcontact"
					element={<ContactForm title="Edit Contact" />}
				/>
			</Route>
			<Route path="login" element={<Login />} />
			<Route path="signup" element={<Signup />} />
			<Route path="*" element={<PageNotFound />} />
		</Routes>
	);
};

export default RouteContent;
