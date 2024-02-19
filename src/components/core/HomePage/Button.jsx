import React from 'react'
import { Link } from 'react-router-dom'

const Button = ({linkto,active,children}) => {
  return (
      <Link to={linkto}>
          <div className={`w-fit  rounded-md text-center text-[13px] px-6 py-3 font-bold hover:scale-95 transition-all duration-200 shadow-sm shadow-pure-greys-500  ${(active)? " bg-yellow-25 text-black":" bg-richblack-800"}`}>
          {children}
          </div>
      </Link>
  )
}

export default Button
