import React from "react";
import { Link } from "react-router-dom";

const DateOfBirth = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <form action="" className="flex flex-col max-w-lg gap-5">
        <label htmlFor="" className="text-2xl md:text-4xl  font-semibold  text-center">What is your Date of Birth ?</label>
        <input
          type="date"
          placeholder="Enter Date of Birth"
          className="border border-gray-900 px-4 py-4 rounded-lg w-full"
        />
        <Link to={"/chat"} className="px-4 py-4 border bg-green-300 hover:bg-green-500 duration-300 transition rounded-lg text-center  text-xl font-bold">Create Account</Link>
      </form>
    </div>
  );
};

export default DateOfBirth;
