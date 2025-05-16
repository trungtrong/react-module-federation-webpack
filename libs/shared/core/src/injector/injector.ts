import { IDependency } from './dependency.interface';

export class Injector {
    protected dependencies = new Map<string, unknown>();

    public register = <T>(params: IDependency) => {
        if (this.dependencies.get(params.dependencyName)) {
            console.error(`Register dependency: ${params.dependencyName} has been registered.`);
            return;
        }
        this.dependencies.set(params.dependencyName, params.dependency as T);
    };

    public registers = (params: IDependency[]) => {
        if (!params.length) {
            console.error(`Error: Length of multiple dependencies should not be empty`);
            return;
        }
        params.forEach((item) => {
            if (this.dependencies.get(item.dependencyName)) {
                console.error(`Register dependency: ${item.dependencyName} has been registered.`);
                return;
            }
            this.dependencies.set(item.dependencyName, item.dependency);
        })
    };

    public unregister = (params: { dependencyName: string }) => {
        try {
            this.dependencies.delete(params.dependencyName);
        } catch (e) {
            console.error(`Unregister dependencies: Error, ${e}`);
        }
    };

    public unregisterAll = () => {
        try {
            this.dependencies.clear();
        } catch (e) {
            console.error(`Unregister All dependencies: Error, ${e}`);
        }
    };

    public get = <T>(dependencyName: string): T => {
        return this.dependencies.get(dependencyName) as T;
    };
}
