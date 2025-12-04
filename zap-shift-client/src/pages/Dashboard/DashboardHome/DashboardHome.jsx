import useRole from '../../../Hooks/useRole';
import AdminDashboard from './AdminDashboard';
import RiderDashboard from './RiderDashboard';
import UserDashboard from './UserDashboard';

const DashboardHome = () => {
  const { role, roleLoading } = useRole();

  if (roleLoading) {
    return <p>loading....</p>;
  }
  if (role === 'admin') {
    return <AdminDashboard></AdminDashboard>;
  } else if (role === 'rider') {
    return <RiderDashboard></RiderDashboard>;
  } else {
    return <UserDashboard></UserDashboard>;
  }
};

export default DashboardHome;
