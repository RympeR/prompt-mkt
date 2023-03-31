import { ReactNode, RefObject } from 'react';


export interface GenericInputProps {
    autoComplete?: string;
    className?: string;
    icon?: string;
    id?: string;
    inputRef?: RefObject<HTMLInputElement>;
    isActive?: boolean;
    isIconInteractive?: boolean;
    isInteractiveIconPrimary?: boolean;
    isInteractiveIconAriaHidden?: boolean;
    interactiveIconTitle?: string;
    isValid?: boolean;
    label?: string;
    'aria-describedby'?: string;
    links?: ReactNode | ReactNode[];
    maxLength?: number;
    minLength?: number;
    min?: number;
    max?: number;
    placeholder?: string;
    readOnly?: boolean;
    required?: boolean;
    tabIndex?: number;
    validationError?: string;
    value?: string | number;
    defaultValue?: string | number;
}
