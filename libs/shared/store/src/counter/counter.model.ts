export interface ICounterState {
    value: number;
    status: "idle" | "loading" | "failed";
};
