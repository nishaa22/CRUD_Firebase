import * as stylex from '@stylexjs/stylex';

const NoteCard = ({ data, handleDelete, handleEdit }) => {
	const { id, name, description } = data;
	const timestamp = data.createdDate;
	let noteDate = new Date(
		timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000
	);
	noteDate = noteDate.toLocaleString();

	return (
		<div {...stylex.props(styles.cardContainer)}>
			<div>
				<div {...stylex.props(styles.heading)}>{name}</div>
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
	cardContainer: {
		width: '300px',
		background: '#fff',
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
});
