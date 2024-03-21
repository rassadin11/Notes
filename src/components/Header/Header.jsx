import SelectUser from '../SelectUser/SelectUser';
import s from './Header.module.css';
import GlobalSvgSelector from '../GlobalSvgSelector/GlobalSvgSelector';

const Header = () => {
	return (
		<>
			<div className={s.logo}>
				<GlobalSvgSelector id={'header'}/>
			</div>
			<SelectUser/>
		</>
	);
};

export default Header;