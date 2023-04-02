import "./index.scss";

import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="app-footer">
      <p>© prompt-mkt {new Date().getFullYear()}</p>

      <div className="links">
        <Link to={"/faq"}>FAQ</Link>
        <Link to={"/contact"}>Contact</Link>
        <Link to={"/privacy"}>Privacy policy</Link>
      </div>
    </footer>
  );
}
