import './App.css';
import Header from './components/Header/Header';
import JournalAddButton from './components/JournalAddButton/JournalAddButton';
import JournalForm from './components/JournalForm/JournalForm';
import JournalList from './components/JournalList/JournalList';
import LeftPanel from './layouts/LeftPanel/LeftPanel';
import Body from './layouts/RightPanel/Body';
import { useLocalStorage } from './hooks/useLocalStorage.hook';
import { UserContextProvider } from './context/user.context';

function mapItems(items) {
	if (!items) return [];
	
	return items.map(i => ({
		...i,
		date: i.date
	}));
}

function App() {
	const [data, setData] = useLocalStorage('data');

	const updateData = (item) => {
		if (!item.id) {
			if (data) {
				setData([...data, {
					post: item.post,
					title: item.title,
					date: item.date,
					tag: item.tag,
					userId: item.userId,
					id: data.length ? Math.max(...data.map(i => i.id)) + 1 : 1
				}]);
			} else {
				setData([...data, {
					post: item.post,
					title: item.title,
					date: item.date,
					tag: item.tag,
					userId: item.userId,
					id: 1
				}]);
			}
		} else setData([...data.filter(i => i.id !== item.id), item]);
	};

	const removePost = (id) => {
		setData([...data.filter(i => i.id !== id)]);
	};

	return (
		<UserContextProvider>
			<LeftPanel>
				<Header/>
				<JournalAddButton/>
				<JournalList items={mapItems(data)}></JournalList>
			</LeftPanel>
			<Body>
				<JournalForm setData={updateData} removePost={removePost}/>
			</Body>
		</UserContextProvider>
	);
}

export default App;
