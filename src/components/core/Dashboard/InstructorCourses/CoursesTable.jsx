import React, { useState } from "react";
import {useSelector } from "react-redux";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import { FormatDate } from "../../../../utils/FormatDate";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { FaCheck } from "react-icons/fa";
import { FiEdit2 } from "react-icons/fi";
import { HiClock } from "react-icons/hi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import ConfirmationModal from "../../../Common/ConfirmationModal";
import { deleteCourse, fetchInstructorCourses } from "../../../../Services/operations/courseDetailsAPI";

const CoursesTable = ({ courses, setCourses }) => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState(null);
    const { token } = useSelector((state) => state.token);
    
    async function handleCourseDelete(courseId) {
        setLoading(true);
        await deleteCourse(courseId, token);
        const result = await fetchInstructorCourses(token);
        if (result) {
            setCourses(result)
          }
        setConfirmationModal(null);
        setLoading(false);
    }

  return (
    <>
      <Table className="border border-richblack-800">
        <Thead>
          <Tr className="text-richblack-100 flex px-6 py-2 border-b border-b-richblack-800 uppercase gap-x-10">
            <Th className="flex-1 items-center text-left font-medium text-sm uppercase">
              Courses
            </Th>
            <Th className="items-center text-left font-medium text-sm uppercase">
              Duration
            </Th>
            <Th className="items-center text-left font-medium text-sm uppercase">
              Price
            </Th>
            <Th className="items-center text-left font-medium text-sm uppercase">
              Actions
            </Th>
          </Tr>
        </Thead>

        <Tbody>
          {courses?.length === 0 ? (
            <Tr>
              <Td className="py-10 text-center text-2xl font-medium text-richblack-100">
                No courses found
                {/* TODO: Need to change this state */}
              </Td>
            </Tr>
          ) : (
            courses.map((course, index) => {
              return (
                <Tr
                  key={index}
                  className="text-richblack-100 flex px-6 py-2 border-b border-b-richblack-800 uppercase gap-x-10"
                >
                  <Td className="flex flex-1 gap-x-4">
                    <img
                      src={course.thumbnail}
                      alt={course.courseName}
                      className="h-[148px] w-[220px] object-cover rounded-lg"
                    />
                    <div className=" flex flex-col justify-between">
                      <p className="text-lg font-semibold text-richblack-5">
                        {course.courseName}
                      </p>
                      <p className="text-xs text-richblack-300">
                        {course.courseDescription.lenght > 30
                          ? course.courseDescription
                              .split(" ")
                              .slice(0, 30)
                              .join(" ") + "..."
                          : course.courseDescription}
                      </p>
                      <p className="text-[12px] text-white">
                        Created: {FormatDate(course.createdAt)}
                      </p>
                      {course.status === "PUBLISHED" ? (
                        <p className="flex w-fit flex-row items-center gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[12px] font-medium text-yellow-100">
                          <div className="flex h-3 w-3 items-center justify-center rounded-full bg-yellow-100 text-richblack-700">
                            <FaCheck size={8} />
                          </div>
                          Published
                        </p>
                      ) : (
                        <p className="flex w-fit flex-row items-center gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[12px] font-medium text-pink-100">
                          <HiClock size={14} />
                          Drafted
                        </p>
                      )}
                    </div>
                  </Td>

                  <Td className="text-richblack-100 text-sm font-medium">
                    <p>2hr 30min</p>
                  </Td>

                  <Td className="text-sm font-medium text-richblack-100">
                    <p>₹{course.price}</p>
                  </Td>

                  <Td className="text-sm font-medium text-richblack-100">
                    <button
                      disabled={loading}
                      title="Edit"
                      onClick={() =>
                        navigate(`/dashboard/edit-course/${course._id}`)
                      }
                      className="transition-all duration-200 hover:scale-110 hover:text-caribbeangreen-300 px-2 cursor-pointer"
                    >
                      <FiEdit2 size={20} />
                    </button>
                    <button
                      disabled={loading}
                      title="Delete"
                      onClick={() =>
                        setConfirmationModal({
                          text1: "Do you want to delete this course?",
                          text2:
                            "All the data related to this course will be deleted",
                          btn1Text: "Delete",
                          btn2Text: "Cancel",
                          btn1Handle: !loading
                            ? () => handleCourseDelete(course._id)
                            : () => {},

                          btn2Handler: !loading
                            ? () => setConfirmationModal(null)
                            : () => {},
                        })
                      }
                      className="px-1 transition-all duration-200 hover:scale-110 hover:text-[#ff0000]"
                    >
                      <RiDeleteBin6Line size={20} />
                    </button>
                  </Td>
                </Tr>
              );
            })
          )}
        </Tbody>
      </Table>

      {ConfirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  );
};

export default CoursesTable;
