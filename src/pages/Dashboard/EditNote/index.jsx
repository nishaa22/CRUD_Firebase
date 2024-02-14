import * as stylex from '@stylexjs/stylex';
import InputField from '../../../components/InputField';
import { useEffect, useState } from 'react';
import TextArea from '../../../components/TextArea';
import Button, { OutlineButton } from '../../../components/Button';
import { useLocation, useNavigate } from 'react-router-dom';
import { collection, updateDoc, doc, getDocs } from 'firebase/firestore';
import { db } from '../../../../firebaseConfig';

const EditNote = () => {
	const navigate = useNavigate();
	const location = useLocation();
	let id = location.pathname.split('/')[2];
	const [notes, setNotes] = useState([]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setNotes((prev) => {
			return {
				...prev,
				id: Math.random(),
				createdDate: new Date(),
				[name]: value,
			};
		});
	};

	const getNotesData = async () => {
		const userId = sessionStorage.getItem('userId');
		const querySnapshot = await getDocs(
			collection(db, `users/${userId}/notes`)
		);
		const newData = [];
		querySnapshot.forEach((doc) => {
			newData.push({ ...doc.data(), id: doc.id });
		});
		setNotes(newData.filter((v) => v.id == id)[0]);
	};

	useEffect(() => {
		getNotesData();
	}, []);

	console.log(notes);
	const handleSubmit = async (e) => {
		e.preventDefault();
		const userId = sessionStorage.getItem('userId');
		await updateDoc(doc(db, `users/${userId}/notes`, id), notes);
		navigate('/dashboard');
	};

	return (
		<>
			<div {...stylex.props(styles.notesContainer)}>
				<div {...stylex.props(styles.notesBox)}>
					<h1 {...stylex.props(styles.heading)}>Hey&#9997;, Update notes</h1>
					<form {...stylex.props(styles.notesForm)}>
						<InputField
							text={'Note heading'}
							type={'text'}
							placeholder="Enter note heading"
							name="name"
							value={notes.name}
							onChange={handleChange}
						/>
						<TextArea
							text={'Note Description'}
							type={'text'}
							placeholder="Enter note description"
							name="description"
							value={notes.description}
							onChange={handleChange}
						/>
						<div {...stylex.props(styles.btnDiv)}>
							<OutlineButton
								btnText={'Cancel'}
								onClick={() => navigate('/dashboard')}
							/>
							<Button
								btnText={'Update Note'}
								onClick={(e) => handleSubmit(e)}
							/>
						</div>
					</form>
				</div>
			</div>
		</>
	);
};

export default EditNote;

const styles = stylex.create({
	notesContainer: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		background: 'linear-gradient(45deg, #eba434, #af32e6)',
		height: '100vh',
	},
	notesBox: {
		padding: '10px',
		width: '500px',
		height: '410px',
		borderRadius: '10px',
		background: 'white',
		boxShadow: '3px 1px 10px lightgray',
	},
	heading: {
		textAlign: 'center',
		margin: '10px 0px',
	},
	notesForm: {
		marginTop: '40px',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'column',
	},
	actionBtn: {
		marginTop: '20px',
	},
	btnDiv: {
		display: 'flex',
		gap: '10px',
		marginTop: '20px',
	},
});
