import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { setCourse, setEditCourse } from "../../../../slice/courseSlice";
import {getFullDetailsOfCourse} from "../../../../Services/operations/courseDetailsAPI"
import RenderSteps from "../AddCourse/RenderSteps";

const index = () => {
  const { course } = useSelector((state) => state.course);
  const { courseId } = useParams();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    async function edit() {
      setLoading(true);
      const result = await getFullDetailsOfCourse(courseId, token);
      if (result?.courseDetails) {
        dispatch(setCourse(courseId));
        dispatch(setEditCourse(true));
      }
      setLoading(false);
    }
    edit();
  }, []);

  if (loading) {
    return (
      <div className="grid flex-1 place-items-center">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-medium items-center text-richblack-5 mb-14 ">
        Edit Course
      </h1>
      <div className="mx-auto max-w-[600px]">
        {course ? (
          <RenderSteps />
        ) : (
          <p className="mt-14 text-center text-3xl font-semibold text-richblack-100">
            Course not found
          </p>
        )}
      </div>
    </div>
  );
};

export default index;
