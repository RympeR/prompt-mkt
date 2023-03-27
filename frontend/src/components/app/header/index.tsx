import "./index.scss";

import { HeaderItem } from "./components/headerItem";
import Logo from "../../../assets/svg/logo.svg";
import { SearchBar } from "./components/searchBar";

export function Header() {
  return (
    <header className="app-header">
      <img className="logo" alt="prompt-mkt" src={Logo} />
      <SearchBar />
      <HeaderItem title="Marketplace" link="#" />
      <HeaderItem title="Hire" link="#" />
      <HeaderItem title="Sell" link="#" />
    </header>
  );
}
