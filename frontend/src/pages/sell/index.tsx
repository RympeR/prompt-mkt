import { useState } from "react";
import { BootstrapIcon } from "../../components/bootstrapIcon";
import { Button } from "../../components/form/button";
import { Select } from "../../components/form/select";
import { TextArea } from "../../components/form/textArea";
import { TextInput } from "../../components/form/textInput";
import { PromptType } from "../../enum/promptType";

import "./index.scss";

export function SellPage() {
  const [step, setStep] = useState<number>(1);

  const [selectedType, setSelectedType] = useState<PromptType | null>(null);

  const allStepsCount = 3;

  const stepsProgress = (step / allStepsCount) * 100;

  const fieldsMap = {
    [PromptType.Gpt]: {
      namePlaceholder: "The Next Big Thing",
      descriptionPlaceholder:
        "A product or technology that will revolutionize the world",
    },
    [PromptType.Dalle]: {
      namePlaceholder: "The Ultimate Dream House",
      descriptionPlaceholder:
        "A luxurious and personalized home with all the amenities",
    },
    [PromptType.Midjourney]: {
      namePlaceholder: "The Journey of a Lifetime",
      descriptionPlaceholder:
        "An adventure to the most exotic and remote places on Earth",
    },
    [PromptType.StableDiffusion]: {
      namePlaceholder: "A Sustainable Future",
      descriptionPlaceholder:
        "A vision of a world with clean energy, green technologies, and thriving ecosystems",
    },
    [PromptType.PromptMKT]: {
      namePlaceholder: "The Perfect Gift",
      descriptionPlaceholder:
        "A personalized and meaningful gift that will be treasured forever",
    },
  };

  let currentFieldsMapItem = selectedType ? fieldsMap[selectedType] : null;

  return (
    <div className="page sell">
      <div className="progress-wrapper">
        <Button size={"mini"} icon="chevron-left" text={"Back"} />
        <div className="progress-bar-wrapper">
          <div
            className="progress-bar"
            style={{ width: stepsProgress + "%" }}
          ></div>
        </div>
        <div className="steps-wrapper">
          <div>
            Step {step}/{allStepsCount}
          </div>
        </div>
        <div className="delete-prompt-wrapper"></div>
      </div>
      <div className="signup-step">
        <div className="two-col">
          <div className="left-col">
            <h2>🤖 Prompt Details</h2>
            <div className="prompt-info">
              <p>Tell us about the prompt you want to sell.</p>
              <p>
                These details are not final. Our team will make edits if it goes
                live.
              </p>
            </div>

            <div className="fields">
              <div className="field">
                <div className="field-title">Prompt Type</div>
                <div className="field-help">
                  <i>Select the type of prompt you want to sell</i>
                </div>
                <Select
                  onChange={(e) =>
                    setSelectedType(e.target.value as PromptType)
                  }
                >
                  <option selected={selectedType === null} disabled>
                    Select Prompt Type
                  </option>
                  {Object.values(PromptType).map((value, index) => (
                    <option
                      selected={selectedType === value}
                      key={index}
                      value={value}
                    >
                      {value}
                    </option>
                  ))}
                </Select>
              </div>

              <div className="field">
                <div className="field-title">Name</div>
                <div className="field-help">
                  <i>Suggest a title for this prompt.</i>
                </div>
                <TextInput
                  type="text"
                  maxLength={40}
                  className="field-value"
                  placeholder={
                    currentFieldsMapItem?.namePlaceholder ?? "Enter it here"
                  }
                />
              </div>

              <div className="field">
                <div className="field-title">Description</div>
                <div className="field-help">
                  <i>
                    Describe what your prompt does to a potential buyer. A more
                    detailed description will increase your sales.
                  </i>
                </div>
                <TextArea
                  maxLength={500}
                  className="prompt-description draggable"
                  placeholder={
                    currentFieldsMapItem?.descriptionPlaceholder ??
                    "Enter it here"
                  }
                ></TextArea>
              </div>

              <div className="field">
                <div className="field-title">Estimated Price</div>
                <div className="field-help">
                  <i>What do you think the price of this prompt should be?</i>
                </div>
                <Select>
                  {Array(28)
                    .fill(0)
                    .map((_, index) => (
                      <option value={(index + 1) * 1.99}>
                        ${(index + 2.99).toFixed(2)}
                      </option>
                    ))}
                </Select>
              </div>
            </div>
            <br />
            <br />
            <Button
              text="Next"
              icon="chevron-right"
              iconPosition="right"
            />
          </div>
          <div className="right-col center-text"></div>
        </div>
      </div>
    </div>
  );
}
