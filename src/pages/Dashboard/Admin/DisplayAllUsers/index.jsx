import * as stylex from '@stylexjs/stylex';
import { tokens } from '../../../../../token.stylex';

const DisplayAllUsers = () => {
	return <div {...stylex.props(styles.container)}>DisplayAllUsers</div>;
};

export default DisplayAllUsers;

const styles = stylex.create({
	container: {
		background: tokens.gradiantBackground,
		height: '100vh',
	},
});
