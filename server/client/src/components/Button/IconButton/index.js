const IconButton = ({className, id, onClick, children}) => {
	return (
		<div className={className} onClick={onClick} id={id}>
			{children}
		</div>
	);
};

export default IconButton;
