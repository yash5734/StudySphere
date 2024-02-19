import React from "react";
import LoginForm from "../Auth/LoginForm";
import SignupForm from "../Auth/SignupForm";
import frameImage from "../../../assets/Images/frame.png";

const Template = ({ title, desc1, desc2, formType, image }) => {
  return (
    <div className="flex w-11/12 max-w-[1160px] py-12 mx-auto gap-x-12  justify-between">
      <div className="w-11/12 max-w-[450px]">
        <h1 className="text-richblack-5 text-[1.875rem] leading-[2.375rem] font-semibold">{title}</h1>
        <p className="mt-4 text-[1.125rem] leading-[1.625rem]">
          <span className="text-richblack-100">{desc1}</span>
          <br />
          <span className="text-richblue-100 italic">{desc2}</span>
        </p>
        {formType == "login" ? <LoginForm /> : <SignupForm />}
      </div>
      
      <div className="relative w-11/12 max-w-[450px]">
        <img
          src={frameImage}
          alt="frame image"
          height={558}
          width={504}
          loading="lazy"
        />
        <img
          src={image}
          alt="image"
          height={558}
          width={490}
          loading="lazy"
          className="absolute right-4 -top-4"
        />
      </div>
    </div>
  );
};

export default Template;
