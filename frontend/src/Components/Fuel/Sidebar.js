import { Link } from 'react-router-dom';
import "./Sidebar.css";
import "./global.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <img className="logo-icon" alt="" src="/logo.png" />

      <div className="btnfuelstock">
        <Link to="/fuel/fuelstock">
            <button className="btnsidebar">FUEL STOCK</button>
        </Link>
      </div> 

      <div className="btnfuelentry">
        <Link to="/fuel/fuelentry">
            <button className="btnsidebar">FUEL ENTRY</button>
        </Link>
      </div>

      <div className="btnfuelconsumtion">
        <Link to="/fuel">
            <button className="btnsidebar">FUEL CONSUMTION</button>
        </Link>
      </div>

      <div className="btnlogout">
        <Link to="#">
            <button className="btnsidebar">LOGOUT</button>
        </Link>
      </div>
      
    </div>
  );
};

export default Sidebar;
