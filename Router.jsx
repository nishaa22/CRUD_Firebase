import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Login from './src/pages/Login';
import Signup from './src/pages/Signup';
import Dashboard from './src/pages/Dashboard';
import { useEffect } from 'react';
import CreateNote from './src/pages/Dashboard/CreateNote';

const Router = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const token = sessionStorage.getItem('token');

	useEffect(() => {
		if (!token && location.pathname !== '/') {
			navigate('/');
		}
	}, [token]);

	return (
		<Routes>
			<Route element={<Login />} path="/" />
			<Route element={<Signup />} path="/signup" />
			{token ? (
				<>
					<Route element={<Dashboard />} path="/dashboard" />
					<Route element={<CreateNote />} path="/create-note" />
				</>
			) : (
				<Route element={<Login />} path={`/${location.pathname}`} />
			)}
		</Routes>
	);
};

export default Router;
