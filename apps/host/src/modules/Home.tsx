import { useCallback, useEffect } from 'react';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { environment } from '@host/environment';

import { Button } from '@libs/shared/ui';
// import { Test2Helper } from '@libs/shared/core';
import { TestHelper } from '@libs/shared/utils';
// import { ENV } from '../helper';
import {
    useAppDispatch,
    useAppSelector,
    CounterSelector,
    CounterActions
} from '@libs/shared/store';

const Home = () => {
    const dispatch = useAppDispatch();
    const count = useAppSelector(CounterSelector.selectCount);

    useEffect(() => {
        console.log('Home - environment', environment);
        console.log('process.env', process.env);
    }, []);

    const decrement = useCallback(() => {
        TestHelper.decreaseCount();
    }, []);

    const increment = useCallback(() => {
        TestHelper.increaseCount();
    }, []);

    return (
        <div title="host" className="flex flex-col gap-4">
            <h1 className="bg-primary-100 m-0.5 truncate container">
                Welcome Home {environment.name}
            </h1>

            <div>
                <Button
                    aria-label="Decrement value"
                    onClick={() => decrement()}
                >
                    Decrease
                </Button>
                <span aria-label="Count">count = {TestHelper.getCount()}</span>
                <Button
                    aria-label="Increment value"
                    onClick={() => increment()}
                >
                    Increase
                </Button>
            </div>

            {/* State Management */}
            <div>
                <div>Counter - State Management</div>

                <div className='flex flex-row gap-2'>
                    <Button
                        aria-label="Decrement value"
                        onClick={() => dispatch(CounterActions.decrement())}
                    >
                        Decrease
                    </Button>
                    <span aria-label="Count">{count}</span>
                    <Button
                        aria-label="Increment value"
                        onClick={() => dispatch(CounterActions.increment())}
                    >
                        Increase
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Home;
