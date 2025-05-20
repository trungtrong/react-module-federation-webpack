import type { MouseEvent } from 'react';
import { forwardRef } from 'react';

import { ICommonProps } from '@libs/shared/core/models';

export interface ButtonProps extends ICommonProps {
    disabled?: boolean;
    title?: string;
    onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
    const { children, className, disabled = false, title, ...rest } = props;
    //
    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
        const { onClick } = props;
        if (disabled) {
            e.preventDefault();
            return;
        }
        onClick?.(e);
    };

    return (
        <button
            ref={ref}
            className={className}
            title={title ?? ''}
            data-disabled={disabled}
            onClick={handleClick}
            {...rest}
        >
          {children}
        </button>
    );
});

export default Button;
