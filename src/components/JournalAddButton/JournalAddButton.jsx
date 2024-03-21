import { useContext } from 'react';
import CardButton from '../CardButton/CardButton';
import GlobalSvgSelector from '../GlobalSvgSelector/GlobalSvgSelector';
import './JournalAddButton.css';
import { UserContext } from '../../context/user.context';

function JournalAddButton () {
	const {setModifyPost} = useContext(UserContext);

	return <CardButton className="journal-add-button" onClick={() => setModifyPost()}><span><GlobalSvgSelector id="plus"/></span> Новое воспоминание</CardButton>;
}

export default JournalAddButton;