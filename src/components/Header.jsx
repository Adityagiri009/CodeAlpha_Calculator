import "./Header.css";
import { TbCalculator } from "react-icons/tb";
import { BsMoonStarsFill } from "react-icons/bs";
import { MdLightMode } from "react-icons/md";

function Header({ darkMode, setDarkMode }) {
  return (
    <header className="header">

      <div className="logo-section">

        <div className="logo">
          <TbCalculator />
        </div>

        <div className="title">
          <h1>React Calculator</h1>
          <p>Fast • Simple • Responsive</p>
        </div>

      </div>

      <button
        className="theme-btn"
        onClick={() => setDarkMode(!darkMode)}
        aria-label="Toggle Theme"
      >
        {darkMode ? <MdLightMode /> : <BsMoonStarsFill />}
      </button>

    </header>
  );
}

export default Header;