import { Link, Outlet } from "react-router-dom";

const BasicLayout = () => {
  return (
    <div className="bg-gray-100 h-screen">
      <div className="fixed flex justify-between bg-white h-12 p-2 shadow-md text-center w-full">
        <Link to="/" className="text-3xl text-sky-500/60">
          M-Social
        </Link>
        <div className="flex gap-4 justify-center">
          <Link
            to="/login"
            className="px-6 hover:underline hover:text-blue-500 transition"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="px-6 hover:underline hover:text-blue-500 transition"
          >
            Sign Up
          </Link>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default BasicLayout;
