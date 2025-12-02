import { useForm, useWatch } from 'react-hook-form';
import agentPending from '../../assets/agentPending.png';
import useAuth from '../../Hooks/useAuth';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useLoaderData } from 'react-router';
import Swal from 'sweetalert2';

const Rider = () => {
  const { register, handleSubmit, control, reset } = useForm();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const serviceCenter = useLoaderData();
  console.log(serviceCenter);
  const regionsDuplicate = serviceCenter.map((r) => r.region);
  const regions = [...new Set(regionsDuplicate)];
  const riderRegion = useWatch({ control, name: 'riderRegion' });
  const distritsByRegion = (region) => {
    const regionsDistricts = serviceCenter.filter((c) => c.region === region);
    const districts = regionsDistricts.map((d) => d.district);
    return districts;
  };

  const handleRiderApplication = (data) => {
    console.log('Rider Data:', data);
    axiosSecure.post('/riders', data).then((res) => {
      if (res.data.insertedId) {
        // toast
        console.log('Rider info save database');
        Swal.fire({
          title: 'Send!',
          text: 'Your file has been submit.',
          icon: 'success',
        });
      }
    });
  };

  return (
    <div className="w-full container mx-auto py-12 px-6 my-10">
      {/* Heading */}
      <h2 className="text-4xl font-bold text-gray-900">Be a Rider</h2>
      <p className="text-gray-500 max-w-xl mt-2">
        Enjoy fast, reliable parcel delivery with real-time tracking and zero
        hassle. From personal packages to business shipments — we deliver on
        time, every time.
      </p>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left form section */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Tell us about yourself</h3>

          <form
            onSubmit={handleSubmit(handleRiderApplication)}
            className="space-y-4"
          >
            {/* Row 1 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="font-medium">Your Name:</label>
              <input
                type="text"
                placeholder="Your Name"
                {...register('name')}
                defaultValue={user.displayName}
                className="input input-bordered w-full"
              />

              <label className="font-medium">Your Age:</label>
              <input
                type="number"
                placeholder="Your Age"
                {...register('age')}
                className="input input-bordered w-full"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="font-medium">Your Email:</label>
              <input
                type="email"
                placeholder="Your Email"
                {...register('email')}
                defaultValue={user.email}
                className="input input-bordered w-full"
              />

              <label className="font-medium">
                Your Driving license Number:
              </label>
              <input
                type="number"
                placeholder="Your Driving license Number"
                {...register('licenseNumber')}
                className="input input-bordered w-full"
              />
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="font-medium">Your Region:</label>
              <select
                {...register('riderRegion')}
                className="select select-bordered w-full mb-4"
              >
                <option>Select your Region</option>
                {regions.map((r, i) => (
                  <option key={i} value={r}>
                    {r}
                  </option>
                ))}
              </select>

              <label className="font-medium">Your District:</label>
              <select
                {...register('riderDistrict')}
                className="select select-bordered w-full mb-4"
              >
                <option>Select your District</option>
                {distritsByRegion(riderRegion).map((r, i) => (
                  <option key={i} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>

            {/* Row 3 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="font-medium">Your NID No:</label>
              <input
                type="text"
                placeholder="NID No"
                {...register('nid')}
                className="input input-bordered w-full"
              />

              <label className="font-medium">Your Phone Number:</label>
              <input
                type="number"
                placeholder="Contact"
                {...register('contact')}
                className="input input-bordered w-full"
              />
            </div>

            {/* bike info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="font-medium">Bike Brand model and year:</label>
              <input
                type="text"
                placeholder="Bike Brand model and year"
                {...register('BikeName')}
                className="input input-bordered w-full"
              />

              <label className="font-medium">Bike Registration Number:</label>
              <input
                type="number"
                placeholder="Bike Registration Number"
                {...register('BikeRegNumber')}
                className="input input-bordered w-full"
              />
            </div>

            <button className="btn bg-lime-400 hover:bg-lime-500 w-full text-black">
              Apply a Rider
            </button>
          </form>
        </div>

        {/* Right rider image */}
        <div className="flex justify-center items-center">
          <img src={agentPending} alt="rider" className="w-80 md:w-[380px]" />
        </div>
      </div>
    </div>
  );
};

export default Rider;
