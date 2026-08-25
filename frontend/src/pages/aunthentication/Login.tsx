import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <form
        action=""
        className="flex flex-col  justify-center items-center w-full max-w-lg p-8 border shadow-lg rounded-lg"
      >
        <div className=" flex flex-col gap-5 w-full">
          <h2 className="text-2xl md:text-4xl font-bold  text-center">
            Welcome Again!
          </h2>
          <input
            type="email"
            placeholder="Enter email"
            className="border border-gray-900 px-4 py-4 rounded-lg w-full"
          />
          <input
            type="password"
            placeholder="Enter Password"
            className="border border-gray-900 px-4 py-4 rounded-lg w-full"
          />
          <Link
            to={"/chat"}
            className="px-4 py-4 border text-center rounded-lg text-2xl  font-bold bg-green-300  hover:bg-green-400 duration-300 transition"
          >
            Login
          </Link>

          <p className="text-center">
            I dont have account? <Link to={"/signup"} className="text-blue-500 font-bold">Signup</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
