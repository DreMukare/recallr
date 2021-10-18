import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import LandingPage from './pages/LandingPage';
import UserDash from './pages/UserDash';
import SignUp from './pages/SignUp';
import Settings from './pages/Settings';

function App() {
	return (
		<AuthProvider>
			<Router>
				<div className='App'>
					<Switch>
						<Route path='/' exact component={LandingPage} />
						<Route path='/sign-up' exact component={SignUp} />
						<PrivateRoute path='/dashboard' component={UserDash} />
						<PrivateRoute path='/settings' component={Settings} />
					</Switch>
				</div>
			</Router>
		</AuthProvider>
	);
}

export default App;
