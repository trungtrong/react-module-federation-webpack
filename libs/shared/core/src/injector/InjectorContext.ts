/**
 * Refer to:
 * + https://codedrivendevelopment.com/posts/dependency-injection-in-react
 * + https://codedrivendevelopment.com/posts/dependency-injection-in-react
 */
import React, { useContext } from 'react';
import { Injector } from './injector';
import { Inject } from './injector-root';

export interface IInjectorContextProps {
    injector: Injector;
};

export const InjectorContext = React.createContext<IInjectorContextProps>({
    injector: new Injector()
});

export function useInjector(): IInjectorContextProps {
    const ctx = useContext(InjectorContext);
    if (!ctx) throw new Error('Must use InjectorContextProvider first')
    return ctx;
}

export function useInject<T>(dependencyName: string) {
    const { injector } = useInjector();
    return Inject<T>(injector, dependencyName);
}

export const InjectorContextConsumer = InjectorContext.Consumer;
