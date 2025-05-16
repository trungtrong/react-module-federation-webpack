export class ApiErrorModel {
    message?: string;
    code?: string;

    constructor(init?: Partial<ApiErrorModel>) {
        Object.assign(this, init);
    }
}   