import React, { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useLoaderData, useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useAuth from '../../Hooks/useAuth';

const SendParcel = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const serviceCenter = useLoaderData();
  const regionsDuplicate = serviceCenter.map((r) => r.region);
  const regions = [...new Set(regionsDuplicate)];
  const senderRegion = useWatch({ control, name: 'senderRegion' });
  const receiverRegion = useWatch({ control, name: 'receiverRegion' });

  const distritsByRegion = (region) => {
    const regionsDistricts = serviceCenter.filter((c) => c.region === region);
    const districts = regionsDistricts.map((d) => d.district);
    return districts;
  };

  // parcel send
  const handleParcelSend = (data) => {
    const isDocument = data.parcelType === 'Document';
    const isSameDistrict = data.senderDistrict === data.receiverDistrict;
    const parcelWeight = parseFloat(data.parcelWeight);

    let cost = 0;
    if (isDocument) {
      cost = isSameDistrict ? 60 : 80;
    } else {
      if (parcelWeight < 3) {
        cost = isSameDistrict ? 110 : 150;
      } else {
        const minCharge = isSameDistrict ? 110 : 150;
        const extraWeight = parcelWeight - 3;
        const extraCharge = isSameDistrict
          ? extraWeight * 40
          : extraWeight * 40 + 40;
        cost = minCharge + extraCharge;
      }
    }

    data.cost = cost;

    Swal.fire({
      title: 'Agree with the Cost?',
      text: `You will be charged ${cost} taka`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'I Agree!',
    }).then((result) => {
      if (result.isConfirmed) {
        navigate('/dashboard/my-parcels');
        // save the parcel info to the database
        axiosSecure.post('/parcels', data).then((res) => {
          console.log(res.data);
          Swal.fire({
            title: 'Send!',
            text: 'Your file has been success.',
            icon: 'success',
          });
        });

        //
      }
    });
  };

  return (
    <div className="container mx-auto my-10 px-4">
      <h1 className="text-3xl font-semibold">Send A Parcel</h1>

      <p className="mt-4 text-gray-700 font-medium">
        Enter your parcel details
      </p>

      <form onSubmit={handleSubmit(handleParcelSend)}>
        {/* Document Type */}
        <div className="flex items-center gap-6 my-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              defaultChecked
              value="Document"
              {...register('parcelType')}
              className="radio radio-success"
            />
            <span>Document</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              value="Non-Document"
              {...register('parcelType')}
              className="radio radio-success"
            />
            <span>Not-Document</span>
          </label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="font-medium">Parcel Name</label>
            <input
              type="text"
              placeholder="Parcel Name"
              {...register('parcelName', { required: 'Required' })}
              className="input input-bordered w-full"
            />
            {errors.parcelName && (
              <p className="text-red-500 text-sm">
                {errors.parcelName.message}
              </p>
            )}
          </div>

          <div>
            <label className="font-medium">Parcel Weight (KG)</label>
            <input
              type="number"
              placeholder="Parcel Weight (KG)"
              {...register('parcelWeight')}
              className="input input-bordered w-full"
            />
          </div>
        </div>

        {/* Sender & Receiver Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-10">
          {/* Sender */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Sender Details</h2>

            <label className="font-medium">Sender Name</label>
            <input
              type="text"
              placeholder="Sender Name"
              {...register('senderName')}
              defaultValue={user?.displayName}
              className="input input-bordered w-full mb-4"
            />

            <label className="font-medium">Sender Email</label>
            <input
              type="email"
              placeholder="Sender Email"
              defaultValue={user?.email}
              {...register('senderEmail')}
              className="input input-bordered w-full mb-4"
            />

            <label className="font-medium">Sender Address</label>
            <input
              type="text"
              placeholder="Address"
              {...register('senderAddress')}
              className="input input-bordered w-full mb-4"
            />

            <label className="font-medium">Sender Phone No</label>
            <input
              type="text"
              placeholder="Sender Phone No"
              {...register('senderPhone')}
              className="input input-bordered w-full mb-4"
            />

            <label className="font-medium">Sender Region</label>
            <select
              {...register('senderRegion')}
              className="select select-bordered w-full mb-4"
            >
              <option disabled>Select your Region</option>
              {regions.map((r, i) => (
                <option key={i} value={r}>
                  {r}
                </option>
              ))}
            </select>

            <label className="font-medium">Sender District</label>
            <select
              {...register('senderDistrict')}
              className="select select-bordered w-full mb-4"
            >
              <option disabled>Select your District</option>
              {distritsByRegion(senderRegion).map((r, i) => (
                <option key={i} value={r}>
                  {r}
                </option>
              ))}
            </select>

            <label className="font-medium">Pickup Instruction</label>
            <textarea
              placeholder="Pickup Instruction"
              {...register('pickupInstruction')}
              className="textarea textarea-bordered w-full"
            />
          </div>

          {/* Receiver */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Receiver Details</h2>

            <label className="font-medium">Receiver Name</label>
            <input
              type="text"
              placeholder="Receiver Name"
              {...register('receiverName')}
              className="input input-bordered w-full mb-4"
            />

            <label className="font-medium">Receiver Email</label>
            <input
              type="email"
              placeholder="Receiver Email"
              {...register('receiverEmail')}
              className="input input-bordered w-full mb-4"
            />

            <label className="font-medium">Receiver Address</label>
            <input
              type="text"
              placeholder="Receiver Address"
              {...register('receiverAddress')}
              className="input input-bordered w-full mb-4"
            />

            <label className="font-medium">Receiver Contact No</label>
            <input
              type="text"
              placeholder="Receiver Contact No"
              {...register('receiverPhone')}
              className="input input-bordered w-full mb-4"
            />

            <label className="font-medium">Receiver Region</label>
            <select
              {...register('receiverRegion')}
              className="select select-bordered w-full mb-4"
            >
              <option>Select your Region</option>
              {regions.map((r, i) => (
                <option key={i} value={r}>
                  {r}
                </option>
              ))}
            </select>

            <label className="font-medium">Receiver District</label>
            <select
              {...register('receiverDistrict')}
              className="select select-bordered w-full mb-4"
            >
              <option>Select your District</option>
              {distritsByRegion(receiverRegion).map((r, i) => (
                <option key={i} value={r}>
                  {r}
                </option>
              ))}
            </select>

            <label className="font-medium">Delivery Instruction</label>
            <textarea
              placeholder="Delivery Instruction"
              {...register('deliveryInstruction')}
              className="textarea textarea-bordered w-full"
            />
          </div>
        </div>

        <p className="text-gray-600 text-sm mt-3">
          * Pickup Time 4pm–7pm Approx.
        </p>

        {/* Submit Button */}
        <button
          type="submit"
          className="btn bg-[#CDE756] text-black mt-6 px-10"
        >
          Proceed to Confirm Booking
        </button>
      </form>
    </div>
  );
};

export default SendParcel;
