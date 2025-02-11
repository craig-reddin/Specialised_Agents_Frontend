import { useState } from "react";
import { Link } from "react-router-dom";
//https://react-icons.github.io/react-icons/
//Icons used for side bar
import { GiArtificialHive } from "react-icons/gi";
import { MdDashboardCustomize } from "react-icons/md";
import { PiSignOutBold } from "react-icons/pi";
import { RiTeamFill } from "react-icons/ri";
import { TfiMenuAlt } from "react-icons/tfi";
import { RiRobot2Fill } from "react-icons/ri";
import { FaRobot } from "react-icons/fa";
import { useAuth } from "../services/AuthContext";

function Sidebar() {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);
  const { logout } = useAuth();
  return (
    <>
      <div className={sidebar ? "sidebars-active" : "sidebars"}>
        <Link to="" className={sidebar ? "menu-bars-active" : "menu-bars"}>
          <TfiMenuAlt onClick={showSidebar} />
        </Link>
      </div>

      <nav className={sidebar ? "side-menu-active" : "side-menu"}>
        <ul className="side-menu-items">
          <li className="sidebar-text">
            <MdDashboardCustomize className="menu-icon" />
            <Link to="/dashboard" className="Menu-bars">
              Dashboard
            </Link>
          </li>
          <li className="sidebar-text">
            <RiRobot2Fill className="menu-icon" />
            <Link to="/create_agent" className="Menu-bars">
              Create Agent
            </Link>
          </li>
          <li className="sidebar-text">
            <GiArtificialHive className="menu-icon" />
            <Link to="/create_team" className="Menu-bars">
              Create Team
            </Link>
          </li>
          <li className="sidebar-text">
            <RiTeamFill className="menu-icon" />
            <Link to="/select_team" className="Menu-bars">
              Select existing Team
            </Link>
          </li>
          <li className="sidebar-text">
            <PiSignOutBold className="menu-icon" />
            <Link to="/" className="Menu-bars" onClick={logout}>
              Sign Out
            </Link>
          </li>
          <li className="sidebar-text">
            <FaRobot className="menu-icon" />
            <Link to="/chat_interface" className="Menu-bars" onClick={logout}>
              Single Agent Chat
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}
export default Sidebar;
