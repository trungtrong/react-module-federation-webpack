import { Injector } from './injector';

export const injectorRoot = new Injector();

export const Injectable = <T>(dependencyName: string, target: T) => {
    injectorRoot.register<T>({ dependencyName: dependencyName, dependency: target});
    console.info(`dependencies-inversion: ${dependencyName} registered`);

    return dependencyName;
};

export const Inject = <T>(injector: Injector, dependencyName: string): T => {
    const _injector = injector ?? injectorRoot;
    const dependency: T = _injector.get(dependencyName);
    return dependency;
};