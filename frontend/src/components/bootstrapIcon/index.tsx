import './index.scss';

import { MouseEventHandler, useEffect, useState } from 'react';

export interface IBootstrapIcon {
    icon: string;
    ariaHidden?: boolean;
    className?: string;
    onClick?: MouseEventHandler<HTMLElement>;
}

export function BootstrapIcon({ ariaHidden = true, ...props }: IBootstrapIcon) {
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        let interval: NodeJS.Timer;
        let fontLoaded = document.fonts.check('12px bootstrap-icons');

        if(!fontLoaded) {
            interval = setInterval(() => {
                let fontLoaded = document.fonts.check('12px bootstrap-icons');
    
                if(fontLoaded) {
                    setIsLoading(false);
                    clearInterval(interval);
                } else if(!isLoading) {
                    setIsLoading(true);
                }
                
            }, 500);
        } else {
            setIsLoading(false);
        }

        return () => clearInterval(interval);
    }, []);

    return (
        <i
            aria-hidden={ariaHidden ? true : undefined}
            onClick={props.onClick}
            className={
                'bi bi-' +
                props.icon +
                (isLoading ? ' not-loaded' : '') +
                (props.className ? ' ' + props.className : '')
            }
        ></i>
    );
}
