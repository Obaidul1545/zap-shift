import { useForm } from 'react-hook-form';
import agentPending from '../../assets/agentPending.png';

const Rider = () => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    console.log('Rider Data:', data);
    reset();
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

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Row 1 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Your Name"
                {...register('name')}
                className="input input-bordered w-full"
              />

              <input
                type="number"
                placeholder="Your Age"
                {...register('age')}
                className="input input-bordered w-full"
              />
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="email"
                placeholder="Your Email"
                {...register('email')}
                className="input input-bordered w-full"
              />

              <select
                {...register('district')}
                className="select select-bordered w-full"
              >
                <option disabled selected>
                  Select your District
                </option>
                <option>Dhaka</option>
                <option>Chittagong</option>
                <option>Rajshahi</option>
                <option>Khulna</option>
                <option>Barishal</option>
              </select>
            </div>

            {/* Row 3 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="NID No"
                {...register('nid')}
                className="input input-bordered w-full"
              />

              <input
                type="text"
                placeholder="Contact"
                {...register('contact')}
                className="input input-bordered w-full"
              />
            </div>

            {/* Warehouse */}
            <select
              {...register('warehouse')}
              className="select select-bordered w-full"
            >
              <option disabled selected>
                Select warehouse
              </option>
              <option>Mirpur Warehouse</option>
              <option>Uttara Warehouse</option>
              <option>Banani Warehouse</option>
            </select>

            <button className="btn bg-lime-400 hover:bg-lime-500 w-full text-black">
              Submit
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
