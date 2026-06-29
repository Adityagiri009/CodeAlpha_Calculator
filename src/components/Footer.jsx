import "./Footer.css";
import { IoCopyOutline } from "react-icons/io5";
import { FaHeart } from "react-icons/fa";

function Footer({ copyResult }) {
  return (
    <footer className="footer">

      <button
        className="copy-btn"
        onClick={copyResult}
      >
        <IoCopyOutline />
        <span>Copy Result</span>
      </button>

      <p className="developer">
        Made with <FaHeart className="heart" /> by
        <span> Aditya Giri</span>
      </p>

    </footer>
  );
}

export default Footer;