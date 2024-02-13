import * as stylex from '@stylexjs/stylex';
import Button from '../../components/Button';
import InputField from '../../components/InputField';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { auth } from '../../../firebaseConfig';
import swal from 'sweetalert';

const Signup = () => {
	const navigate = useNavigate();
	const [userDetails, setUserDetails] = useState({
		name: '',
		email: '',
		password: '',
	});

	const handleChange = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		setUserDetails((prev) => {
			return {
				...prev,
				[name]: value,
			};
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		createUserWithEmailAndPassword(
			auth,
			userDetails.email,
			userDetails.password
		)
			.then((userCredential) => {
				const user = userCredential.user;
				if (user) {
					swal('Hooorraayyy!!!', 'User created successfully..', 'success');
					setUserDetails({ name: '', email: '', password: '' });
					navigate('/');
				}
			})
			.catch((error) => {
				const errorCode = error.code;
				swal('Oops!', errorCode, 'error');
			});
	};

	return (
		<>
			<div {...stylex.props(styles.signupContainer)}>
				<div {...stylex.props(styles.signupBox)}>
					<h1 {...stylex.props(styles.heading)}>
						Hey&#128075; , Register yourself
					</h1>
					<form
						{...stylex.props(styles.signupForm)}
						onSubmit={(e) => handleSubmit(e)}
					>
						<InputField
							text={'Name'}
							type={'text'}
							placeholder="Enter your name"
							name="name"
							onChange={handleChange}
						/>
						<InputField
							text={'Email'}
							type={'email'}
							placeholder="Enter your email"
							name="email"
							onChange={handleChange}
						/>
						<InputField
							text={'Password'}
							type={'password'}
							placeholder="Enter your password"
							name="password"
							onChange={handleChange}
						/>
						<div {...stylex.props(styles.actionBtn)}>
							<Button btnText={'Sign up'} />
						</div>
					</form>
					<div
						{...stylex.props(styles.loginLink)}
						onClick={() => navigate('/')}
					>
						Already Registered? Login
					</div>
				</div>
			</div>
		</>
	);
};

export default Signup;

const styles = stylex.create({
	signupContainer: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		height: '100vh',
		background: 'linear-gradient(45deg, #eba434, #af32e6)',
	},
	signupBox: {
		padding: '10px',
		width: '500px',
		height: '450px',
		borderRadius: '10px',
		background: 'white',
		boxShadow: '3px 1px 10px lightgray',
	},
	heading: {
		textAlign: 'center',
		margin: '10px 0px',
	},
	signupForm: {
		marginTop: '40px',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'column',
	},
	actionBtn: {
		marginTop: '20px',
	},
	loginLink: {
		textAlign: 'center',
		margin: '10px 0px',
		fontSize: '14px',
		color: 'gray',
		':hover': {
			color: '#000',
			cursor: 'pointer',
			textDecoration: 'underline',
		},
	},
});
