import { useContext, useMemo } from 'react';
import CardButton from '../CardButton/CardButton';
import JournalItem from '../JournalItem/JournalItem';
import './JournalList.css';
import { UserContext } from '../../context/user.context';

function JournalList ({items}) {
	const {userId, setModifyPost} = useContext(UserContext);
	
	const typeOfSort = (a, b) => {
		if (a.date > b.date) return 1;
		else return -1;
	};

	const filteredItems = useMemo(() => items.filter(el => el.userId === userId)
		.sort(typeOfSort), [items, userId]);

	if (items.length === 0) {
		return (
			<p>Записей нет, создайте первую</p>
		);
	}

	return (
		<div className="journal-list">
			{filteredItems.map(item => {
				return (
					<CardButton key={item.id} className='journal-item' onClick={() => setModifyPost(item)}>
						<JournalItem {...item}/>
					</CardButton>
				);
			})}
		</div>
	);
}

export default JournalList;