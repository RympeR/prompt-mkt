import { useState } from "react";
import { Button } from "../../components/form/button";
import { PromptType } from "../../enum/promptType";

import "./index.scss";
import { InitialDataStep } from "./steps/initialData";
import { PromptFileStep } from "./steps/promptFile";

export function SellPage() {
  const [step, setStep] = useState<number>(1);

  const [selectedType, setSelectedType] = useState<PromptType | null>(null);

  const allStepsCount = 3;

  const stepsProgress = (step / allStepsCount) * 100;

  function prevStep() {
    let newStep = step - 1;

    if (newStep < 1) {
      newStep = 1;
    }

    setStep(newStep);
  }

  function nextStep() {
    let newStep = step + 1;

    if (newStep > allStepsCount) {
      newStep = allStepsCount;
    }

    setStep(newStep);
  }

  return (
    <div className="page sell">
      <div className="progress-wrapper">
        <Button
          onClick={() => prevStep()}
          size={"mini"}
          icon="chevron-left"
          text={"Back"}
        />
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
      {step === 1 && (
        <InitialDataStep
          onSelectType={(type) => setSelectedType(type)}
          selectedType={selectedType}
          onNextStep={() => nextStep()}
        />
      )}
      {step === 2 && (
        <PromptFileStep
          onSelectType={(type) => setSelectedType(type)}
          selectedType={selectedType}
          onNextStep={() => nextStep()}
        />
      )}
    </div>
  );
}
