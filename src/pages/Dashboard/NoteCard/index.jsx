/* eslint-disable react/prop-types */
import * as stylex from '@stylexjs/stylex';
import { useEffect, useState } from 'react';
import { ColorPicker, Tooltip } from 'antd';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../../../firebaseConfig';
import { animations } from '../../../../token.stylex';

const NoteCard = ({ data, handleDelete, handleEdit, isDeleted }) => {
	const { id, name, description, cardColor, createdDate } = data;
	let noteDate = new Date(
		createdDate.seconds * 1000 + createdDate.nanoseconds / 1000000
	);
	noteDate = noteDate.toLocaleString();
	const [color, setColor] = useState(cardColor);

	function rgbaToHex({ r, g, b, a }) {
		const rHex = Math.round(r).toString(16).padStart(2, '0');
		const gHex = Math.round(g).toString(16).padStart(2, '0');
		const bHex = Math.round(b).toString(16).padStart(2, '0');
		const aHex = Math.round(a * 255)
			.toString(16)
			.padStart(2, '0');
		const hex = `#${rHex}${gHex}${bHex}${aHex}`;
		return hex.toUpperCase();
	}

	// const getCardColor = async (userId, id) => {
	// 	try {
	// 		const docRef = doc(db, `users/${userId}/notes`, id);
	// 		console.log(docRef, 'KKK');
	// 		const docSnap = await getDoc(docRef);
	// 		if (docSnap.exists()) {
	// 			const notes = docSnap.data();
	// 			const cardColor = notes.cardColor;
	// 			console.log('KKKKKKKK');
	// 			return cardColor;
	// 		} else {
	// 			return null;
	// 		}
	// 	} catch (error) {
	// 		return null;
	// 	}
	// };

	const updateCardColor = async () => {
		try {
			const userId = sessionStorage.getItem('userId');
			const docRef = doc(db, `users/${userId}/notes`, id);
			console.log(docRef, 'KKKLL');
			const docSnap = await getDoc(docRef);
			if (docSnap.exists()) {
				const notes = docSnap.data();
				console.log(notes, 'KK');
				const updatedNotes = {
					...notes,
					cardColor: color,
				};
				await updateDoc(docRef, updatedNotes);
			} else {
				console.log('Document does not exist');
			}
		} catch (error) {
			console.error('Error updating document: ', error);
		}
	};

	useEffect(() => {
		if (color) {
			updateCardColor();
		}
	}, [color]);

	// useEffect(() => {
	// 	if (cardColor || color) {
	// 		let s = getCardColor();
	// 		setColor(s);
	// 	}
	// }, [cardColor, color]);

	return (
		<div
			{...stylex.props([
				styles.cardContainer,
				isDeleted ? styles.fadeOut : styles.fadeIn,
			])}
			style={{ background: color ? color : cardColor }}
		>
			<div>
				<div {...stylex.props(styles.cardTop)}>
					<div {...stylex.props(styles.heading)}>{name}</div>
					<Tooltip placement="top" title={'change card color'}>
						<ColorPicker
							defaultValue={color ? color : cardColor}
							size="small"
							onChange={(color) => {
								setColor(
									rgbaToHex({
										r: color.metaColor.r,
										g: color.metaColor.g,
										b: color.metaColor.b,
										a: color.metaColor.a,
									})
								);
							}}
						/>
					</Tooltip>
				</div>
				<div {...stylex.props(styles.description)}>{description}</div>
			</div>
			<div>
				<div {...stylex.props(styles.date)}>{noteDate}</div>
				<div {...stylex.props(styles.actionBtn)}>
					<div onClick={() => handleEdit(id)}>Edit</div>
					<div onClick={() => handleDelete(id)}>Delete</div>
				</div>
			</div>
		</div>
	);
};

export default NoteCard;

const styles = stylex.create({
	fadeIn: {
		animationName: animations.fadeIn,
		animationDuration: '1s',
	},
	fadeOut: {
		animationName: animations.fadeOut,
		animationDuration: '1s',
	},
	cardContainer: {
		width: '300px',
		// background: '#fff',
		padding: '12px',
		borderRadius: '10px',
		margin: '10px',
		boxShadow: '1px 1px 10px lightgray',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between',
	},
	heading: {
		fontSize: '18px',
		fontWeight: 800,
		marginBottom: '10px',
	},
	description: {
		fontSize: '16px',
		fontWeight: 500,
	},
	actionBtn: {
		display: 'flex',
		justifyContent: 'flex-end',
		gap: '10px',
		cursor: 'pointer',
	},
	date: {
		display: 'flex',
		justifyContent: 'flex-end',
		color: 'gray',
		fontStyle: 'italic',
		fontSize: '12px',
		marginTop: '20px',
	},
	cardTop: {
		display: 'flex',
		justifyContent: 'space-between',
	},
});
