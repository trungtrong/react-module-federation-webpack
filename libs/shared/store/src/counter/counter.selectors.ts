import { createSelector } from '@reduxjs/toolkit';

import { ICounterState } from './counter.model';
import { RootState } from '../rootReducer';

export class CounterSelector {
    private static getState = (state: RootState): ICounterState => {
        return state?.counter ?? {};
    };

    public static selectCount = createSelector(
        [this.getState],
        (counter: ICounterState) => {
            return counter.value;
        }
    );

    public static selectStatus = createSelector(
        [this.getState],
        (counter: ICounterState) => {
            return counter.status;
        }
    );
}
