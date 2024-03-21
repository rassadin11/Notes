import { useContext, useEffect, useReducer, useRef } from 'react';
import s from './JournalForm.module.css';
import Button from '../Button/Button';
import cn from 'classnames';
import DateBlock from '../DateBlock/DateBlock';
import save from '../../assets/save.svg';
import { INITIAL_STATE, formReducer } from './JournalForm.state';
import TagBlock from '../TagBlock/TagBlock';
import { UserContext } from '../../context/user.context';

const JournalForm = ({setData, removePost}) => {
	const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);
	const {isValid, isFormReadyToSubmit, values} = formState;
	const titleRef = useRef();
	const dateRef = useRef();
	const postRef = useRef();
	const {userId, setModifyPost, modifyPost} = useContext(UserContext);

	// вариант того, как можно избежать конфликта
	// между таймаутами во время их использования в useEffect
	const focusError = (isValid) => {
		switch(true) {
		case !isValid.title: 
			titleRef.current.focus();
			break;
		case !isValid.date: 
			dateRef.current.focus();
			break;
		case !isValid.post: 
			postRef.current.focus();
			break;
		}
	};

	useEffect(() => {
		let timerId;

		if (!isValid.date || !isValid.post || !isValid.date) {
			focusError(isValid);
			timerId = setTimeout(() => {
				dispatchForm({type: 'RESET_VALIDITY'});
			}, 2000);
		}

		return () => {
			clearTimeout(timerId);
		};
	}, [isValid]);

	const addJournalItem = (event) => {
		event.preventDefault();
		dispatchForm({type: 'SUBMIT'});
	};

	useEffect(() => {
		if (isFormReadyToSubmit) {
			if (modifyPost) {
				setData({...values});
				setModifyPost();
				dispatchForm({type: 'CLEAR_FORM'});
			} else {
				setData({...values, userId});
				dispatchForm({type: 'CLEAR_FORM'});
			}
		}
	}, [isFormReadyToSubmit, values, setData]);

	const changePost = (e) => {
		dispatchForm({type: 'CHANGE_POST', payload: {
			[e.target.name]: e.target.value
		}});
	};

	useEffect(() => {
		if (!modifyPost) {
			return dispatchForm({type: 'CLEAR_FORM'});
		}

		dispatchForm({type: 'CHANGE_POST', payload: {
			...modifyPost
		}});
	}, [modifyPost]);

	const deletePost = () => {
		removePost(modifyPost.id);
		setModifyPost();
		dispatchForm({type: 'CLEAR_FORM'});
	};

	return (
		<form className={s['journal-form']} onSubmit={addJournalItem}>
			<div className={s['title-wrapper']}>
				<input type="text" name='title' ref={titleRef} placeholder='Введите название' value={values.title} onChange={changePost} className={cn(s['input'], s['input_title'], {
					[s['invalid']]: !isValid.title
				})}/>

				{modifyPost?.id && <button className={s.save} onClick={deletePost} type="button">
					<img src={save} alt="Save" />
					<svg className={s.circle} xmlns="http://www.w3.org/2000/svg">
						<g>
							<ellipse className={s.foreground} ry="15" rx="15" cy="17" cx="17" strokeWidth="2"/>
						</g>
					</svg>
				</button>}
			</div>
			<DateBlock formValidState={isValid} ref={dateRef} value={values.date} onChange={changePost}/>
			<TagBlock formValidState={isValid} value={values.tag} onChange={changePost}/>
			<textarea name="post" ref={postRef} cols="50" placeholder='Введите текст' rows="10" value={values.post} onChange={changePost} className={`${s.input} ${s.textarea} ${!isValid.post && s.invalid}`}></textarea>
			<div className={s.submitButton}><Button>Сохранить</Button></div>
		</form>	
	);
};

export default JournalForm;