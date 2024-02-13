import * as stylex from '@stylexjs/stylex';

const Button = ({ btnText, onClick }) => {
	return (
		<button {...stylex.props(styles.buttonContainer)} onClick={onClick}>
			{btnText}
		</button>
	);
};

export default Button;

export const OutlineButton = ({ btnText, onClick }) => {
	return (
		<button {...stylex.props(styles.outlineButtonContainer)} onClick={onClick}>
			{btnText}
		</button>
	);
};

const styles = stylex.create({
	buttonContainer: {
		padding: '10px 30px',
		fontSize: '16px',
		outline: 'none',
		border: 'none',
		background: 'linear-gradient(45deg, #eba434, #af32e6)',
		color: '#fff',
		borderRadius: '10px',
		boxShadow: '2px 2px 10px gray',
		cursor: 'pointer',
		':hover': {
			background: 'linear-gradient(45deg, #af32e6, #eba434)',
		},
	},
	outlineButtonContainer: {
		borderImageSlice: '1',
		borderWidth: '3px',
		outline: 'none',
		fontSize: '14px',
		border: '3px solid #af32e6',
		padding: '10px 30px',
		color: '#000',
		background: 'transparent',
		borderRadius: '10px !important',
		boxShadow: '2px 2px 10px gray',
		cursor: 'pointer',
		':hover': {},
	},
});
