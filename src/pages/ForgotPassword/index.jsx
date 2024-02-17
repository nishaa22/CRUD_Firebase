import * as stylex from '@stylexjs/stylex';
import InputField from '../../components/InputField';
import { useState } from 'react';
import { animations, tokens } from '../../../token.stylex';
import Button, { OutlineButton } from '../../components/Button';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../../firebaseConfig';
import { Spin, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { LoadingOutlined } from '@ant-design/icons';

const ForgotPassword = () => {
	const navigate = useNavigate();
	const [messageApi, contextHolder] = message.useMessage();
	const [isLoading, setIsLoading] = useState(false);
	const [email, setEmail] = useState('');

	const resetPassword = (e) => {
		e.preventDefault();
		setIsLoading(true);
		sendPasswordResetEmail(auth, email)
			.then(() => {
				setIsLoading(false);
				messageApi.open({
					type: 'success',
					content: 'Check your email',
				});
				setTimeout(() => {
					navigate('/login');
				}, [800]);
			})
			.catch((e) => {
				setIsLoading(false);
				messageApi.open({
					type: 'error',
					content: e,
				});
			});
	};

	return (
		<>
			<div {...stylex.props([styles.container, styles.fadeIn])}>
				{contextHolder}
				<div {...stylex.props(styles.box)}>
					<h1 {...stylex.props(styles.heading)}>Reset Password</h1>
					<form
						onSubmit={(e) => resetPassword(e)}
						{...stylex.props(styles.form)}
					>
						<InputField
							name={email}
							placeholder={'Enter the email'}
							type={'email'}
							text={'Email'}
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
						<div {...stylex.props(styles.btnDiv)}>
							<OutlineButton
								btnText={'Cancel'}
								onClick={() => navigate('/login')}
							/>
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
										'ResetPassword'
									)
								}
							/>
						</div>
					</form>
				</div>
			</div>
		</>
	);
};

export default ForgotPassword;

const styles = stylex.create({
	fadeIn: {
		animationName: animations.fadeIn,
		animationDuration: '1s',
	},
	container: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		background: tokens.gradiantBackground,
		height: '100vh',
	},
	box: {
		padding: '10px',
		width: '400px',
		borderRadius: '10px',
		background: 'white',
		boxShadow: '3px 1px 10px lightgray',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	heading: {
		textAlign: 'center',
		margin: '10px 0px',
	},
	form: {
		display: 'flex',
		justifyContent: 'center',
		flexDirection: 'column',
		alignItems: 'center',
	},
	btnDiv: {
		display: 'flex',
		gap: '10px',
		marginTop: '20px',
	},
});
