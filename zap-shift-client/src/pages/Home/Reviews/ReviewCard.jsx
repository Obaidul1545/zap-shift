import React from 'react';
import { FaQuoteLeft } from 'react-icons/fa';

const ReviewCard = ({ reviews }) => {
  const {
    user_email,
    userName,
    delivery_email,
    ratings,
    review,
    parcel_id,
    pick_up_email,
    user_photoURL,
    date,
  } = reviews || {};

  return (
    <div className="max-w-sm bg-gray-200 rounded-xl shadow-md p-6 border border-gray-100">
      {/* Quote Icon */}
      <FaQuoteLeft className="text-teal-200 text-4xl mb-3" />

      {/* Text */}
      <p className="">{review}</p>

      {/* Divider (dashed) */}
      <div className="border-t border-dashed border-teal-200 my-4"></div>

      {/* Person Details */}
      <div className="flex items-center gap-3">
        {/* Avatar Dot */}
        <div className="w-10 h-10">
          <img src={user_photoURL} alt="" className="rounded-full" />
        </div>

        {/* Name & Role */}
        <div>
          <h4 className="text-teal-700 font-semibold">{userName}</h4>
          <p className="text-gray-500 text-sm">Senior Product Designer</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
