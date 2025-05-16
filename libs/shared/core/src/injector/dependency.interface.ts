
export type Constructor<T = object> = new (...args: never[]) => T;

export interface IDependency {
    dependencyName: string;
    dependency: unknown;
}

export interface IDependencyInjectionToken {
    dependencyName: string;
}