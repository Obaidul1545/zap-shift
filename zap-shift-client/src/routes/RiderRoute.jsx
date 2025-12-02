import React from 'react';
import useAuth from '../Hooks/useAuth';
import useRole from '../Hooks/useRole';

const RiderRoute = ({ children }) => {
  const { loading, user } = useAuth();
  const { roleLoading, role } = useRole();

  if (loading || !user || roleLoading) {
    return <p className="text-4xl">Loading....</p>;
  }

  if (role !== 'rider') {
    return (
      <div>
        <h3 className="text-3xl">Forbidden</h3>
      </div>
    );
  }

  return children;
};

export default RiderRoute;
