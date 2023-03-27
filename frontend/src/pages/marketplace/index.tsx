import { Checkbox } from "../../components/checkbox";
import { ProductCard } from "../../components/productCard";
import "./index.scss";

export function MarketplacePage() {
  return (
    <div className="page marketplace">
      <aside className="sidebar">
        <div className="filter-group">
          <h5>Sort by</h5>
          <div className="options">
            {Array(3)
              .fill("")
              .map((_, index) => {
                return <Checkbox key={index} title={`Option ${index + 1}`} />;
              })}
          </div>
        </div>
        <div className="filter-group">
          <h5>Model</h5>
          <div className="options">
            {Array(6)
              .fill("")
              .map((_, index) => {
                return <Checkbox key={index} title={`Option ${index + 1}`} />;
              })}
          </div>
        </div>
        <div className="filter-group">
          <h5>Category</h5>
          <div className="options">
            {Array(10)
              .fill("")
              .map((_, index) => {
                return <Checkbox key={index} title={`Option ${index + 1}`} />;
              })}
          </div>
        </div>
      </aside>
      <section className="cards">
        {Array(24)
          .fill("")
          .map((_, index) => {
            return (
              <ProductCard
                key={index}
                category={"🤖 ChatGPT"}
                name={"Example"}
                price={"9.90"}
                image={""}
              />
            );
          })}
      </section>
    </div>
  );
}
