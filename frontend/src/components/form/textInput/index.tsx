import './index.scss';

import React, { createRef, useEffect, useId, useState } from 'react';
import { GenericInputEvents } from './events';
import { GenericInputProps } from './props';
import { BootstrapIcon } from '../../bootstrapIcon';

export interface ITextInput {
    type: string;
}
export function TextInput({
    isValid = true,
    ...props
}: ITextInput & GenericInputEvents & GenericInputProps) {
    const generatedId = useId();
    const generatedRef = createRef<HTMLInputElement>();
    const wrapperRef = createRef<HTMLDivElement>();

    let ref = props.inputRef ?? generatedRef;
    let id = props.id ?? generatedId;

    const [counterValue, setCounterValue] = useState<string | number>(
        props.value ?? ''
    );
    const [searchResultsActive, setSearchResultsActive] =
        useState<boolean>(false);

    useEffect(() => {
        setCounterValue(props.value ?? '');

        if (ref.current) {
            ref.current.value = props.value?.toString() ?? '';
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.value]);


    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (props.onChange) {
            props.onChange(e);
        }

        let newValue = e.target.value;

        if (props.maxLength) {
            newValue = newValue.slice(0, props.maxLength);
        }

        setCounterValue(newValue);

        e.target.value = newValue;
    };

    const handleOnFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        if (props.onFocus) props.onFocus(e);
    };

    const focusFirstSearchResult = () => {
        if (wrapperRef.current) {
            let firstFocusable = wrapperRef.current.querySelector(
                '.form-input-search-results [tabIndex="0"]'
            ) as any;

            if (firstFocusable) firstFocusable.focus();
        }
    };

    const handleOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'ArrowDown' || e.key === 'Enter') {
            if (!searchResultsActive) {
                setSearchResultsActive(true);
            }
        }

        if (e.key === 'Shift' && searchResultsActive) {
            setSearchResultsActive(false);
        }
        props.onKeyDown && props.onKeyDown(e);
    };

    const handleOnKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (searchResultsActive) {
            if (e.key === 'ArrowDown') {
                focusFirstSearchResult();
            }
        }

        props.onKeyUp && props.onKeyUp(e);
    };

    return (
        <div
            className={
                'form-input-wrapper' +
                (!isValid ? ' invalid' : '') +
                (props.required ? ' required' : '') +
                (props.className ? ' ' + props.className : '')
            }
            ref={wrapperRef}
        >
            {props.label && (
                <label htmlFor={id} className='form-input-label'>
                    {props.label}
                </label>
            )}

            <div className='form-input'>
                {props.icon !== undefined && (
                    <>
                        {props.isIconInteractive && (
                            <button
                                title={props.interactiveIconTitle}
                                aria-label={
                                    !props.isInteractiveIconAriaHidden
                                        ? props.interactiveIconTitle
                                        : undefined
                                }
                                aria-hidden={props.isInteractiveIconAriaHidden}
                                tabIndex={
                                    props.isInteractiveIconAriaHidden
                                        ? -1
                                        : undefined
                                }
                                onClick={(
                                    e: React.MouseEvent<HTMLButtonElement>
                                ) => {
                                    if (props.onIconClick) {
                                        props.onIconClick(e);
                                    }
                                }}
                                className={
                                    'icon interactive' +
                                    (props.isInteractiveIconPrimary
                                        ? ' primary'
                                        : '')
                                }
                            >
                                <BootstrapIcon
                                    ariaHidden={true}
                                    icon={props.icon}
                                />
                            </button>
                        )}
                        {!props.isIconInteractive && (
                            <BootstrapIcon
                                ariaHidden={true}
                                className='icon'
                                icon={
                                    isValid
                                        ? props.icon
                                        : 'exclamation-circle-fill'
                                }
                            />
                        )}
                    </>
                )}
                <input
                    id={id}
                    className={
                        'form-input-element' + (props.isActive ? ' focus' : '')
                    }
                    type={props.type}
                    placeholder={props.placeholder}
                    minLength={props.minLength}
                    min={props.min}
                    max={props.max}
                    defaultValue={props.defaultValue}
                    aria-invalid={isValid ? undefined : true}
                    aria-describedby={
                        isValid
                            ? props['aria-describedby']
                                ? props['aria-describedby']
                                : undefined
                            : id + '--error'
                    }
                    maxLength={props.maxLength}
                    autoComplete={
                        props.autoComplete
                    }
                    tabIndex={props.tabIndex}
                    aria-required={props.required}
                    onBlur={(e) => props.onBlur && props.onBlur(e)}
                    onChange={handleOnChange}
                    onFocus={handleOnFocus}
                    onInput={(e) => props.onInput && props.onInput(e)}
                    onClick={(e) => props.onClick && props.onClick(e)}
                    onKeyDown={handleOnKeyDown}
                    onKeyUp={handleOnKeyUp}
                    onMouseDown={(e) =>
                        props.onMouseDown && props.onMouseDown(e)
                    }
                    onMouseUp={(e) => props.onMouseUp && props.onMouseUp(e)}
                    onMouseMove={(e) =>
                        props.onMouseMove && props.onMouseMove(e)
                    }
                    onMouseLeave={(e) =>
                        props.onMouseLeave && props.onMouseLeave(e)
                    }
                    onPaste={(e) => props.onPaste && props.onPaste(e)}
                    ref={ref}
                    readOnly={props.readOnly}
                />

                {props.maxLength !== undefined && (
                    <div className='counter'>
                        {counterValue?.toString().length}/{props.maxLength}
                    </div>
                )}
            </div>

            {!isValid && props.validationError !== undefined && (
                <p id={id + '--error'} className='input-error'>
                    {props.validationError}
                </p>
            )}

            {props.links !== undefined && (
                <div className='links'>{props.links}</div>
            )}
        </div>
    );
}
