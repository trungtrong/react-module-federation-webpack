import React, { useEffect } from 'react';

import { ICommonProps } from '../models';

const AppInitializerContext = React.createContext({});
const AppInitializerProvider = AppInitializerContext.Provider;

const AppInitializer = (props: ICommonProps) => {
    useEffect(() => {
        // toast.init();

        return () => {
            // toast.removeAll();
        };
    });

    return (
        <AppInitializerProvider value={{}}>
            {props.children}
        </AppInitializerProvider>
    );
};

export default AppInitializer;
