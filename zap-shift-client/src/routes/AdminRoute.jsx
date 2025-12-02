import React from 'react';
import useAuth from '../Hooks/useAuth';
import useRole from '../Hooks/useRole';

const AdminRoute = ({ children }) => {
  const { loading } = useAuth();
  const { roleLoading, role } = useRole();

  if (loading || roleLoading) {
    return <p className="text-4xl">Loading....</p>;
  }

  if (role !== 'admin') {
    return (
      <div>
        <h3 className="text-3xl">Forbidden</h3>
      </div>
    );
  }

  return children;
};

export default AdminRoute;
