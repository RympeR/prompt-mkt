import "./index.scss";

import {
  FocusEventHandler,
  KeyboardEvent,
  MouseEvent,
  ReactNode,
  RefObject,
  createRef,
} from "react";

import { Link, To } from "react-router-dom";
import { BootstrapIcon } from "../../bootstrapIcon";

export interface IGenericButton {
  "aria-label"?: string;
  "aria-expanded"?: boolean;
  children?: ReactNode;
  className?: string;
  disabled?: boolean;
  icon?: string;
  iconPosition?: "left" | "right";
  isFileUpload?: boolean;
  isLink?: boolean;
  isLoading?: boolean;
  onBlur?: FocusEventHandler<HTMLElement>;
  onClick?: (e: MouseEvent<any>, ref: RefObject<HTMLElement>) => void;
  onFocus?: FocusEventHandler<HTMLElement>;
  onKeyDown?: (e: KeyboardEvent<any>, ref: RefObject<HTMLElement>) => void;
  onKeyUp?: (e: KeyboardEvent<any>, ref: RefObject<HTMLElement>) => void;
  onMouseDown?: (e: MouseEvent<any>, ref: RefObject<HTMLElement>) => void;
  onMouseLeave?: (e: MouseEvent<any>, ref: RefObject<HTMLElement>) => void;
  onMouseMove?: (e: MouseEvent<any>, ref: RefObject<HTMLElement>) => void;
  onMouseUp?: (e: MouseEvent<any>, ref: RefObject<HTMLElement>) => void;
  primary?: boolean;
  danger?: boolean;
  rounded?: boolean;
  roveIndex?: number;
  size?: "default" | "mini";
  tabIndex?: number;
  text?: string;
  title?: string;
  useRoveContext?: boolean;
}

export interface ILinkButton {
  linkTo?: string | To;
  linkExternal?: boolean;
  linkState?: any;
  linkReplace?: boolean;
  linkReloadDocument?: boolean;
}

export interface IFileUploadButton {
  fileAccept?: string;
  fileMultiple?: boolean;
  isFileUpload?: boolean;
  onFileChange?: (files: File[]) => void;
  inputRef?: RefObject<HTMLInputElement>;
}

export interface IStandartButton {
  buttonRef?: RefObject<HTMLButtonElement>;
  type?: "button" | "submit" | "reset";
}

export function Button({
  type = "button",
  iconPosition = "left",
  ...props
}: IGenericButton & IStandartButton & ILinkButton & IFileUploadButton) {
  const newRef = createRef<HTMLButtonElement>();

  let ref = props.buttonRef ?? newRef;

  function handleOnClick(
    e: MouseEvent<HTMLButtonElement | HTMLAnchorElement | HTMLInputElement>
  ) {
    if (props.isFileUpload) {
      let input = document.createElement("input");

      input.style.display = "none";
      input.ariaHidden = "true";
      input.type = "file";

      if (props.fileAccept !== undefined) input.accept = props.fileAccept;

      if (props.fileMultiple !== undefined) input.multiple = props.fileMultiple;

      input.onchange = (e) => {
        let files = Array.from((e.target as any).files ?? []) as File[];
        if (props.onFileChange) props.onFileChange(files);
      };

      document.body.appendChild(input);
      input.click();
      setTimeout(() => {
        input.remove();
      }, 100);
    }
    if (props.onClick) props.onClick(e, ref);
  }

  function handleKeyDown(
    e: KeyboardEvent<HTMLButtonElement | HTMLAnchorElement | HTMLInputElement>
  ) {
    if (props.onKeyDown) props.onKeyDown(e, ref);
  }

  function handleKeyUp(
    e: KeyboardEvent<HTMLButtonElement | HTMLAnchorElement | HTMLInputElement>
  ) {
    if (props.onKeyUp) props.onKeyUp(e, ref);
  }

  function handleOnMouseDown(
    e: MouseEvent<HTMLButtonElement | HTMLAnchorElement | HTMLInputElement>
  ) {
    if (props.onMouseDown) props.onMouseDown(e, ref);
  }

  function handleOnMouseUp(
    e: MouseEvent<HTMLButtonElement | HTMLAnchorElement | HTMLInputElement>
  ) {
    if (props.onMouseUp) props.onMouseUp(e, ref);
  }

  function handleOnMouseMove(
    e: MouseEvent<HTMLButtonElement | HTMLAnchorElement | HTMLInputElement>
  ) {
    if (props.onMouseMove) props.onMouseMove(e, ref);
  }

  function handleOnMouseLeave(
    e: MouseEvent<HTMLButtonElement | HTMLAnchorElement | HTMLInputElement>
  ) {
    if (props.onMouseLeave) props.onMouseLeave(e, ref);
  }

  let buttonContent =
    props.children ??
    ((props.isLoading && <>Loading...</>) || (
      <>
        {props.icon && iconPosition === "left" && (
          <BootstrapIcon ariaHidden={true} icon={props.icon} />
        )}

        {props.text && <span>{props.text}</span>}

        {props.icon && iconPosition === "right" && (
          <BootstrapIcon
            ariaHidden={props.text !== undefined}
            icon={props.icon}
          />
        )}
      </>
    ));

  let buttonEvents = {
    onKeyDown: (e: KeyboardEvent<HTMLButtonElement | HTMLAnchorElement>) => {
      handleKeyDown(e);
    },
    onKeyUp: (e: KeyboardEvent<HTMLButtonElement | HTMLAnchorElement>) => {
      handleKeyUp(e);
    },
    onClick: (e: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
      handleOnClick(e);
    },
    onMouseDown: (e: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
      handleOnMouseDown(e);
    },
    onMouseUp: (e: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
      handleOnMouseUp(e);
    },
    onMouseMove: (e: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
      handleOnMouseMove(e);
    },
    onMouseLeave: (e: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
      handleOnMouseLeave(e);
    },
    onFocus: props.onFocus,
    onBlur: props.onBlur,
  };

  let buttonClassName =
    "form-button form-icon-button" +
    (props.primary ? " primary" : " secondary") +
    (props.danger ? " danger" : "") +
    (props.isLoading ? " is-loading" : "") +
    (props.rounded ? " rounded" : "") +
    (props.className ? " " + props.className : "") +
    (props.size ? " " + props.size : "");

  let buttonGeneric = {
    title: props.title,
    "aria-label": props["aria-label"],
    "aria-expanded": props["aria-expanded"],
    "aria-disabled": props.disabled,
    tabIndex: props.tabIndex,
    className: buttonClassName,
  };

  return (
    <>
      {(props.isLink &&
        props.linkTo &&
        ((!props.linkExternal && (
          <Link
            to={props.linkTo}
            reloadDocument={props.linkReloadDocument}
            replace={props.linkReplace}
            state={props.linkState}
            {...buttonEvents}
            {...buttonGeneric}
          >
            {buttonContent}
          </Link>
        )) || (
          <a
            href={props.linkTo.toString()}
            {...buttonEvents}
            {...buttonGeneric}
          >
            {buttonContent}
          </a>
        ))) || (
        <button ref={ref} type={type} {...buttonEvents} {...buttonGeneric}>
          {buttonContent}
        </button>
      )}
    </>
  );
}
