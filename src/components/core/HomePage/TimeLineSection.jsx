import React from "react";
import TimeLineImage from "../../../assets/Images/TimelineImage.png";
import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg";
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg";
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg";
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg";
import elipse from "../../../assets/Images/Ellipse1.png";

const TimeLine = [
  {
    Logo: Logo1,
    Heading: "Leadership",
    Description: "Fully committed to the success company",
  },
  {
    Logo: Logo2,
    Heading: "Responsibility",
    Description: "Students will always be our top priority",
  },
  {
    Logo: Logo3,
    Heading: "Flexibility",
    Description: "The ability to switch is an important skills",
  },
  {
    Logo: Logo4,
    Heading: "Solve the problem",
    Description: "Code your way to a solution",
  },
];

const TimeLineSection = () => {
  return (
    <div>
      <div className="flex flex-col lg:flex-row gap-20 mb-20 items-center">
        <div className="lg:w-[45%] flex flex-col gap-14 lg:gap-3">
          {TimeLine.map((ele, i) => {
            return (
              <div className="flex flex-col lg:gap-3" key={i}>
                <div className="flex gap-6" key={i}>
                  <div className="w-[52px] h-[52px] bg-white rounded-full flex justify-center items-center shadow-[#00000012] shadow-[0_0_62px_0]">
                    <img src={ele.Logo} alt="" />
                  </div>
                  <div>
                    <h2 className="font-semibold text-[18px]">{ele.Heading}</h2>
                    <p className="text-base">{ele.Description}</p>
                  </div>
                </div>
                <div
                  className={`hidden ${
                    TimeLine.length - 1 === i ? "hidden" : "lg:block"
                  }  h-14 border-dotted border-r border-richblack-100 bg-richblack-400/0 w-[26px]`}
                ></div>
              </div>
            );
          })}
        </div>

        <div className="relative timeline">
          <img
            src={elipse}
            className="absolute right-[150px] top-[120px] -z-10 w-[100%]"
          />
          <img
            src={elipse}
            className="absolute left-[150px] top-[120px] -z-10 w-[100%]"
          />
          <img src={TimeLineImage} alt="timeline image" />

          <div className=" left-[50%] translate-x-[-50%] translate-y-[-50%] absolute bg-caribbeangreen-700 flex flex-row text-white py-7 uppercase">
            <div className="flex flex-row items-center gap-5 border-r border-caribbeangreen-300 px-10">
              <p className="text-3xl font-bold">10</p>
              <p className="text-sm text-caribbeangreen-300 w-[75px]">
                Years of Experience
              </p>
            </div>

            <div className="flex flex-row items-center gap-5  px-7">
              <p className="text-3xl font-bold">250</p>
              <p className="text-sm text-caribbeangreen-300 w-[75px]">
                Types of Courses
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeLineSection;
