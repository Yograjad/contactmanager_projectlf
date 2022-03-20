// Components
import InputWrapper from "../InputWrapper";

const Select = ({label, error, value, onChange, onFocus, options}) => {
	return (
		<InputWrapper label={label} error={error}>
			<select
				className="w-full border border-gray-100 p-2"
				value={value}
				onChange={(e) => onChange(e)}
				onFocus={onFocus}
				id={label.replace(" ", "_")}
			>
				{options.map((item, i) => (
					<option key={i} value={item.value}>
						{item.label}
					</option>
				))}
			</select>
		</InputWrapper>
	);
};

export default Select;
