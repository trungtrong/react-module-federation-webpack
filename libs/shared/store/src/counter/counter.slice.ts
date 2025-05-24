import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ICounterState } from './counter.model';
import { AppStateFeatureKeysEnum } from '../feature-keys.enums';

const initialState: ICounterState = {
    value: 0,
    status: 'idle'
};

export const CounterSlice = createSlice({
    name: AppStateFeatureKeysEnum.Counter,
    initialState,
    reducers: {
        resetState() {
            return initialState;
        },
        //
        increment(state: ICounterState) {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.value += 1;
        },
        decrement(state: ICounterState) {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.value -= 1;
        },
        // Use the `PayloadAction` type to declare the contents of `action.payload`
        incrementByAmount(state, action: PayloadAction<number>) {
            state.value += action.payload;
        }
    },
});
