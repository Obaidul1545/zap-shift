import { useForm } from 'react-hook-form';
import { FcGoogle } from 'react-icons/fc';
import { Link, useLocation, useNavigate } from 'react-router';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const Login = () => {
  const { signInUser, signInGoogle } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const location = useLocation();
  console.log(location);
  const navigate = useNavigate();

  const handleSignInUser = (data) => {
    signInUser(data.email, data.password)
      .then((result) => {
        console.log(result.user);
        navigate(location.state || '/');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSignInGoogle = () => {
    signInGoogle()
      .then((result) => {
        // create user database
        const userInfo = {
          email: result.user.email,
          displayName: result.user.displayName,
          photoURL: result.user.photoURL,
        };
        axiosSecure.post('/users', userInfo).then((res) => {
          if (res.data.insertedId) {
            console.log('create google user in the database ');
          }
          navigate(location.state || '/');
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="max-w-md mx-auto p-5">
      <h2 className="text-4xl font-bold">Welcome Back</h2>
      <p className="text-gray-600 mb-6">Login with ZapShift</p>

      <form onSubmit={handleSubmit(handleSignInUser)}>
        {/* Email */}
        <label className="block font-medium mb-1">Email</label>
        <input
          type="email"
          placeholder="Email"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:outline-none"
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
        <label className="block font-medium mb-1">Password</label>
        <input
          type="password"
          placeholder="Password"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-2 focus:outline-none"
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

        <div className="text-right">
          <a href="#" className="text-sm text-gray-600 hover:underline">
            Forget Password?
          </a>
        </div>

        {/* Login Button */}
        <button
          type="submit"
          className="w-full bg-lime-300 py-2 rounded-lg font-medium mt-4 hover:bg-lime-400 transition cursor-pointer"
        >
          Login
        </button>
      </form>

      {/* Register */}
      <p className="text-center mt-4 text-gray-700">
        Don’t have any account?{' '}
        <Link
          state={location.state}
          to={'/register'}
          className="text-blue-500 font-medium"
        >
          Register
        </Link>
      </p>

      <div className="flex items-center my-4">
        <div className="flex-1 border-t"></div>
        <span className="px-3 text-gray-500">Or</span>
        <div className="flex-1 border-t"></div>
      </div>

      {/* Google Login Button */}
      <button
        onClick={handleSignInGoogle}
        className="w-full border border-gray-300 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 transition cursor-pointer"
      >
        <FcGoogle className="text-red-500 text-lg" />
        <span>Login with google</span>
      </button>
    </div>
  );
};

export default Login;
