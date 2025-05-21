import { useEffect, useLayoutEffect, useState } from 'react';
import { ICommonProps } from '../models';

import { RootInjector } from './../injector/injector-root';
import { ENVIRONMENT_DEPENDENCY_NAME, ImportMetaEnv } from '../environments';
import { BaseService } from '../services';

interface IAppInitializerProps extends ICommonProps {
    environmentRoot: ImportMetaEnv;
}

const AppInitializer = (props: IAppInitializerProps) => {
    const [isInitialized, setIsInitialized] = useState(false);

    useLayoutEffect(() => {
        RootInjector.getInstance();
        RootInjector.registers([
            {
                dependencyName: ENVIRONMENT_DEPENDENCY_NAME,
                dependency: props.environmentRoot,
            },
        ]);
        //
        BaseService.initAxios();
        //
        setIsInitialized(true);
    }, []);

    useEffect(() => {
        // toast.init();
        return () => {
            // toast.removeAll();
            console.log('AppInitializer - removeAll');
            RootInjector.unregisterAll();
        };
    }, []);

    return <div>{isInitialized && props.children}</div>;
};

export default AppInitializer;
