import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { sendOtp, signUp } from "../../../Services/operations/authApi";
import { setSignupData } from "../../../slice/authSlice";
import Tab from "../../Common/Tab";
import { ACCOUNT_TYPE } from "../../../utils/Constants"
import toast from "react-hot-toast";

const SignupForm = () => {

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const dispatch = useDispatch();
  const [accountType, setAccountType] = useState(ACCOUNT_TYPE.STUDENT)

  const { firstName, lastName, email, password, confirmPassword } = formData


  function changeHandler(event) {
    return setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  }

  function submitHandler(event) {
    event.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords Do Not Match");
      return;
    }

    const signupData = {
      ...formData,
      accountType,
    };

    // Setting signup data to state
    // To be used after otp verification
    dispatch(setSignupData(signupData));
    // Send OTP to user for verification
    dispatch(sendOtp(formData.email, navigate));

    // Reset
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });

    setAccountType(ACCOUNT_TYPE.STUDENT)  
  }

  // data to pass to Tab component
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
  ]

  return (
    <div>
      {/* student and instructor button  */}
      <Tab tabData={tabData} field={accountType} setField={setAccountType} />

      <form
        action=""
        onSubmit={submitHandler}
        className="flex flex-col w-full gap-y-5 mt-6"
      >
        <div className="flex gap-x-3">
        <label>
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              First Name <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type="text"
              name="firstName"
              value={firstName}
              onChange={changeHandler}
              placeholder="Enter first name"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
            />
          </label>
          <label>
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              Last Name <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type="text"
              name="lastName"
              value={lastName}
              onChange={changeHandler}
              placeholder="Enter last name"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
            />
          </label>
        </div>

        <label>
          <p className="text-richblack-200 text-[0.875rem] leading-[1.375rem] mb-1">
            Enter Your Email Address <sup className="text-pink-200 ">*</sup>
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

        <div className="flex gap-x-3">
          <label className="relative">
            <p className="text-richblack-200 text-[0.875rem] leading-[1.375rem] mb-1">
              Enter Password <sup className="text-pink-200 ">*</sup>
            </p>
            <input
              type={showPassword ? "text" : "password"}
              required
              value={formData.password}
              name="password"
              placeholder="Enter Password"
              onChange={changeHandler}
              className="p-[12px] rounded-[0.5rem] bg-richblack-800 text-richblack-5 w-full"
            />
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
          </label>

          <label className="relative">
            <p className="text-richblack-200 text-[0.875rem] leading-[1.375rem] mb-1">
              Enter Password <sup className="text-pink-200 ">*</sup>
            </p>
            <input
              type={showConfirmPassword ? "text" : "password"}
              required
              value={formData.confirmPassword}
              name="confirmPassword"
              placeholder="Enter Password"
              onChange={changeHandler}
              className="p-[12px] rounded-[0.5rem] bg-richblack-800 text-richblack-5 w-full"
            />
            <span
              className="absolute right-3 top-[38px] cursor-pointer"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2Bf" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2Bf" />
              )}
            </span>
          </label>
        </div>

        <button type="submit" className="px-[12px] py-[8px] bg-yellow-50 text-richblack-900 rounded-[8px] font-medium mt-6">
          Create Account
        </button>
      </form>
    </div>
  );
};

export default SignupForm;
