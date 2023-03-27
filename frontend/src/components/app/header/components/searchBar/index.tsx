import './index.scss';
import { BootstrapIcon } from "../../../../bootstrapIcon";

export function SearchBar() {
  return (
    <div className="search-bar">
      <input placeholder='Search' type="text" />
      <button>
        <BootstrapIcon icon="search" />
      </button>
    </div>
  );
}
