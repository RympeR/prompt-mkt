import { BootstrapIcon } from "../../components/bootstrapIcon";
import { ProductCard } from "../../components/productCard";
import { ProfileCard } from "../../components/profileCard";
import "./index.scss";

export function HirePage() {
  return (
    <div className="page hire slides">
      <div className="slide flex">
        <div className="slide-content">
          <div className="columns">
            <div className="column">
              <h1>
                <span>Hire a Prompt Engineer</span><br />for your next project
              </h1>
              <h3>
                Commission custom prompts from top prompt engineers, save on
                time & API costs, become a prompt engineer.
              </h3>
              <div className="buttons-group">
                <button className="primary">
                  <BootstrapIcon icon="person-fill" />
                  <span>Hire an engineer</span>
                </button>
                <button className="secondary">
                  <BootstrapIcon icon="easel2-fill" />
                  <span>Become an engineer</span>
                </button>
              </div>
            </div>
            <div className="column flex">
                <div className="cards">
                    <ProfileCard name="Pavel Durov" views={200} itemsCount={300} />
                    <ProfileCard name="Pavel Durov" views={200} itemsCount={300} />
                    <ProfileCard name="Pavel Durov" views={200} itemsCount={300} />
                    <ProfileCard name="Pavel Durov" views={200} itemsCount={300} />
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
