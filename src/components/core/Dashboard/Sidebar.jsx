import React, { useState } from "react";
import { sidebarLinks } from "../../../data/dashboard-links";
import * as Icon from "react-icons/vsc";
import { logout } from "../../../Services/operations/authApi";
import { useDispatch, useSelector } from "react-redux";
import SideBarLinks from "./SideBarLinks";
import { VscSignOut } from "react-icons/vsc"
import { useNavigate } from "react-router-dom";
import ConfirmationModal from "../../Common/ConfirmationModal";
const Sidebar = () => {
  const { loading: authLoading } = useSelector((state) => state.auth);
  const [confirmationModal, setConfirmationModal] = useState(null);
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { user, loading: profileLoading } = useSelector(
    (state) => state.profile
  );

  if (authLoading || profileLoading) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    );
  }
  return (
    <div>
      <div className="min-w-[222px] border-r-[1px] border-r-richblack-700 h-full py-10 bg-richblack-800 text-richblack-300">
        <div className=" flex flex-col ">
          {sidebarLinks.map((link) => {
            if (link.type && link.type !== user?.accountType) {
              return null;
            }
            return (
              <SideBarLinks link={link} iconName={link.icon} key={link.id} />
            );
          })}
        </div>

        <div className="mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-700" />

        <div className="flex flex-col">
          <SideBarLinks
            link={{ name: "Settings", path: "/dashboard/settings" }}
            iconName="VscSettingsGear"
          />

          <button
            onClick={() =>
              setConfirmationModal({
                text1: "Are you sure?",
                text2: "You will be logged out of your account.",
                btn1Text: "Logout",
                btn2Text: "Cancel",
                btn1Handler: () => dispatch(logout(navigate)),
                btn2Handler: () => setConfirmationModal(null),
              })
            }
            className="px-8 py-2 text-sm font-medium text-richblack-300"
          >
            <div className="flex items-center gap-x-2">
              <VscSignOut className="text-lg" />
              <span>Logout</span>
            </div>
          </button>

        </div>
      </div>
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
      
    </div>
  );
};

export default Sidebar;
