import { BootstrapIcon } from "../../components/bootstrapIcon";
import { ProductCard } from "../../components/productCard";
import "./index.scss";

export function HomePage() {
  return (
    <div className="slides">
      <div className="slide flex main">
        <div className="slide-bg"></div>
        <div className="slide-content">
          <h1>
            DALL·E, GPT, Midjourney, Stable Diffusion, ChatGPT Prompt
            Marketplace
          </h1>
          <h3>
            Find top prompts, produce better results, save on API costs, sell
            your own prompts.
          </h3>
          <div className="buttons-group">
            <button className="primary">
              <BootstrapIcon icon="search" />
              <span>Find a prompt</span>
            </button>
            <button className="secondary">
              <BootstrapIcon icon="shop" />
              <span>Sell a prompt</span>
            </button>
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
          <button>
            <span>Browse marketplace</span>
            <BootstrapIcon icon="arrow-up-right" />
          </button>
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
          <button>
            <span>Browse marketplace</span>
            <BootstrapIcon icon="arrow-up-right" />
          </button>
        </div>
      </div>
    </div>
  );
}
