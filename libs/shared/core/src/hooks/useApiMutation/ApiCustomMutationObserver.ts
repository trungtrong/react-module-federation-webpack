import { isEmpty } from 'lodash-es';
import {
    catchError,
    from,
    map,
    of,
    Subject,
    Subscription,
    switchMap,
} from 'rxjs';

import {
    CustomMutationObserverErrorResult,
    CustomMutationProps,
    Subscribable,
} from './models/custom-mutation.model';

export class ApiCustomMutationObserver extends Subscribable {
    mutateOptions?: CustomMutationProps = new CustomMutationProps();
    currentResult = new CustomMutationObserverErrorResult();

    private _apiSubject$ = new Subject<any>();
    public currentResultSubject$ =
        new Subject<CustomMutationObserverErrorResult>();
    private _subscriptions = new Subscription();

    constructor(options: CustomMutationProps | Partial<CustomMutationProps>) {
        super();
        this.setOptions(options);
        //
        this.bindMethods();
        this._subscribeApiSubject();
    }

    protected bindMethods(): void {
        this.mutate = this.mutate.bind(this);
        this.destroy = this.destroy.bind(this);
    }

    setOptions(options: CustomMutationProps | Partial<CustomMutationProps>) {
        this.mutateOptions = new CustomMutationProps({
            ...options,
        });
    }

    getCurrentResult = (): CustomMutationObserverErrorResult => {
        return this.currentResult;
    };

    setCurrentResult = (value: CustomMutationObserverErrorResult) => {
        this.currentResult = new CustomMutationObserverErrorResult({
            ...value,
        });
        this.currentResultSubject$.next(this.currentResult);
    };

    mutate(requestParams?: any, options?: CustomMutationProps) {
        if (!isEmpty(options)) {
            this.mutateOptions = options;
        }
        //
        this._apiSubject$.next(requestParams);
    }

    private _subscribeApiSubject() {
        this._subscriptions.add(
            this._apiSubject$
                .pipe(
                    switchMap((requestParams: any) => {
                        this.mutateOptions?.onMutate?.(requestParams);
                        //
                        this.setCurrentResult(
                            new CustomMutationObserverErrorResult({
                                isPending: true,
                                isSuccess: false,
                                error: undefined,
                                isError: false,
                            })
                        );
                        //
                        return from(
                            this.mutateOptions?.mutationFn(requestParams) ??
                                Promise.resolve(requestParams)
                        ).pipe(
                            map((data) => {
                                return {
                                    isSuccess: true,
                                    data: data,
                                    error: undefined,
                                    requestParams: requestParams,
                                };
                            }),
                            catchError((error) => {
                                return of({
                                    isSuccess: false,
                                    error: error,
                                    requestParams: requestParams,
                                });
                            })
                        );
                    })
                )
                .subscribe({
                    next: (params: {
                        isSuccess: boolean;
                        data?: any;
                        error?: any;
                        requestParams: any;
                    }) => {
                        if (params.isSuccess) {
                            this.mutateOptions?.onSuccess?.(
                                params.data,
                                params.requestParams
                            );
                        } else {
                            this.mutateOptions?.onError?.(
                                params.error,
                                params.requestParams
                            );
                        }
                        //
                        this.mutateOptions?.onSettled?.({
                            isSuccess: params.isSuccess,
                            data: params.data,
                            requestParams: params.requestParams,
                        });
                        this.setCurrentResult(
                            new CustomMutationObserverErrorResult({
                                isPending: false,
                                isSuccess: params.isSuccess,
                                error: params.error,
                                isError: !params.isSuccess,
                            })
                        );
                    },
                })
        );
    }

    destroy(): void {
        this._subscriptions.unsubscribe();
    }
}
