import s from './Button.module.css';

function Button ({children, onClick}) {
	return <button className={`${s.button} ${s.accent}`} onClick={onClick}>{children}</button>;
}

export default Button;