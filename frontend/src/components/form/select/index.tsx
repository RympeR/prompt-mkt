import './index.scss';

import { ChangeEvent, FormEvent, ReactNode, useId } from 'react';
import { BootstrapIcon } from '../../bootstrapIcon';

export interface ISelect {
    autoComplete?: string;
    children?: ReactNode | ReactNode[];
    className?: string;
    defaultValue?: string | number;
    icon?: string;
    id?: string;
    label?: string;
    placeholder?: string;
    tabIndex?: number;
    value?: string;
    required?: boolean;
    isValid?: boolean;
    disabled?: boolean;
    validationError?: string;
    infoButtonEnabled?: boolean;
    infoButtonText?: string;
    infoButtonTitle?: string;
    infoButtonAriaLabel?: string;
    infoButtonTooltipTitle?: string;
    infoButtonTooltipText?: string;
    combineInfoButtonTextWithTitle?: boolean;
    onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
    onInput?: (e: FormEvent<HTMLSelectElement>) => void;
}

export function Select({ isValid = true, ...props }: ISelect) {
    const generatedId = useId();

    let id = props.id ?? generatedId;
    
    return (
        <div
            className={
                'form-select-wrapper' +
                (props.className ? ' ' + props.className : '') +
                (props.required ? ' required' : '') +
                (!isValid ? ' invalid' : '')
            }
        >
            {props.label && (
                <label htmlFor={id} className='form-select-label'>
                    {props.label}
                </label>
            )}
            <div className='form-select'>
                <div className='form-select-main'>
                    {props.icon !== undefined && (
                        <BootstrapIcon className='icon' icon={props.icon} />
                    )}
                    <select
                        id={id}
                        className='form-select'
                        value={props.value}
                        autoComplete={props.autoComplete}
                        defaultValue={props.defaultValue}
                        tabIndex={
                            props.tabIndex
                        }
                        disabled={props.disabled}
                        onChange={(e) => props.onChange && props.onChange(e)}
                        onInput={(e) => props.onInput && props.onInput(e)}
                        aria-invalid={isValid ? undefined : true}
                        aria-describedby={isValid ? undefined : id + '--error'}
                        aria-required={props.required}
                    >
                        {props.placeholder && (
                            <option
                                selected={props.value === undefined}
                                disabled
                            >
                                {props.placeholder}
                            </option>
                        )}
                        {props.children}
                    </select>
                    <BootstrapIcon className='chevron' icon='chevron-down' />
                </div>
            </div>

            {!isValid && props.validationError !== undefined && (
                <p id={id + '--error'} className='select-error'>
                    {props.validationError}
                </p>
            )}
        </div>
    );
}
