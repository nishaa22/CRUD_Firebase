import * as stylex from '@stylexjs/stylex';
import Button from '../../components/Button';
import InputField from '../../components/InputField';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../firebaseConfig';
import swal from 'sweetalert';
import { animations, tokens } from '../../../token.stylex';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const Login = () => {
	// email - nisha.excellencetechnologies@gmail.com password - nisha@12345
	const navigate = useNavigate();
	const [loginDetails, setLoginDetails] = useState({
		email: '',
		password: '',
	});
	const [isLoading, setIsLoading] = useState(false);

	const handleChange = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		setLoginDetails((prev) => {
			return {
				...prev,
				[name]: value,
			};
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setIsLoading(true);
		signInWithEmailAndPassword(auth, loginDetails.email, loginDetails.password)
			.then((userCredential) => {
				const user = userCredential.user;
				console.log(user, 'KKKusrr');
				if (user) {
					setIsLoading(false);
					sessionStorage.setItem('token', user.accessToken);
					sessionStorage.setItem('userId', user.uid);
					swal('Hooorraayyy!!!', 'User logged in successfully..', 'success');
					setLoginDetails({ email: '', password: '' });
					navigate('/dashboard');
				}
			})
			.catch((error) => {
				setIsLoading(false);
				const errorCode = error.code;
				// const errorMessage = error.message;
				swal('Oops!', errorCode, 'error');
			});
	};

	return (
		<>
			<div {...stylex.props([styles.loginContainer, styles.fadeIn])}>
				<div {...stylex.props(styles.loginBox)}>
					<h1 {...stylex.props([styles.heading, styles.pulse])}>
						Hey&#128075;, Please Login
					</h1>
					<form
						{...stylex.props(styles.loginForm)}
						onSubmit={(e) => handleSubmit(e)}
					>
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
										'Login'
									)
								}
							/>
						</div>
					</form>
					<div
						onClick={() => navigate('/forgot-password')}
						{...stylex.props(styles.forgotPassword)}
					>
						Forgot password ?
					</div>
					<div {...stylex.props(styles.signupLink)}>
						Haven&rsquo;t registered yet?&nbsp;
						<span
							onClick={() => navigate('/signup')}
							{...stylex.props(styles.span)}
						>
							Signup
						</span>
					</div>
				</div>
			</div>
		</>
	);
};

export default Login;

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
	loginContainer: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		background: tokens.gradiantBackground,
		height: '100vh',
	},
	loginBox: {
		padding: '10px',
		width: '500px',
		height: '380px',
		borderRadius: '10px',
		background: 'white',
		boxShadow: '3px 1px 10px lightgray',
	},
	heading: {
		textAlign: 'center',
		margin: '10px 0px',
	},
	loginForm: {
		marginTop: '40px',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'column',
	},
	actionBtn: {
		marginTop: '20px',
	},
	signupLink: {
		textAlign: 'center',
		margin: '10px 0px',
		fontSize: '14px',
		color: 'gray',
	},
	forgotPassword: {
		textAlign: 'center',
		cursor: 'pointer',
		margin: '10px 0px',
		fontSize: '14px',
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
