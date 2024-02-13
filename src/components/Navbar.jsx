import * as stylex from '@stylexjs/stylex';
import Button from './Button';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebaseConfig';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
	const navigate = useNavigate();

	const handleLogout = () => {
		signOut(auth)
			.then(() => {
				sessionStorage.removeItem('token');
				navigate('/');
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<div {...stylex.props(styles.navbarContainer)}>
			<ul {...stylex.props(styles.ul)}>
				<li
					onClick={() => navigate('/create-note')}
					{...stylex.props(styles.li)}
				>
					Create Notes
				</li>
			</ul>
			<Button btnText={'Sign out'} onClick={handleLogout} />
		</div>
	);
};

export default Navbar;

const styles = stylex.create({
	navbarContainer: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		background: 'linear-gradient(45deg, #af32e6, #eba434)',
		padding: '15px 20px',
	},
	ul: {
		display: 'flex',
		listStyleType: 'none',
		gap: '30px',
	},
	li: {
		cursor: 'pointer',
	},
});
