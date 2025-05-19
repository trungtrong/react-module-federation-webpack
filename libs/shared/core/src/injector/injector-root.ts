import { Injector } from './injector';

export const injectorRoot = new Injector();

export const Injectable = <T>(dependencyName: string, target: T) => {
    injectorRoot.register<T>({ dependencyName: dependencyName, dependency: target});
    console.info(`dependencies-inversion: ${dependencyName} registered`);
    return dependencyName;
};

export const Inject = <T>(params: { injector?: Injector, dependencyName: string }): T => {
    if (!params) {
      console.error(`dependencies-inversion: Non dependencyName registered`);
      return '' as T;
    }

    const _injector = params?.injector ?? injectorRoot;
    console.log('_injector', _injector, window)
    const dependency: T = _injector.get(params?.dependencyName);
    return dependency;
};
