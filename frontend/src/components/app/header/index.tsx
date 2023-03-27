import "./index.scss";

import { HeaderItem } from "./components/headerItem";
import Logo from "../../../assets/svg/logo.svg";
import { SearchBar } from "./components/searchBar";
import { NavLink } from "react-router-dom";

export function Header() {
  return (
    <header className="app-header">
      <NavLink to={"/"}>
        <img className="logo" alt="prompt-mkt" src={Logo} />
      </NavLink>
      <SearchBar />
      <HeaderItem title="Marketplace" link="marketplace" />
      <HeaderItem title="Hire" link="hire" />
      <HeaderItem title="Sell" link="sell" />
    </header>
  );
}
