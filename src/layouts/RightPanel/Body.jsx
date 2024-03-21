import s from './Body.module.css';

const Body = ({children}) => {
	return (
		<div className={s.wrapper}>{children}</div>
	);
};

export default Body;