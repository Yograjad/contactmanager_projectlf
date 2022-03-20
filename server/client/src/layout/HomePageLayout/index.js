// Components
import Header from "../../components/Header";

const HomePageLayout = ({children}) => {
	return (
		<div className="h-screen overflow-x-hidden">
			<div className="sticky top-0 z-50 bg-white shadow-sm py-5 px-6 md:px-20">
				<Header />
			</div>
			<div>{children}</div>
		</div>
	);
};

export default HomePageLayout;
