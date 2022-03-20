const ContactHeader = () => {
	return (
		<div className="flex items-center bg-slate-100 text-neutral-800 border font-medium border-slate-200 rounded-tl rounded-tr px-4">
			<div
				style={{minWidth: "48px", minHeight: "48px"}}
				className="pl-4 mr-4"
			></div>
			<div style={{width: "20%"}} className="pr-4">
				<p>Name</p>
			</div>
			<div style={{width: "20%"}} className="pr-4">
				<p>Email</p>
			</div>
			<div style={{width: "20%"}} className="pr-4">
				<p>Phone Number</p>
			</div>
			<div style={{width: "20%"}} className="pr-4">
				<p>Address</p>
			</div>
			<div style={{width: "20%"}} className="pr-4">
				<p>Favourite</p>
			</div>
		</div>
	);
};

export default ContactHeader;
