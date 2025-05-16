import type { MouseEvent } from 'react';
import { forwardRef } from 'react';

import { ICommonProps } from '@react-module-federation-webpack/core/models';

export interface ISearchInputProps extends ICommonProps {
    disabled?: boolean;
    title?: string;
    onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}

const SearchInput = forwardRef<HTMLButtonElement, ISearchInputProps>((props, ref) => {
    return (
        <div></div>
    );
});

export default SearchInput;
