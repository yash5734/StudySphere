import React from "react";
import InstructorImage from "../../../assets/Images/Instructor.png";
import HighlightText from "./HighlightText";
import CTNButton from "./Button";
import { FaArrowRight } from "react-icons/fa";

const Instructor = () => {
  return (
    <div>
      <div className="flex flex-col lg:flex-row gap-20 items-center">
        <div className="lg:w-[50%]">
          <img
            src={InstructorImage}
            alt="Instructor Image"
            className="shadow-white shadow-[-20px_-20px_0_0]"
          />
        </div>
        <div className="lg:w-[50%] flex gap-10 flex-col">
          <div className="lg:w-[50%] text-4xl font-semibold  ">
            Become an
            <HighlightText text={"instructor"} />
          </div>
          <p className="text-richblack-300 text-[16px] justify-center w-[90%] font-medium">
            Instructors from around the world teach millions of students on
            StudyNotion. We provide the tools and skills to teach what you love.
          </p>
          <CTNButton linkto={"./signup"} active={true}>
            <div className="items-center  gap-4 flex">
              Start Teaching Today
              <FaArrowRight />
            </div>
          </CTNButton>
        </div>
      </div>
    </div>
  );
};

export default Instructor;
