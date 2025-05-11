import { useState } from "react";
import { Link } from "react-router-dom";
//https://react-icons.github.io/react-icons/
//Icons used for side bar
import { GiArtificialHive } from "react-icons/gi";
import { MdDashboardCustomize } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { PiSignOutBold } from "react-icons/pi";
import { RiTeamFill } from "react-icons/ri";
import { TfiMenuAlt } from "react-icons/tfi";
import { RiRobot2Fill } from "react-icons/ri";
import { FaRobot } from "react-icons/fa";
import { useAuth } from "../services/AuthContext";
import { useAuth0 } from "@auth0/auth0-react";
import { logoutUser } from "../services/Logout";

function Sidebar() {
  //hook used to log user out and redirect to home page - used for sign out link
  const { logout: auth0Logout } = useAuth0();
  //hook to determine if sidebar should be displayed or noe
  const [sidebar, setSidebar] = useState(false);

  // used to change true or false.
  const showSidebar = () => setSidebar(!sidebar);
  const { logout } = useAuth();
  //method handle the user logout
  const handleLogout = () => {
    //method is Logout.tsx to clear all user data from session storage.
    logoutUser();
    // call auth0 logout
    logout();

    // After logout, isAuthenticated will be automatically set to false.
    // This will log out and redirect to the homepage
    auth0Logout({ returnTo: window.location.origin } as any);
  };

  return (
    <>
      {/* The value for sidebar determine the class name  */}
      <div
        id="sidebar-menu-link"
        className={sidebar ? "sidebars-active" : "sidebars"}
      >
        {/* used to change the background colour of the link / button.*/}
        <Link
          to=""
          id="link-sidebar"
          className={sidebar ? "menu-bars-active" : "menu-bars"}
        >
          <TfiMenuAlt onClick={showSidebar} />
        </Link>
      </div>

      <nav className={sidebar ? "side-menu-active" : "side-menu"}>
        <ul className="side-menu-items">
          <li className="sidebar-text">
            {/* All below link images were got from  
            https://react-icons.github.io/react-icons/*/}
            <MdDashboardCustomize className="menu-icon" />
            <Link to="/dashboard" className="Menu-bars">
              Dashboard
            </Link>
          </li>
          <li className="sidebar-text">
            <FaRobot className="menu-icon" />
            <Link
              to="/chat_interface"
              id="chat-interface-link"
              className="Menu-bars"
            >
              Single Agent Chat
            </Link>
          </li>
          <li className="sidebar-text">
            <RiRobot2Fill className="menu-icon" />
            <Link
              to="/create_agent"
              id="create-agent-link"
              className="Menu-bars"
            >
              Create Agent
            </Link>
          </li>
          <li className="sidebar-text">
            <GiArtificialHive className="menu-icon" />
            <Link to="/create_team" id="create-team-link" className="Menu-bars">
              Create Team
            </Link>
          </li>
          <li className="sidebar-text">
            <RiTeamFill className="menu-icon" />
            <Link to="/select_team" id="select-team-link" className="Menu-bars">
              Select existing Team
            </Link>
          </li>
          <li className="sidebar-text">
            <PiSignOutBold className="menu-icon" />
            <Link to="" className="Menu-bars" onClick={handleLogout}>
              Sign Out
            </Link>
          </li>
          <li className="sidebar-text">
            <MdDelete className="menu-icon" />
            <Link
              to="/delete_user"
              id="delete-account-link"
              className="Menu-bars"
            >
              Delete Account
            </Link>
          </li>

          <li className="sidebar-text">
            <FaRobot className="menu-icon" />
            <Link
              to="/chat_interface_web_socket"
              id="chat-interface-ws-link"
              className="Menu-bars"
            >
              Single Agent Chat WS
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}
export default Sidebar;
