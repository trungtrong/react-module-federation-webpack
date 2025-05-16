import { ReactNode, useEffect, useState } from 'react';
import { InjectorContext } from './InjectorContext';
import { Injector } from './injector';
import { IDependency } from './dependency.interface';

interface IInjectorProviderProps {
    services: IDependency[];
    children: ReactNode;
};

export const InjectorContextProvider = (props: IInjectorProviderProps) => {
    const [injector] = useState(() => {
        const injector = new Injector();
        injector.registers(props.services)
        return injector;
    });
    
    useEffect(() => {
        return () => {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            injector.unregisterAll();
        }
    }, []);

    return (
        <InjectorContext.Provider value={{ injector: injector}}>
            { props.children }
        </InjectorContext.Provider>
    )
}
