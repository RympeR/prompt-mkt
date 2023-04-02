import { BootstrapIcon } from "../../components/bootstrapIcon";
import { Button } from "../../components/form/button";
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
                <span>Hire a Prompt Engineer</span>
                <br />
                for your next project
              </h1>
              <h3>
                Commission custom prompts from top prompt engineers, save on
                time & API costs, become a prompt engineer.
              </h3>
              <div className="buttons-group">
                <Button
                  primary={true}
                  icon="person-fill"
                  text="Hire an engineer"
                />
                <Button
                  primary={false}
                  icon="easel2-fill"
                  text="Become an engineer"
                />
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
