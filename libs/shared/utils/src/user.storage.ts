/* eslint-disable @typescript-eslint/ban-ts-comment */
import { AppStorage } from './storage.helper';

export const USER_TOKEN = '_utk';
export const USER_EXPERIENCE_SETTINGS = '_userExperienceSettings';
export const USER_ID = '_userId';

export class UserStorage {
    public static isLoggedIn() {
        // @ts-ignore
        return localStorage.getItem(USER_TOKEN);
    }

    public static getUserId() {
        // @ts-ignore
        return localStorage.getItem(USER_ID) ?? '';
    }

    public static setUserId(userId: string): void {
        // @ts-ignore
        localStorage.setItem(USER_ID, userId);
    }

    public static getAccessToken() {
        return AppStorage.getStorageValue({
            storage: 'local',
            key: USER_TOKEN,
            valueType: 'string',
            isDecode: true,
        });
    }

    public static clearStorage() {
        // @ts-ignore
        localStorage.removeItem(USER_TOKEN);
        // @ts-ignore
        localStorage.removeItem(USER_ID);
        // @ts-ignore
        localStorage.removeItem(USER_EXPERIENCE_SETTINGS);
    }
}
