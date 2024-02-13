import * as stylex from '@stylexjs/stylex';
import Navbar from '../../components/Navbar';

const Dashboard = () => {
	return (
		<div {...stylex.props(styles.dashboardContainer)}>
			<div>
				<Navbar />
				<div>Dashboard</div>
			</div>
		</div>
	);
};

export default Dashboard;

const styles = stylex.create({
	dashboardContainer: {
		height: '100vh',
	},
});
