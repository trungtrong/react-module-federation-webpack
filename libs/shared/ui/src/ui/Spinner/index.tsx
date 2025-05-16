import { SvgSpinner } from '@react-module-federation-webpack/assets/svg-icons';
import { ICommonProps } from '@react-module-federation-webpack/core/models';
import classNames from 'classnames';
import { ElementType, forwardRef, memo, useMemo } from 'react';

export interface ISpinnerProps extends ICommonProps {
    colorClass?: string;
    indicator?: ElementType;
    isSpinning?: boolean;
    size?: string | number;
}

const Spinner = forwardRef((props: ISpinnerProps, ref) => {
    const {
        className,
        colorClass,
        indicator: Component = SvgSpinner,
        isSpinning,
        size = 20,
        style,
        ...rest
    } = props;


    const spinnerStyle = useMemo(() => {
        return {
            width: size,
            ...style,
        }
    }, [size, style])

    return (
        <Component
            ref={ref}
            style={spinnerStyle}
            className={classNames(
                isSpinning && 'animate-spin',
                colorClass,
                className
            )}
            {...rest}
        />
    )
})

export default memo(Spinner);
