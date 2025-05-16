export enum NodeEnvironmentsEnum {
    Local = 'local',
    Development = 'development',
    Production = 'production'
}

export const NODE_ENV: NodeEnvironmentsEnum = process.env.NODE_ENV as NodeEnvironmentsEnum;

// App Environments
export enum EnvironmentsEnum {
    Local = 'local',
    Development = 'development',
    Stage = 'stage',
    Production = 'production'
}