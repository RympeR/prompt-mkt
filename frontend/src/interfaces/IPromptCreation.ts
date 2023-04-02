import { GPTType } from "../enum/gptType";
import { PromptType } from "../enum/promptType";

export interface IPromptCreationInitialData {
  promptType: PromptType;
  name: string;
  description: string;
  estimatedPrice: string;
}

export interface IMainData {
  prompt: string;
  promptInstructions: string;
}

export interface IMainDataGPT extends IMainData {
  gptType: GPTType;
}

export interface IMainDataVisual extends IMainData {
  images: File[];
}

export interface IMainDataDALLE extends IMainDataVisual {
  verificationLink: string;
}

export interface IMainDataMidjourney extends IMainDataVisual {
  profileLink: string;
}

export interface IPromptCreation {
  initialData: IPromptCreationInitialData;
}
