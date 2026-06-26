import '@mantine/core/styles.css';
import './App.css';
import { MantineProvider } from '@mantine/core';
import VegetablesPage from './pages/VegetablesPage/VegetablesPage';
import { Provider } from 'react-redux';
import { store } from './store/store';

export default function App() {
	return (
		<Provider store={store}>
			<MantineProvider>{<VegetablesPage />}</MantineProvider>
		</Provider>
	);
}
