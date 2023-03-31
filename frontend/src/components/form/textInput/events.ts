import {
    ChangeEvent,
    ClipboardEvent,
    FocusEvent,
    FormEvent,
    KeyboardEvent,
    MouseEvent,
} from 'react';

export interface GenericInputEvents {
    onChange?: (
        e: ChangeEvent<HTMLInputElement>,
        optionalProperty1?: any,
        optionalProperty2?: any
    ) => void;
    onClick?: (e: MouseEvent<HTMLInputElement>) => void;
    onFocus?: (e: FocusEvent<HTMLInputElement>) => void;
    onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
    onInput?: (e: FormEvent<HTMLInputElement>) => void;
    onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
    onKeyUp?: (e: KeyboardEvent<HTMLInputElement>) => void;
    onMouseDown?: (e: MouseEvent<HTMLInputElement>) => void;
    onMouseLeave?: (e: MouseEvent<HTMLInputElement>) => void;
    onMouseMove?: (e: MouseEvent<HTMLInputElement>) => void;
    onMouseUp?: (e: MouseEvent<HTMLInputElement>) => void;
    onIconClick?: (e: MouseEvent<HTMLButtonElement>) => void;
    onPaste?: (e: ClipboardEvent<HTMLInputElement>) => void;
}
