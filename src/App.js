import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import LandingPage from './pages/LandingPage';
import UserDash from './pages/UserDash';

function App() {
	return (
		<AuthProvider>
			<Router>
				<div className='App'>
					<Switch>
						<Route path='/' exact component={LandingPage} />
						<PrivateRoute path='/dashboard' component={UserDash} />
					</Switch>
				</div>
			</Router>
		</AuthProvider>
	);
}

export default App;
