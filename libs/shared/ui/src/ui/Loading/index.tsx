import { ICommonProps } from '@react-module-federation-webpack/core/models';
import classNames from 'classnames';
import { ElementType, memo, ReactNode } from 'react';
import Spinner from '../Spinner';

interface IBaseLoadingProps extends ICommonProps {
    asElement?: ElementType;
    customLoader?: ReactNode;
    loading: boolean;
    spinnerClass?: string;
}

interface ILoadingProps extends IBaseLoadingProps {
    type?: 'default' | 'cover';
}

const DefaultLoading = (props: ILoadingProps) => {
    const {
        loading,
        children,
        spinnerClass,
        className,
        asElement: Component = 'div',
        customLoader,
    } = props;

    return loading
    ? (
        <Component
            className={
                classNames(
                    !customLoader && 'flex items-center justify-between h-full',
                    className
                )
            }>
            {
                customLoader ? (
                    <>{ customLoader }</>
                ) : (
                    <Spinner className={spinnerClass} size={40}></Spinner>
                )
            }
        </Component>
    )
    : (<>{ children }</>)
}

const CoveredLoading = (props: IBaseLoadingProps) => {
    const {
        loading,
        children,
        spinnerClass,
        className,
        asElement: Component = 'div',
        customLoader,
    } = props;

    return (
        <Component className={classNames(loading ? 'relative' : '', className)}>
            {children}
            {loading && (
                <div className="w-full h-full bg-white dark:bg-gray-800 dark:bg-opacity-60 bg-opacity-50 absolute inset-0" />
            )}
            {loading && (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                    {customLoader ? (
                        <>{customLoader}</>
                    ) : (
                        <Spinner className={spinnerClass} size={40} />
                    )}
                </div>
            )}
        </Component>
    );
};

const Loading = ({ type, ...rest }: ILoadingProps) => {
    switch (type) {
        case 'default':
            return <DefaultLoading {...rest} />;
        case 'cover':
            return <CoveredLoading {...rest} />;
        default:
            return <DefaultLoading {...rest} />;
    }
};

export default memo(Loading);
