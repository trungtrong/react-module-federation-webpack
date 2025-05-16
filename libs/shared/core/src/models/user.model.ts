export interface IUser {
    id: string;
    name: string;
    email: string;
    avatar: string;
}

export interface IUserLoggedIn extends IUser {
    authority?: string[]; // Roles
}

