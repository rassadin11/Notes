import { useContext } from 'react';
import { UserContext } from '../../context/user.context';

function SelectUser() {
	const {userId, setUserId} = useContext(UserContext);

	return (
		<select name="user" id="user" value={userId} onChange={e => setUserId(+e.target.value)}>
			<option value="1">Артём</option>
			<option value="2">Арина</option>
		</select>
	);
}

export default SelectUser;