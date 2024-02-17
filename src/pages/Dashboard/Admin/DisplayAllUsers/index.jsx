import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../../../firebaseConfig';
import { useEffect, useState } from 'react';
import * as stylex from '@stylexjs/stylex';
import { tokens } from '../../../../../token.stylex';

const DisplayAllUsers = () => {
	const [allUsers, setAllUsers] = useState([]);
	const getAllUserDetails = async () => {
		try {
			const querySnapshot = await getDocs(collection(db, 'users'));
			const usersData = [];
			console.log(querySnapshot);
			querySnapshot.forEach((doc) => {
				usersData.push({ id: doc.id, ...doc.data() });
			});
			setAllUsers(usersData);
		} catch (error) {
			console.error('Error getting documents: ', error);
		}
	};
	useEffect(() => {
		getAllUserDetails();
	}, []);
	console.log(allUsers, 'allUsers@@');
	return <div {...stylex.props(styles.container)}>DisplayAllUsers</div>;
};

export default DisplayAllUsers;

const styles = stylex.create({
	container: {
		background: tokens.gradiantBackground,
		height: '100vh',
	},
});
