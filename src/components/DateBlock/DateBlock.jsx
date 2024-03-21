import s from './DateBlock.module.css';
import style from '../JournalForm/JournalForm.module.css';
import calendar from '../../assets/calendar.svg';
import { forwardRef } from 'react';

// eslint-disable-next-line react/display-name
const DateBlock = forwardRef(({formValidState, value, onChange}, ref) => {
	const invalid = !formValidState.date ? style.invalid : '';

	return (
		<label className={s.wrapper} htmlFor="date">
			<p className={s.icon}><img src={calendar} alt="Calendar" /></p>
			<p className={s.title}>Дата</p>
			<input type="date" name='date' id="date" ref={ref} value={value} onChange={onChange} className={`${style.input} ${invalid}`}/>
		</label>
	);
});

export default DateBlock;