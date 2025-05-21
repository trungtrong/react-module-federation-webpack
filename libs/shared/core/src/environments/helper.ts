import { RootInjector } from '../injector';
import { EnvironmentsEnum } from './enums';

export interface ImportMetaEnv {
    readonly name: string,
    readonly production: boolean,
    readonly DOMAIN_URL: string,
    readonly API_BASE_URL: string
}

export const ENVIRONMENT_DEPENDENCY_NAME = 'environment';
export class EnvironmentHelper {
    private static _environment: ImportMetaEnv;

    public static get environment(): ImportMetaEnv {
        if (!this._environment?.name) {
            this._environment = RootInjector.getDependency({
                dependencyName: ENVIRONMENT_DEPENDENCY_NAME,
            }) as ImportMetaEnv ?? {};
        }
        //
        return this._environment;
    }

    static isProd() {
        return this.environment.name === EnvironmentsEnum.Production;
    }
    static isStage() {
        return this.environment.name === EnvironmentsEnum.Staging;
    }
    static isDev() {
        return this.environment.name === EnvironmentsEnum.Development;
    }
}
