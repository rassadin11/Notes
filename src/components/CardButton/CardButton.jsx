import './CardButton.css';

function CardButton ({children, className, onClick}) {

	const cl = className ? 'card-button ' + className : 'card-button';

	return <button className={cl} onClick={onClick}>{children}</button>;
}

export default CardButton;