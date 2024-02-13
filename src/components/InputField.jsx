import * as stylex from '@stylexjs/stylex';

const InputField = ({ name, text, type, placeholder, onChange, value }) => {
	return (
		<div {...stylex.props(styles.inputContainer)}>
			<label {...stylex.props(styles.label)}>{text}</label>
			<div>
				<input
					{...stylex.props(styles.input)}
					type={type}
					name={name}
					value={value}
					placeholder={placeholder}
					onChange={onChange}
				/>
			</div>
		</div>
	);
};

export default InputField;

const styles = stylex.create({
	inputContainer: {
		margin: '10px 0px',
	},
	label: {
		fontSize: '17px',
		fontWeight: 'bold',
	},
	input: {
		borderLeft: '0px',
		borderRight: '0px',
		borderTop: '0px',
		borderImageSlice: '1',
		borderWidth: '3px',
		outline: 'none',
		width: '350px',
		height: '40px',
		fontSize: '14px',
		borderImageSource: 'linear-gradient(45deg, #eba434, #af32e6)',
	},
});
