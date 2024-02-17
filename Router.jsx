import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Login from './src/pages/Login';
import Signup from './src/pages/Signup';
import Dashboard from './src/pages/Dashboard';
import { useEffect } from 'react';
import CreateNote from './src/pages/Dashboard/CreateNote';
import EditNote from './src/pages/Dashboard/EditNote';
import Profile from './src/pages/Dashboard/Profile';
import ForgotPassword from './src/pages/ForgotPassword';
import DisplayAllUsers from './src/pages/Dashboard/Admin/DisplayAllUsers';

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
			<Route element={<ForgotPassword />} path="/forgot-password" />

			{token ? (
				<>
					<Route element={<Dashboard />} path="/dashboard" />
					<Route element={<CreateNote />} path="/create-note" />
					<Route element={<EditNote />} path="/edit-note/:id" />
					<Route element={<Profile />} path="/profile" />
					<Route element={<DisplayAllUsers />} path="/display-all-users" />
				</>
			) : (
				<Route element={<Login />} path={`/${location.pathname}`} />
			)}
		</Routes>
	);
};

export default Router;
