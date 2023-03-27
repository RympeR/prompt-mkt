import { ChangeEvent, useId, useState } from 'react';
import { BootstrapIcon } from '../bootstrapIcon';

import './index.scss';

export interface ICheckbox {
    checked?: boolean;
    centered?: boolean;
    onChange?: CallableFunction;
    title?: string;
    tabIndex?: number;
}

export function Checkbox(props: ICheckbox) {
    const id = useId();

    const [checked, setChecked] = useState<boolean>(props.checked ?? false);

    function handleOnChange(e: ChangeEvent<HTMLInputElement>) {
        setChecked(e.target.checked);

        if (props.onChange) props.onChange(e);
    }

    return (
        <div
            className={
                'form-checkbox-wrapper' + (props.centered ? ' centered' : '')
            }
        >
            <input
                checked={checked}
                onChange={(e) => handleOnChange(e)}
                id={id}
                type='checkbox'
                tabIndex={props.tabIndex}
            />
            <label htmlFor={id}>
                <BootstrapIcon className='checkbox-icon' icon='check-lg' />
                {props.title}
            </label>
        </div>
    );
}
