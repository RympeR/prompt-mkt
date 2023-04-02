import "./index.scss";

import React, { ReactElement, createContext, useContext } from "react";

export interface AccordionContextData {}

export const AccordionContext = createContext<AccordionContextData | null>(
  null
);

export const useAccordionContext = () => useContext(AccordionContext);

export interface IAccordion {
  children: ReactElement[] | ReactElement;
  className?: string;
}

export function Accordion(props: IAccordion) {
  return (
    <AccordionContext.Provider value={{}}>
      <div
        className={"accordion" + (props.className ? " " + props.className : "")}
      >
        {props.children instanceof Array &&
          props.children.map((child, index) => {
            return React.cloneElement(child, {
              key: index,
              index: index,
            });
          })}

        {React.isValidElement(props.children) &&
          React.cloneElement(props.children as any, {
            key: 0,
            index: 0,
          })}
      </div>
    </AccordionContext.Provider>
  );
}
