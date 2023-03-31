import "./index.scss";

import React, {
  ChangeEvent,
  FormEvent,
  LegacyRef,
  useEffect,
  useId,
  useState,
} from "react";
import { BootstrapIcon } from "../../bootstrapIcon";

export interface ITextArea {
  autoComplete?: string;
  className?: string;
  cols?: number;
  icon?: string;
  isValid?: boolean;
  label?: string;
  maxLength?: number;
  minLength?: number;
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onInput?: (e: FormEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  readOnly?: boolean;
  required?: boolean;
  resize?: "none" | "both" | "horizontal" | "vertical";
  rows?: number;
  tabIndex?: number;
  textareaRef?: LegacyRef<HTMLTextAreaElement>;
  validationError?: string;
  value?: string;
}

export function TextArea({ isValid = true, ...props }: ITextArea) {
  const id = useId();

  const [value, setValue] = useState<string>(props.value ?? "");

  useEffect(() => {
    setValue(props.value ?? "");
  }, [props.value]);

  const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
    if (props.onChange) props.onChange(e);
  };

  return (
    <div
      className={
        "form-textarea-wrapper" +
        (!isValid ? " invalid" : "") +
        (props.required ? " required" : "") +
        (props.className ? " " + props.className : "")
      }
    >
      {props.label && (
        <label htmlFor={id} className="form-textarea-label">
          {props.label}
        </label>
      )}

      <div className="form-textarea">
        {props.icon !== undefined && (
          <BootstrapIcon className="icon" icon={props.icon} />
        )}
        <textarea
          id={id}
          className={
            "form-textarea-element" +
            (props.resize ? " resize-" + props.resize : "")
          }
          placeholder={props.placeholder}
          value={props.value}
          minLength={props.minLength}
          aria-invalid={isValid ? undefined : true}
          aria-describedby={isValid ? undefined : id + "--error"}
          maxLength={props.maxLength}
          cols={props.cols}
          rows={props.rows}
          autoComplete={props.autoComplete}
          tabIndex={props.tabIndex}
          aria-required={props.required}
          onChange={handleOnChange}
          onInput={(e) => props.onInput && props.onInput(e)}
          ref={props.textareaRef}
          readOnly={props.readOnly}
        />
        {props.maxLength !== undefined && (
          <div className="counter">
            {value.length}/{props.maxLength}
          </div>
        )}
      </div>

      {!isValid && props.validationError !== undefined && (
        <p id={id + "--error"} className="textarea-error">
          {props.validationError}
        </p>
      )}
    </div>
  );
}
