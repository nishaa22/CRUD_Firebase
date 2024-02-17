import * as stylex from '@stylexjs/stylex';
import Button from '../../components/Button';
import InputField from '../../components/InputField';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { auth, db } from '../../../firebaseConfig';
import swal from 'sweetalert';
import { addDoc, collection } from 'firebase/firestore';
import { animations, tokens } from '../../../token.stylex';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const Signup = () => {
	const navigate = useNavigate();
	const [userDetails, setUserDetails] = useState({
		name: '',
		email: '',
		password: '',
		role: 'user',
	});
	const [isLoading, setIsLoading] = useState(false);

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

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		await createUserWithEmailAndPassword(
			auth,
			userDetails.email,
			userDetails.password
		)
			.then(async (userCredential) => {
				const user = userCredential.user;
				console.log(user);
				if (user) {
					setIsLoading(false);
				}
				await addDoc(collection(db, `users/${user.uid}/details`), userDetails);
				if (user) {
					swal('Hooorraayyy!!!', 'User created successfully..', 'success');
					setUserDetails({ name: '', email: '', password: '' });
					navigate('/');
				}
			})
			.catch((error) => {
				setIsLoading(false);
				const errorCode = error.code;
				swal('Oops!', errorCode, 'error');
			});
	};

	console.log(userDetails, 'KKKK');
	return (
		<>
			<div {...stylex.props([styles.signupContainer, styles.fadeIn])}>
				<div {...stylex.props(styles.signupBox)}>
					<h1 {...stylex.props([styles.heading, styles.pulse])}>
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
							<Button
								btnText={
									isLoading ? (
										<Spin
											indicator={
												<LoadingOutlined
													style={{ fontSize: 24, color: '#fff' }}
													spin
												/>
											}
										/>
									) : (
										'Sign up'
									)
								}
							/>
						</div>
					</form>
					<div {...stylex.props(styles.loginLink)}>
						Already Registered?&nbsp;
						<span onClick={() => navigate('/')} {...stylex.props(styles.span)}>
							Login
						</span>
					</div>
				</div>
			</div>
		</>
	);
};

export default Signup;

const styles = stylex.create({
	fadeIn: {
		animationName: animations.fadeIn,
		animationDuration: '1s',
	},
	pulse: {
		animationName: animations.pulse,
		animationDuration: '1s',
		animationIterationCount: 'infinite',
	},
	signupContainer: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		height: '100vh',
		background: tokens.gradiantBackground,
	},
	signupBox: {
		padding: '10px',
		width: '500px',
		height: '440px',
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
	},
	span: {
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
