import {useCallback} from "react";

const useFormData = (setFormData, setFormError) => {
	const onChange = useCallback(
		(e, key) => {
			// console.log(e.target.value, key);
			setFormData((prevState) => {
				return {
					...prevState,
					[key]: e.target.value,
				};
			});
		},
		[setFormData]
	);

	const onFocus = useCallback(
		(key) => {
			setFormError((prevState) => {
				// console.log("key", key);
				return {
					...prevState,
					[key]: "",
				};
			});
		},
		[setFormError]
	);

	const setError = useCallback(
		(key, errorMessage) => {
			setFormError((prevState) => {
				return {
					...prevState,
					[key]: errorMessage,
				};
			});
		},
		[setFormError]
	);

	return {onChange, onFocus, setError};
};

export default useFormData;
