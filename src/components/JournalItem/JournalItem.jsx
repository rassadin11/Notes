import './JournalItem.css';

function JournalItem ({title, date, post}) {
	const new_date = date.split('-').reverse().join('.');

	return (
		<>
			<h2 className="journal-item__header">{title}</h2>
			<p className="journal-item__body">
				<span className="journal-item__date">{new_date}</span>
				<span className="journal-item__text">{post}</span>
			</p>
		</>
	);
}

export default JournalItem;