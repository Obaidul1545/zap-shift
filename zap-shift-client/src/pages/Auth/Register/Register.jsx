import { useForm } from 'react-hook-form';
import { FaUser } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { Link } from 'react-router';
import useAuth from '../../../Hooks/useAuth';

const Register = () => {
  const { registerUser, signInGoogle } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleRegister = (data) => {
    registerUser(data.email, data.password)
      .then((result) => {
        console.log(result.user);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSignInGoogle = () => {
    signInGoogle()
      .then((result) => {
        console.log(result.user);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="max-w-md mx-auto p-5">
      {/* Title */}
      <h2 className="text-4xl font-bold">Create an Account</h2>
      <p className="text-gray-600 mb-6">Register with ZapShift</p>

      {/* Profile icon */}
      <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center mb-6">
        <FaUser className="text-gray-400 text-2xl" />
      </div>

      <form onSubmit={handleSubmit(handleRegister)}>
        {/* Name */}
        <label className="block font-medium mb-1">Name</label>
        <input
          type="text"
          placeholder="Name"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none"
          {...register('name', {
            required: true,
            maxLength: 20,
          })}
        />
        {errors.name?.type === 'required' && (
          <p className="text-red-500 text-sm mt-1">Name is required</p>
        )}

        {/* Email */}
        <label className="block font-medium mt-4 mb-1">Email</label>
        <input
          type="email"
          placeholder="Email"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none"
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Enter a valid email address',
            },
          })}
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}

        {/* Password */}
        <label className="block font-medium mt-4 mb-1">Password</label>
        <input
          type="password"
          placeholder="Password"
          className="w-full border border-gray-300 rounded-lg px-4 py-2  focus:outline-none"
          {...register('password', {
            required: 'Password is required',
            minLength: {
              value: 6,
              message: 'Must be at least 6 characters',
            },
            validate: {
              hasUpper: (v) =>
                /[A-Z]/.test(v) || 'Must contain at least one uppercase letter',
              hasLower: (v) =>
                /[a-z]/.test(v) || 'Must contain at least one lowercase letter',
              hasNumber: (v) =>
                /[0-9]/.test(v) || 'Must contain at least one number',
              hasSpecial: (v) =>
                /[!@#$%^&*]/.test(v) ||
                'Must include a special character (!@#$%^&*)',
            },
          })}
        />

        {/* Error Messages */}
        <div className="text-red-500 text-sm mt-1 space-y-1">
          {errors.password && <p>• {errors.password.message}</p>}
          {errors.password?.types &&
            Object.values(errors.password.types).map((msg, i) => (
              <p key={i}>• {msg}</p>
            ))}
        </div>

        {/* Register Button */}
        <button
          type="submit"
          className="w-full bg-lime-300 py-2 mt-4 rounded-lg font-medium hover:bg-lime-400 transition cursor-pointer"
        >
          Register
        </button>
      </form>

      {/* Already have account */}
      <p className="text-center mt-4 text-gray-700">
        Already have an account?{' '}
        <Link to={'/login'} className="text-blue-500 font-medium">
          Login
        </Link>
      </p>

      {/* OR divider */}
      <div className="flex items-center my-4">
        <div className="flex-1 border-t"></div>
        <span className="px-3 text-gray-500">Or</span>
        <div className="flex-1 border-t"></div>
      </div>

      {/* Google Register Button */}
      <button
        onClick={handleSignInGoogle}
        className="w-full border border-gray-300 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 transition cursor-pointer"
      >
        <FcGoogle className="text-red-500 text-lg" />
        <span>Register with google</span>
      </button>
    </div>
  );
};

export default Register;
