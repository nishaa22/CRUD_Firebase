import * as stylex from '@stylexjs/stylex';
import Navbar from '../../components/Navbar';
import { useEffect, useState } from 'react';
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import NoteCard from './NoteCard';
import { db } from '../../../firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { Spin, message } from 'antd';
import AdminNavbar from '../../components/AdminNav';

const Dashboard = () => {
	const [messageApi, contextHolder] = message.useMessage();

	const navigate = useNavigate();
	const [notesData, setNotesData] = useState([]);
	const [userDetails, setUserDetails] = useState({});
	const [isDeleted, setIsDeleted] = useState(false);
	const [adminDetails, setAdminDetails] = useState({});

	const getNotesData = async () => {
		const userId = sessionStorage.getItem('userId');
		const querySnapshot = await getDocs(
			collection(db, `users/${userId}/notes`)
		);
		const newData = [];
		querySnapshot.forEach((doc) => {
			newData.push({ ...doc.data(), id: doc.id });
			// console.log(doc.id, ' => ', doc.data());
		});
		setNotesData(newData);
	};

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
		getNotesData();
		getUserDetails();
		getAdminDetails();
	}, []);

	const handleDelete = async (id) => {
		console.log(id);
		const userId = sessionStorage.getItem('userId');
		await deleteDoc(doc(db, `users/${userId}/notes`, id));
		setIsDeleted(true);
		messageApi.open({
			type: 'success',
			content: 'Deleted Successfully....',
		});
		getNotesData();
	};

	const handleEdit = async (id) => {
		navigate(`/edit-note/${id}`);
	};
	console.log(userDetails, adminDetails, 'userDetails@@@');
	return (
		<>
			<div {...stylex.props(styles.dashboardContainer)}>
				{contextHolder}
				{adminDetails ? (
					<div>
						<AdminNavbar />
						<div {...stylex.props(styles.container)}>
							{adminDetails.name && (
								<div {...stylex.props(styles.heading)}>
									Hellooo!!&nbsp;
									<span {...stylex.props(styles.username)}>
										{adminDetails.name}
									</span>
									, Welcome to Notes App
								</div>
							)}
						</div>
					</div>
				) : (
					<div>
						<Navbar />
						{notesData && userDetails.name ? (
							<div {...stylex.props(styles.container)}>
								{userDetails.name && (
									<div {...stylex.props(styles.heading)}>
										Hellooo!!&nbsp;
										<span {...stylex.props(styles.username)}>
											{userDetails.name}
										</span>
										, Welcome to Notes App
									</div>
								)}
								<div {...stylex.props(styles.notesContainer)}>
									{notesData.map((d) => {
										return (
											<NoteCard
												key={d.id}
												data={d}
												handleDelete={handleDelete}
												handleEdit={handleEdit}
												isDeleted={isDeleted}
											/>
										);
									})}
								</div>
							</div>
						) : (
							<div
								style={{
									margin: '200px 0px',
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
								}}
							>
								<Spin size="large" />
							</div>
						)}
					</div>
				)}
				{/* <div {...stylex.props(styles.loader)}>
						<Spin size="large" />
					</div> */}
			</div>
		</>
	);
};

export default Dashboard;

const styles = stylex.create({
	dashboardContainer: {
		height: '100vh',
		overflowY: 'scroll',
	},
	heading: {
		fontSize: '30px',
		fontWeight: '400',
		margin: '10px 0px 40px',
	},
	username: {
		fontSize: '30px',
		fontWeight: '700',
		margin: '10px 0px 40px',
	},
	container: {
		padding: '40px',
	},
	notesContainer: {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'center',
	},
	loader: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 300,
	},
});
