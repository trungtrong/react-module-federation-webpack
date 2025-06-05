import { IUserState } from './user.model';
import { RootState } from '../rootReducer';
import { createSelector } from '@reduxjs/toolkit';

export class UserSelector {
    private static getState = (state: RootState): IUserState => {
        return state?.user ?? {};
    };

    public static getData = createSelector(
        [this.getState],
        (user: IUserState) => {
            return user;
        }
    );
}
