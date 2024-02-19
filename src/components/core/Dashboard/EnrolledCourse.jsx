import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { apiConnector } from "../../../Services/ApiConnector";
import { getUserEnrolledCourses } from "../../../Services/operations/profileApi";
import ProgressBar from "@ramonak/react-progress-bar"

const EnrolledCourse = () => {
  const { token } = useSelector((state) => state.auth);

  const [enrolledCouses, setEnrolledCourses] = useState(null);

  const getEnrolledCourses = async () => {
    try {
      const courses = await getUserEnrolledCourses(token);
      setEnrolledCourses(courses);
    } catch (error) {
      console.log("error occured in frontend EnrolledCourse Dashboad", error);
    }
  };

  useEffect(() => {
    getEnrolledCourses();
  }, []);

  return (
    <>
      <div className="text-richblack-50 text-3xl">Enrolled Courses</div>
      {!enrolledCouses ? (
        <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
          <div className="spinner"></div>
        </div>
      ) : enrolledCouses.length == 0 ? (
        <p className="grid h-[10vh] w-full place-content-center text-richblack-5">
          {" "}
          You have not enrolled in any course yet.
        </p>
      ) : (
        <div className="my-8 text-richblack-5">
          <div className="flex rounded-t-lg bg-richblack-500 ">
            <p className="w-[45%] px-5 py-3">Course Name</p>
            <p className="w-[25%] px-2 py-3">Duration</p>
            <p className="flex-1 px-2 py-3">Progress</p>
          </div>

          {enrolledCouses.map((course, i, arr) => {
            <div
              className={`flex items-center border border-richblack-700 ${
                i === arr.length - 1 ? "rounded-b-lg" : "rounded-none"
              }`}
              key={i}
            >
                {/* course detail  */}
              <div className="flex w-[45%] cursor-pointer items-center gap-4 px-5 py-3">
                <img
                  src={course.thumbnail}
                  className="h-14 w-14 rounded-lg object-cover"
                  alt=""
                />
                <div className="flex max-w-xs flex-col gap-2">
                  <p className="font-semibold">{course.title}</p>
                  <p className="text-xs text-richblack-300">
                    {course.description.length > 50
                      ? `${course.courseDescription.slice(0, 50)}...`
                      : course.description}
                  </p>
                </div>
              </div>
                    
                {/* duration  */}
              <div className="w-1/4 px-2 py-3">{course?.totalDuration}</div>

                {/* progress bar  */}
              <div className="flex w-1/5 flex-col gap-2 px-2 py-3">
                <p>Progress: {course.progressPercentage || 0}%</p>
                <ProgressBar
                  completed={course.progressPercentage || 0}
                  height="8px"
                  isLabelVisible={false}
                />
                </div>
                
            </div>;
          })}
        </div>
      )}
    </>
  );
};

export default EnrolledCourse;
