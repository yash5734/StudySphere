import React from "react";
import { useSelector } from "react-redux";
import RandorCartCourses from "./RandorCartCourses";
import RandorTotalAmount from "./RandorTotalAmount";

const Cart = () => {
  const { totalItems, total } = useSelector((state) => state.cart);
  return (
    <div className="text-richblack-25 items-center">
      <h1 className="mb-14 text-3xl font-medium text-richblack-5">Cart</h1>
      <p className="text-richblack-400 font-thin">
        {totalItems} Courses in art
      </p>

      <div className="border border-richblack-400 my-3 w-full "></div>

      {total > 0 ? (
        <div className="mt-8 flex flex-col-reverse items-start gap-x-10 gap-y-6 lg:flex-row">
          <RandorCartCourses />
          <RandorTotalAmount />
        </div>
      ) : (
        <div className="mt-14 text-center text-3xl text-richblack-100"> Your Cart is Empty</div>
      )}
    </div>
  );
};

export default Cart;
