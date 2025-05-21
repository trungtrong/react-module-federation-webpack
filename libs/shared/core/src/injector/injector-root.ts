import { IDependency } from './dependency.interface';
import { Injector } from './injector';

// export const injectorRoot = new Injector();

// export const Injectable = <T>(params: { dependencyName: string, dependency: T }) => {
//   injectorRoot.register<T>({ dependencyName: params.dependencyName, dependency: params.dependency });
//   console.info(`dependencies-inversion: ${params.dependencyName} registered`);
//   return params.dependencyName;
// };

// export const Inject = <T>(params: { injector?: Injector, dependencyName: string }): T => {
//   if (!params) {
//     console.error(`dependencies-inversion: Non dependencyName registered`);
//     return '' as T;
//   }

//   const _injector = params?.injector ?? injectorRoot;
//   console.log('_injector', _injector, window)
//   const dependency: T = _injector.get(params?.dependencyName);
//   return dependency;
// };

export class RootInjector {
    private static rootInjector: Injector = new Injector();

    public static getInstance(): RootInjector {
        if (!RootInjector.rootInjector) {
            RootInjector.rootInjector = new Injector();
        }
        return RootInjector.rootInjector;
    }

    public static getDependency = <T>(params: { dependencyName: string }): T => {
        if (!params) {
            console.error(`dependencies-inversion: Non dependencyName registered`);
            return '' as T;
        }
        console.log(this.rootInjector, this.getInstance())
        const dependency: T = this.rootInjector.get(params?.dependencyName);
        return dependency;
    };

    public static register = <T>(params: IDependency) => {
        this.rootInjector.register<T>({ dependencyName: params.dependencyName, dependency: params.dependency });
        console.info(`dependencies-inversion: ${params.dependencyName} registered`);
        return params.dependencyName;
    };

    public static registers = (params: IDependency[]) => {
        if (!params.length) {
            console.error(`Error: Length of multiple dependencies should not be empty`);
            return;
        }
        params.forEach((item) => {
            if (this.rootInjector.get(item.dependencyName)) {
                console.error(`Register dependency: ${item.dependencyName} has been registered.`);
                return;
            }
            this.rootInjector.register({ dependencyName: item.dependencyName, dependency: item.dependency });
        })
    };

    public static unregister = (params: { dependencyName: string }) => {
        try {
            this.rootInjector.unregister(params);
        } catch (e) {
            console.error(`Unregister dependencies: Error, ${e}`);
        }
    };

    public static unregisterAll = () => {
        try {
            this.rootInjector.unregisterAll();
        } catch (e) {
            console.error(`Unregister All dependencies: Error, ${e}`);
        }
    };
}
