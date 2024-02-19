import { useEffect, useState } from "react";
import { VscAdd } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { fetchInstructorCourses } from "../../../Services/operations/courseDetailsAPI";
import IconBtn from "../../Common/IconBtn";
import CoursesTable from "./InstructorCourses/CoursesTable";
import { setCourses } from "../../../slice/courseSlice";

const MyCourse = () => {
  const { token } = useSelector((state) => state.auth);
  const [courses, setCourses] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCourses = async () => {
      const result = await fetchInstructorCourses(token);
      if (result) {
        setCourses(result);
      }
    };
    fetchCourses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div className="mb-14 flex items-center justify-between">
        <h1 className="text-3xl font-medium text-richblack-5">My Course</h1>
        <IconBtn
          text="Add Course"
          onclick={() => navigate("/dashboard/add-course")}
        >
          <VscAdd />
        </IconBtn>
        <CoursesTable courses={courses} />
      </div>
      {courses && <CoursesTable crouses={ courses} setCourses={setCourses} />}
    </div>
  );
};

export default MyCourse;
