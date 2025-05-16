import { useCallback, useEffect, useMemo, useState } from 'react';
import { Subscription } from 'rxjs';

import { ApiCustomMutationObserver } from './ApiCustomMutationObserver';
import {
    CustomMutationObserverErrorResult,
    CustomMutationProps,
} from './models';

const useApiMutation = (options: Partial<CustomMutationProps>) => {
    const [observer] = useState(new ApiCustomMutationObserver(options));
    const [result, setResult] = useState<CustomMutationObserverErrorResult>(
        observer.getCurrentResult()
    );

    useEffect(() => {
        const _subscriptions = new Subscription();
        _subscriptions.add(
            observer?.currentResultSubject$.subscribe(
                (value: CustomMutationObserverErrorResult) => {
                    setResult(value);
                }
            )
        );
        return () => {
            _subscriptions.unsubscribe();
            observer?.destroy();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        observer?.setOptions(options);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [options]);

    const mutate = useCallback(
        (variables?: any, mutateOptions?: any) => {
            observer?.mutate(variables, mutateOptions);
        },
        [observer]
    );

    return useMemo(() => {
        return { mutate, ...result };
    }, [mutate, result]);
};

export default useApiMutation;
