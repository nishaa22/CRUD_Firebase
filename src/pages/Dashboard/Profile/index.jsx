import * as stylex from '@stylexjs/stylex';
import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../../../../firebaseConfig';
import Button from '../../../components/Button';
import { useNavigate } from 'react-router-dom';
import { animations, tokens } from '../../../../token.stylex';
import { Spin } from 'antd';

const Profile = () => {
	const navigate = useNavigate();
	const [userDetails, setUserDetails] = useState({});
	const [adminDetails, setAdminDetails] = useState({});

	const getUserDetails = async () => {
		const userId = sessionStorage.getItem('userId');
		const querySnapshot = await getDocs(
			collection(db, `users/${userId}/details`)
		);
		const newData = [];
		querySnapshot.forEach((doc) => {
			newData.push({ ...doc.data(), id: doc.id });
			// console.log(doc.id, ' => ', doc.data());
		});
		setUserDetails(newData[0]);
	};

	const getAdminDetails = async () => {
		const userId = sessionStorage.getItem('userId');
		const querySnapshot = await getDocs(
			collection(db, `admin/${userId}/details`)
		);
		const newData = [];
		querySnapshot.forEach((doc) => {
			newData.push({ ...doc.data(), id: doc.id });
			// console.log(doc.id, ' => ', doc.data());
		});
		setAdminDetails(newData[0]);
	};

	useEffect(() => {
		getUserDetails();
		getAdminDetails();
	}, []);

	return (
		<>
			<div {...stylex.props([styles.profileContainer, styles.fadeIn])}>
				<div {...stylex.props(styles.profileBox)}>
					<h1 {...stylex.props(styles.heading)}>Your profile</h1>
					{(userDetails ? userDetails.name : adminDetails.name) ? (
						<div {...stylex.props(styles.details)}>
							<div>
								Name:{' '}
								<span {...stylex.props(styles.span)}>
									{userDetails ? userDetails.name : adminDetails.name}
								</span>
							</div>
							<div>
								Email:{' '}
								<span {...stylex.props(styles.span)}>
									{userDetails ? userDetails.email : adminDetails.email}
								</span>
							</div>
							<div>
								Password:{' '}
								<span {...stylex.props(styles.span)}>
									{userDetails ? userDetails.password : adminDetails.password}
								</span>
							</div>
							<div>
								Role:{' '}
								<span {...stylex.props(styles.span)}>
									{userDetails ? userDetails.role : adminDetails.role}
								</span>
							</div>
						</div>
					) : (
						<div style={{ margin: '20px 0px' }}>
							<Spin size="large" />
						</div>
					)}
					<Button btnText={'Go back'} onClick={() => navigate('/dashboard')} />
				</div>
			</div>
		</>
	);
};

export default Profile;

const styles = stylex.create({
	fadeIn: {
		animationName: animations.fadeIn,
		animationDuration: '1s',
	},
	profileContainer: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		background: tokens.gradiantBackground,
		height: '100vh',
	},
	profileBox: {
		padding: '10px',
		width: '500px',
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
	details: {
		padding: '20px 40px',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		fontSize: '18px',
		gap: '7px',
		fontWeight: '600',
	},
	span: {
		fontWeight: '300 !important',
	},
});
