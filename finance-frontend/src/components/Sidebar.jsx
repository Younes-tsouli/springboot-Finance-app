import {  NavLink } from "react-router-dom";

const Sidebar = (props) => {
  
  return (
    <aside>
      <div>
        <nav>
          {/* Si l'URL est "/", la classe "active" est ajoutée automatiquement */}
          <NavLink 
            to="/" 
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Overview
          </NavLink>

          <NavLink 
            to="/savings" 
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Savings
          </NavLink>

          <NavLink 
            to="/history" 
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            History
          </NavLink>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
