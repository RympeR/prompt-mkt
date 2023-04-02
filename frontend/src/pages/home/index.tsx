import { BootstrapIcon } from "../../components/bootstrapIcon";
import { Button } from "../../components/form/button";
import { ProductCard } from "../../components/productCard";
import "./index.scss";

export function HomePage() {
  return (
    <div className="page home slides">
      <div className="slide flex main">
        <div className="slide-bg"></div>
        <div className="slide-content">
          <h1>
            <span>
              DALL·E, GPT, Midjourney, Stable Diffusion, ChatGPT Prompt
              Marketplace
            </span>
          </h1>
          <h3>
            <span>prompt-mkt</span> provides an effective platform for
            searching, creating or selling custom prompts and allows you to save
            API costs
          </h3>
          <div className="buttons-group">
            <Button primary={true} text="Find a prompt" icon="search" />
            <Button text="Find a prompt" icon="shop" />
          </div>
        </div>
      </div>
      <div className="slide flex">
        <div className="slide-content">
          <h2>✨Featured Prompts</h2>
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
      <div className="slide flex">
        <div className="slide-content">
          <h2>🔥Hottest Prompts</h2>
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
    </div>
  );
}
