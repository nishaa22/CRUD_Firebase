import * as stylex from '@stylexjs/stylex';
import InputField from '../../../components/InputField';
import { useState } from 'react';
import TextArea from '../../../components/TextArea';
import Button, { OutlineButton } from '../../../components/Button';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc, getFirestore } from 'firebase/firestore';
import { tokens } from '../../../../token.stylex';
const db = getFirestore();

const CreateNote = () => {
	const navigate = useNavigate();
	const [notes, setNotes] = useState({
		name: '',
		description: '',
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setNotes((prev) => {
			return {
				...prev,
				[name]: value,
				createdDate: new Date(),
			};
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const userId = sessionStorage.getItem('userId');
		const docRef = await addDoc(collection(db, `users/${userId}/notes`), notes);
		if (docRef.id) {
			setNotes({ name: '', description: '' });
			navigate('/dashboard');
		}
	};

	return (
		<>
			<div {...stylex.props(styles.notesContainer)}>
				<div {...stylex.props(styles.notesBox)}>
					<h1 {...stylex.props(styles.heading)}>Hey&#9997;, Add notes</h1>
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
							<Button btnText={'Add Note'} onClick={(e) => handleSubmit(e)} />
						</div>
					</form>
				</div>
			</div>
		</>
	);
};

export default CreateNote;

const styles = stylex.create({
	notesContainer: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		background: tokens.gradiantBackground,
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
