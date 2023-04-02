import React, {
  KeyboardEvent,
  ReactNode,
  createContext,
  createRef,
  useContext,
  useEffect,
  useId,
  useState,
} from "react";

import { BootstrapIcon } from "../../bootstrapIcon";
import { AnimationTools } from "../../../tools/animation";
import { useIntersection } from "../../../tools/intersection";

export interface IAccordionItem {
  title: ReactNode;
  expanded: boolean;
  body: ReactNode;
  icon?: string;
  index?: number;
  textWhenErrorsArePresent?: string;
}

export interface AccordionItemFieldError {
  id: string;
  error: string;
}

export const AccordionItemContext = createContext<{
  fieldErrors: AccordionItemFieldError[];
  setFieldErrors: (fieldErrors: AccordionItemFieldError[]) => void;
  isExpanded: boolean;
} | null>(null);

export const useAccordionItemContext = () => useContext(AccordionItemContext);

export function reportFieldError(
  error: AccordionItemFieldError,
  fieldErrors: AccordionItemFieldError[],
  setFieldErrors: (fieldErrors: AccordionItemFieldError[]) => void
) {
  let newFieldErrors = fieldErrors;

  if (
    newFieldErrors.findIndex((fieldError) => fieldError.id === error.id) === -1
  ) {
    newFieldErrors.push(error);
  }

  setFieldErrors(newFieldErrors);
}

export function removeFieldError(
  error: AccordionItemFieldError,
  fieldErrors: AccordionItemFieldError[],
  setFieldErrors: (fieldErrors: AccordionItemFieldError[]) => void
) {
  let newFieldErrors = fieldErrors;

  let index = newFieldErrors.findIndex(
    (fieldError) => fieldError.id === error.id
  );

  if (index !== -1) {
    newFieldErrors.splice(index, 1);
  }

  setFieldErrors(newFieldErrors);
}

export function AccordionItem(props: IAccordionItem) {
  const ref = createRef<HTMLDivElement>();
  const bodyRef = createRef<HTMLDivElement>();
  const id = useId();

  const [isExpanded, setIsExpanded] = useState<boolean>(props.expanded);

  const [isIconVisible, setIsIconVisible] = useState<boolean>(
    props.icon ? true : false
  );
  const [isIconDetached, setIsIconDetached] = useState<boolean>(!isIconVisible);
  const [isIconHidden, setIsIconHidden] = useState<boolean>(!isIconVisible);

  const [lastIconAnimationTimeout, setLastIconAnimationTimeout] =
    useState<NodeJS.Timeout | null>(null);

  const [isBodyDetached, setIsBodyDetached] = useState<boolean>(true);
  const [isBodyHidden, setIsBodyHidden] = useState<boolean>(true);

  const [refreshTrigger, setRefreshTrigger] = useState<boolean>(false);

  const [lastAnimationTimeout, setLastAnimationTimeout] =
    useState<NodeJS.Timeout | null>(null);

  const [fieldErrors, setFieldErrors] = useState<AccordionItemFieldError[]>([]);

  useEffect(() => {
    let refreshTriggerTimeout = setTimeout(() => {
      setRefreshTrigger(!refreshTrigger);
    }, 500);

    return () => clearTimeout(refreshTriggerTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref]);

  useEffect(() => {
    setIsIconVisible(props.icon !== undefined || fieldErrors.length > 0);
  }, [props.icon, fieldErrors, refreshTrigger]);

  useEffect(() => {
    if (lastAnimationTimeout) {
      clearTimeout(lastAnimationTimeout);
    }

    let timeout = AnimationTools.autoShowHideTransition(
      isExpanded,
      setIsBodyDetached,
      setIsBodyHidden
    );

    setLastAnimationTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isExpanded]);

  useEffect(() => {
    if (lastIconAnimationTimeout) {
      clearTimeout(lastIconAnimationTimeout);
    }

    let timeout = AnimationTools.autoShowHideTransition(
      isIconVisible,
      setIsIconDetached,
      setIsIconHidden
    );

    setLastIconAnimationTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isIconVisible]);

  let isInViewPort = useIntersection(bodyRef, "0px");

  function handleOnClick() {
    setIsExpanded(!isExpanded);

    let self = ref.current as HTMLDivElement;

    setTimeout(() => {
      if (!isExpanded) {
        if (self && !isInViewPort) {
          self.querySelector(".accordion-item-body")?.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }
      }
    }, 300);
  }

  function handleOnKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    if ([" ", "Enter"].includes(e.key)) {
      e.preventDefault();
      setIsExpanded(!isExpanded);
    }
  }

  let parentItemContext = useAccordionItemContext();

  useEffect(() => {
    if (!parentItemContext) return;

    let error: AccordionItemFieldError = {
      id: id,
      error: "Errors inside",
    };

    if (fieldErrors.length > 0) {
      reportFieldError(
        error,
        parentItemContext.fieldErrors,
        parentItemContext.setFieldErrors
      );
    } else {
      removeFieldError(
        error,
        parentItemContext.fieldErrors,
        parentItemContext.setFieldErrors
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fieldErrors, refreshTrigger]);

  return (
    <AccordionItemContext.Provider
      value={{
        fieldErrors,
        setFieldErrors: (newValue: any) => {
          setFieldErrors(newValue);
          setRefreshTrigger(!refreshTrigger);

          setTimeout(() => {
            setRefreshTrigger(!refreshTrigger);
          }, 10);
        },
        isExpanded: !isBodyDetached,
      }}
    >
      <div ref={ref} className={"accordion-item"}>
        <div
          role={"button"}
          tabIndex={0}
          onKeyDown={(e: KeyboardEvent<HTMLDivElement>) => handleOnKeyDown(e)}
          onClick={handleOnClick}
          className={
            "accordion-item-header" +
            (fieldErrors.length > 0 ? " errors-inside" : "")
          }
          aria-expanded={isExpanded}
        >
          {!isIconDetached && (
            <div
              className={"main-icon-wrapper" + (isIconHidden ? " hidden" : "")}
            >
              <BootstrapIcon
                icon={
                  fieldErrors.length === 0
                    ? props.icon ?? ""
                    : "exclamation-circle-fill"
                }
                className={
                  "main-icon" + (fieldErrors.length > 0 ? " error" : "")
                }
              />
            </div>
          )}
          <h2 className="title">{props.title}</h2>

          <BootstrapIcon
            className="toggle-icon"
            icon={isExpanded ? "chevron-up" : "chevron-down"}
          />
        </div>

        <div ref={bodyRef} className="accordion-item-body-wrapper">
          <div
            className={"accordion-item-body" + (isBodyHidden ? " hidden" : "")}
            aria-hidden={isBodyHidden}
          >
            {props.body}
          </div>
        </div>
      </div>
    </AccordionItemContext.Provider>
  );
}
