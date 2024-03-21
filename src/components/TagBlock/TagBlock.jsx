import s from './TagBlock.module.css';
import style from '../JournalForm/JournalForm.module.css';
import folder from '../../assets/folder.svg';

const TagBlock = ({formValidState, value, onChange}) => {
	return (
		<label className={s.wrapper} htmlFor="tag">
			<p className={s.icon}><img src={folder} alt="Folder" /></p>
			<p className={s.title}>Тег</p>
			<input type="text" name='tag' id="tag" value={value} onChange={onChange} placeholder='Введите тег' className={`${style.input} ${!formValidState.date && style.invalid}`}/>
		</label>
	);
};

export default TagBlock;