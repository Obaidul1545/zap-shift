import { createBrowserRouter } from 'react-router';
import RootLayout from '../layouts/RootLayout';
import Home from '../pages/Home/Home/Home';
import Coverage from '../pages/Coverage/Coverage';
import AuthLayout from '../layouts/AuthLayout';
import Login from '../pages/Auth/Login/Login';
import Register from '../pages/Auth/Register/Register';
import PrivateRoute from './PrivateRoute';
import Rider from '../pages/Rider/Rider';
import SendParcel from '../pages/SendParcel/SendParcel';
import DashboardLayout from '../layouts/DashboardLayout';
import MyParcels from '../pages/Dashboard/MyParcels/MyParcels';
import Payment from '../pages/Dashboard/Payment/Payment';
import PaymentSuccess from '../pages/Dashboard/Payment/PaymentSuccess';
import PaymentCancelled from '../pages/Dashboard/Payment/PaymentCancelled';
import PaymentHistory from '../pages/Dashboard/PaymentHistory/PaymentHistory';
import ApproveRiders from '../pages/Dashboard/ApproveRiders/ApproveRiders';
import UsersManagement from '../pages/Dashboard/UsersManagement/UsersManagement';
import AdminRoute from './AdminRoute';
import AssignRiders from '../pages/Dashboard/AssignRiders/AssignRiders';
import AssignedDeliveries from '../pages/Dashboard/AssignedDeliveries/AssignedDeliveries';
import RiderRoute from './RiderRoute';
import CompletedDeliveries from '../pages/Dashboard/CompletedDeliveries/CompletedDeliveries';
import ParcelTrack from '../pages/ParcelTrack/ParcelTrack';
import DashboardHome from '../pages/Dashboard/DashboardHome/DashboardHome';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout></RootLayout>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: 'coverage',
        element: <Coverage></Coverage>,
        loader: () => fetch('/serviceCenter.json'),
      },
      {
        path: 'parcel-track/:trackingId',
        element: <ParcelTrack></ParcelTrack>,
      },
      {
        path: 'rider',
        element: (
          <PrivateRoute>
            <Rider></Rider>
          </PrivateRoute>
        ),
        loader: () => fetch('/serviceCenter.json'),
      },
      {
        path: 'sendParcel',
        element: (
          <PrivateRoute>
            <SendParcel></SendParcel>
          </PrivateRoute>
        ),
        loader: () => fetch('/serviceCenter.json'),
      },
    ],
  },
  {
    path: '/',
    element: <AuthLayout></AuthLayout>,
    children: [
      {
        path: 'login',
        element: <Login></Login>,
      },
      {
        path: 'register',
        element: <Register></Register>,
      },
    ],
  },
  {
    path: 'dashboard',
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <DashboardHome></DashboardHome>,
      },
      {
        path: 'my-parcels',
        element: <MyParcels></MyParcels>,
      },
      {
        path: 'payment/:parcelId',
        element: <Payment></Payment>,
      },
      {
        path: 'payment-history',
        element: <PaymentHistory></PaymentHistory>,
      },
      {
        path: 'payment-success',
        element: <PaymentSuccess></PaymentSuccess>,
      },
      {
        path: 'payment-cancelled',
        element: <PaymentCancelled></PaymentCancelled>,
      },
      // rider only routes
      {
        path: 'assigned-deliveries',
        element: (
          <RiderRoute>
            <AssignedDeliveries></AssignedDeliveries>
          </RiderRoute>
        ),
      },
      {
        path: 'completed-deliveries',
        element: (
          <RiderRoute>
            <CompletedDeliveries></CompletedDeliveries>
          </RiderRoute>
        ),
      },

      // admin only routes
      {
        path: 'approve-riders',
        element: (
          <AdminRoute>
            <ApproveRiders></ApproveRiders>
          </AdminRoute>
        ),
      },
      {
        path: 'assign-riders',
        element: (
          <AdminRoute>
            <AssignRiders></AssignRiders>
          </AdminRoute>
        ),
      },
      {
        path: 'users-management',
        element: (
          <AdminRoute>
            <UsersManagement></UsersManagement>
          </AdminRoute>
        ),
      },
    ],
  },
]);
