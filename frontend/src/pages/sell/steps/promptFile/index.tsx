import { TextArea } from "../../../../components/form/textArea";
import { PromptType } from "../../../../enum/promptType";

export interface IPromptFileStep {
  selectedType: PromptType | null;
  onSelectType: (type: PromptType) => void;
  onNextStep: () => void;
}

export function PromptFileStep(props: IPromptFileStep) {
  return (
    <div className="fade-in signup-step">
      <div className="two-col">
        <div className="left-col">
          <h2>📄 Prompt file</h2>
          <TextArea />
        </div>
      </div>
    </div>
  );
}
