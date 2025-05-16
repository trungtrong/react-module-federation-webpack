import { useEffect } from 'react';
import { ICommonProps } from '../models';


const AppInitializer = (props: ICommonProps) => {
    useEffect(() => {
        // toast.init();

        return () => {
            // toast.removeAll();
        };
    }, []);

    return (
        <>
            {props.children}
        </>
    );
};

export default AppInitializer;
