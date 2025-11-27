import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const [paymentInfo, setPaymentInfo] = useState({});
  const sessionId = searchParams.get('session_id');
  const axiosSecure = useAxiosSecure();

  console.log(sessionId);

  useEffect(() => {
    if (sessionId) {
      axiosSecure
        .patch(`/payment-success?session_id=${sessionId}`)
        .then((res) => {
          console.log(res.data);
          setPaymentInfo({
            trackingId: res.data.trackingId,
            transactionId: res.data.transactionId,
          });
        });
    }
  }, [sessionId, axiosSecure]);
  return (
    <div>
      <h2 className="text-4xl">your payment successful</h2>
      <p>Your transaction Id : {paymentInfo.transactionId}</p>
      <p>Your parcel Tracking No: {paymentInfo.trackingId}</p>
    </div>
  );
};

export default PaymentSuccess;
