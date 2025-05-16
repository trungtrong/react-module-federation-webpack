/* eslint-disable @typescript-eslint/no-explicit-any */
type Listener = () => void;

// eslint-disable-next-line @typescript-eslint/ban-types, @typescript-eslint/no-unsafe-function-type
export class Subscribable<TListener extends Function = Listener> {
    protected listeners: Set<TListener>;

    constructor() {
        this.listeners = new Set();
        this.subscribe = this.subscribe.bind(this);
    }

    public subscribe(listener: TListener): () => void {
        this.listeners.add(listener);

        this.onSubscribe();

        return () => {
            this.listeners.delete(listener);
            this.onUnsubscribe();
        };
    }

    public hasListeners(): boolean {
        return this.listeners.size > 0;
    }

    protected onSubscribe(): void {
        // Do nothing
    }

    protected onUnsubscribe(): void {
        // Do nothing
    }
}

// CLASS

export class CustomMutationProps {
    mutationFn!: (requestParams: any) => Promise<any>;
    onMutate?: (requestParams?: any) => void;
    onSuccess?: (data: any, requestParams?: any) => void;
    onError?: (error: any, requestParams?: any) => void;
    onSettled?: (params: {
        isSuccess: boolean;
        data: any;
        requestParams: any;
    }) => void;

    constructor(init?: Partial<CustomMutationProps>) {
        Object.assign(this, init);
    }
}

export class CustomMutationObserverErrorResult {
    error: any;
    isError = false;
    isPending = false;
    isSuccess = false;

    constructor(init?: Partial<CustomMutationObserverErrorResult>) {
        Object.assign(this, init);
    }
}
