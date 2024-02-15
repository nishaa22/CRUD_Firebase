import * as stylex from '@stylexjs/stylex';
import { tokens } from '../../token.stylex';

const TextArea = ({ name, text, type, placeholder, onChange, value }) => {
	return (
		<div {...stylex.props(styles.textareaContainer)}>
			<label {...stylex.props(styles.label)}>{text}</label>
			<div>
				<textarea
					{...stylex.props(styles.textarea)}
					type={type}
					rows={'6'}
					cols={'50'}
					name={name}
					value={value}
					placeholder={placeholder}
					onChange={onChange}
				>
					{value}
				</textarea>
			</div>
		</div>
	);
};

export default TextArea;

const styles = stylex.create({
	textareaContainer: {
		margin: '10px 0px',
	},
	label: {
		fontSize: '17px',
		fontWeight: 'bold',
	},
	textarea: {
		borderLeft: '0px',
		borderRight: '0px',
		borderTop: '0px',
		borderImageSlice: '1',
		borderWidth: '3px',
		resize: 'none',
		outline: 'none',
		width: '350px',
		marginTop: '10px',
		fontSize: '14px',
		borderImageSource: tokens.gradiantBackground,
	},
});
