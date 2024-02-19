import React from 'react'
import * as Icons from "react-icons/vsc";
import { useDispatch } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';


const SideBarLinks = ({link,iconName}) => {
    const Icon = Icons[iconName];
    const location = useLocation();

  return (
    <NavLink to={link.path} className={`${location.pathname === link.path? "bg-yellow-800 text-yellow-50" : "bg-opacity-0"} relative px-8 py-2 text-sm font-medium transition-all duration-200`}>
          {/*  right side yello color link  */}
          <span className={`absolute left-0 top-0 w-[0.15rem] h-full bg-yellow-50 ${location.pathname === link.path ? "opacity-100" : "opacity-0"}`}></span>

          <div className='flex gap-x-2 items-center'>
              <Icon className="text-lg"/>
              <span>{link.name}</span>
          </div>
    </NavLink>
  )
}

export default SideBarLinks
