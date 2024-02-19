import React, { useEffect, useState } from "react";
import logo from "../../assets/Logo/Logo-Full-Light.png";
import { Link } from "react-router-dom";
import { NavbarLinks } from "../../data/navbar-links";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { AiOutlineShoppingCart } from "react-icons/ai";
import ProfileDropDown from "../core/Auth/ProfileDropDown";
import { apiConnector } from "../../Services/ApiConnector";
import { categories } from "../../Services/Apis";
import axios from "axios";
import {IoIosArrowDown} from "react-icons/io"
import { ACCOUNT_TYPE } from "../../utils/Constants";

const Navbar = () => {
  const location = useLocation();

  // fetch state from slices

  const { totalItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  console.log("token-->",token)
  console.log("user-->",user)
  const [subLinks, setSubLinks] = useState({});

  const fetchSubLinks = async () => {
    try {
      const result = await apiConnector("GET", categories.CATEGORIES_API);
      // const result = await axios.get("http://localhost:4000/api/v1/course/showAllCategories").then().catch((e)=>console.log(e));
      console.log("printing sublink", result.data.data);
      setSubLinks(result.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => { fetchSubLinks() }, []);
  console.log(user)

  return (
    <div className="h-14 flex flex-row items-center justify-center border-b-[1px] border-b-richblack-700">
      <div className="flex w-11/12 justify-between items-center max-w-maxContent">
        <Link to={"/"}>
          <img src={logo} alt="logo" height={42} width={146} />
        </Link>

        <nav>
          <ul className="text-richblack-25 flex gap-x-6 ">
            {NavbarLinks.map((element, index) => {
              return (
                <li key={index}>
                  {element.title === "Catalog" ? (
                    <div className="flex items-center gap-2 relative z-50 group">
                      <p className="font-inter text-sm">{element.title}</p>
                      <IoIosArrowDown />
                      
                      <div className="invisible absolute bg-richblack-5 lg:w-[250px] rounded-md text-richblack-900 transition-all duration-200
                        left-[50%] top-[-50%] translate-x-[-50%] translate-y-[50%] p-4 flex flex-col group-hover:visible gap-4 border-b border-b-yellow-25">
                        
                        {/* triangle arrow  */}
                        <div className="bg-richblack-5 rotate-45 absolute left-[50%] top-0 translate-x-[100%] translate-y-[-45%] h-6 w-6 rounded">
                        </div>

                        {
                          subLinks.length?(subLinks.map((elem,index) => (
                            <Link to={`/catlog/${elem.name}`} key={index} className=" border-b border-b-richblack-400">
                              {elem.name}
                            </Link>
                          ))) : (
                              <div></div>
                          )
                          
                        }

                      </div>
                    </div>
                  ) : (
                    <Link to={element?.path}>
                      <p
                        className={`${
                          location.pathname === element.path
                            ? "text-yellow-25"
                            : "text-richblack-100"
                        } font-inter text-sm `}
                      >
                        {element.title}
                      </p>
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* login & signup &cart & dashboard */}

        <div className="flex gap-x-4 items-center">
          {/* cart */}

          {user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
            <Link to={"/dashboard/cart"} className="relative">
              <AiOutlineShoppingCart className="text-2xl text-richblack-100" />
              {totalItems > 0 &&
                <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
                {totalItems}
              </span>}
            </Link>
          )}

          {/* buttons */}
          {token === null && (
            <Link to={"/signup"}>
              <button className="border border-richblack-700 bg-richblack-800 text-richblack-300 rounded-md py-[8px] px-[12px]">
                Signup
              </button>
            </Link>
          )}

          {token === null && (
            <Link to={"/login"}>
              <button className="border border-richblack-700 bg-richblack-800 text-richblack-300 rounded-md py-[8px] px-[12px]">
                Login
              </button>
            </Link>
          )}
          {token != null && <ProfileDropDown />}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
