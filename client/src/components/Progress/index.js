import {useEffect, useState} from "react";
import "./progress.css";

const Progress = ({done}) => {
	console.log("Prorgress", done);
	const [style, setStyle] = useState({});

	const [pro, setpro] = useState(done);

	useEffect(() => {
		if (done == 0 && pro < 100) {
			setTimeout(() => {
				setpro((prev) => prev + 5);
			}, 100);
		}
		if (done == 100) {
			setpro(100);
		}
	}, [pro, done]);

	// setTimeout(() => {
	// 	const newStyle = {
	// 		opacity: 1,
	// 		width: `${done}%`,
	// 	};

	// 	setStyle(newStyle);
	// }, 200);

	return (
		<div>{pro}</div>
		// <div className="progress">
		// 	<div className="progress-done" style={style}>
		// 		{done}%
		// 	</div>
		// </div>
	);
};

export default Progress;
