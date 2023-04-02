import { BootstrapIcon } from "../../components/bootstrapIcon";
import { Button } from "../../components/form/button";
import { ProductCard } from "../../components/productCard";
import "./index.scss";

export default function Profile() {
  return (
    <div className="page profile">
      <div className="profile-images">
        <div className="banner"></div>
        <div className="avatar"></div>
      </div>
      <div className="profile-info">
        <h4>@cobain</h4>
        <div className="stats">
          <div className="stat">
            <BootstrapIcon icon="eye-fill" />
            <span>5k</span>
          </div>
          <div className="stat">
            <BootstrapIcon icon="heart-fill" />
            <span>900</span>
          </div>
          <div className="stat">
            <BootstrapIcon icon="tag-fill" />
            <span>120</span>
          </div>
        </div>
      </div>

      <div className="profile-products">
        <h2>📈 Most Popular Prompts</h2>
        <br />
        <div className="cards-wrapper">
          {Array(8)
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
        </div>
        <Button
          iconPosition="right"
          text="Browse marketplace"
          icon="arrow-up-right"
        />
      </div>

      <div className="profile-products">
        <h2>🆕 Newest Prompts</h2>
        <br />
        <div className="cards-wrapper">
          {Array(8)
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
        </div>
        <Button
          iconPosition="right"
          text="Browse marketplace"
          icon="arrow-up-right"
        />
      </div>
    </div>
  );
}
