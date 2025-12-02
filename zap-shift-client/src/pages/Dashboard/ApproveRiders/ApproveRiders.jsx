import { useQuery } from '@tanstack/react-query';
import { FaEye, FaUserCheck } from 'react-icons/fa';
import { RiUserUnfollowFill } from 'react-icons/ri';
import { FaTrashAlt } from 'react-icons/fa';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const ApproveRiders = () => {
  const axiosSecure = useAxiosSecure();
  const { refetch, data: riders = [] } = useQuery({
    queryKey: ['riders', 'pending'],
    queryFn: async () => {
      const res = await axiosSecure.get('/riders');
      return res.data;
    },
  });

  console.log(riders);

  const updateRiderStatus = (rider, status) => {
    const updateInfo = { status: status, email: rider.email };
    axiosSecure.patch(`/riders/${rider._id}`, updateInfo).then((res) => {
      if (res.data.modifiedCount) {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: `Rider status is set to ${status}`,
          showConfirmButton: false,
          timer: 2000,
        });
        refetch();
      }
    });
  };

  const handleApproval = (rider) => {
    updateRiderStatus(rider, 'approved');
  };

  const handleRejection = (rider) => {
    updateRiderStatus(rider, 'rejected');
  };
  return (
    <div>
      <h2 className="text-4xl">Pending Riders : {riders.length}</h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Application Status</th>
              <th>Work Status</th>
              <th>District</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {riders.map((rider, i) => (
              <tr key={rider._id}>
                <th>{i + 1}</th>
                <td>{rider.name}</td>
                <td>{rider.email}</td>
                <td>
                  <p
                    className={`${
                      rider.status === 'approved'
                        ? 'text-green-400'
                        : 'text-red-400'
                    }`}
                  >
                    {rider.status}
                  </p>
                </td>
                <td>{rider.workStatus}</td>
                <td>{rider.riderDistrict}</td>
                <td>
                  <button className="btn">
                    <FaEye></FaEye>
                  </button>
                  <button
                    onClick={() => handleApproval(rider)}
                    className="btn bg-green-300"
                  >
                    <FaUserCheck />
                  </button>
                  <button
                    onClick={() => handleRejection(rider)}
                    className="btn bg-red-300"
                  >
                    <RiUserUnfollowFill />
                  </button>
                  <button className="btn bg-red-400">
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApproveRiders;
