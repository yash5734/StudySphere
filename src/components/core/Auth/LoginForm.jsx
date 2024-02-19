import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../../Services/operations/authApi";
import { useDispatch } from "react-redux";
import Tab from "../../Common/Tab";
import { ACCOUNT_TYPE } from "../../../utils/Constants"


const LoginForm = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [accountType, setAccountType] = useState(ACCOUNT_TYPE.STUDENT);

  function changeHandler(event) {
    return setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  }
  
  const { email, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  function submitHandler(event) {
    event.preventDefault();

    dispatch(login(email, password, navigate));
  }

  const tabData = [
    {
      id: 1,
      tabName: "Student",
      type: ACCOUNT_TYPE.STUDENT,
    },
    {
      id: 2,
      tabName: "Instructor",
      type: ACCOUNT_TYPE.INSTRUCTOR,
    },
  ];

  return (
    <div>
      <Tab tabData={tabData} field={accountType} setField={setAccountType} />

      <form
        onSubmit={submitHandler}
        className="flex flex-col w-full gap-y-4 mt-6"
      >
       
        <label className="w-full">
          <p className="text-richblack-200 text-[0.875rem] leading-[1.375rem] mb-1">
            Email Address <sup className="text-pink-200 ">*</sup>
          </p>
          <input
            type="email"
            required
            value={formData.email}
            name="email"
            placeholder="Enter Your Email Address"
            onChange={changeHandler}
            className="p-[12px] rounded-[0.5rem] bg-richblack-800 text-richblack-5 w-full"
          />
        </label>
        <label className="w-full relative">
          <p className="text-richblack-200 text-[0.875rem] leading-[1.375rem] mb-1">
            Password <sup className="text-pink-200">*</sup>
          </p>
          <input
            type={showPassword ? "text" : "password"}
            required
            value={formData.password}
            name="password"
            placeholder="Enter Your Password"
            onChange={changeHandler}
            className="p-[12px] rounded-[0.5rem] bg-richblack-800 text-richblack-5 w-full"
          />

          {/* setShowPassword((prev)=> !prev) */}
          <span
            className="absolute right-3 top-[38px] cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <AiOutlineEyeInvisible fontSize={24} fill="#AFB2Bf" />
            ) : (
              <AiOutlineEye fontSize={24} fill="#AFB2Bf" />
            )}
          </span>

          <Link to="/forgot-password">
            <p className="text-blue-100 max-w-max ml-auto text-xs mt-1 ">
              Forgot Password
            </p>
          </Link>
        </label>
        <button
          type="submit"
          className="px-[12px] py-[8px] bg-yellow-50 text-richblack-900 rounded-[8px] font-medium mt-6"
        >
          Sign in
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
