import "./index.scss";
import Logo from "../../../assets/svg/logo.svg";
import { SearchBar } from "./components/searchBar";
import { HeaderItem } from "./components/headerItem";

export function Header() {
  return (
    <header className="app-header">
      <img className="logo" src={Logo} />
      <SearchBar />
      <HeaderItem title="Marketplace" link="#" />
      <HeaderItem title="Hire" link="#" />
      <HeaderItem title="Sell" link="#" />
    </header>
  );
}
