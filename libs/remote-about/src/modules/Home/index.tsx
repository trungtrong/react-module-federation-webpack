import { useCallback, useEffect } from 'react';

import { Button } from '@libs/shared/ui';
import { EnvironmentHelper } from '@libs/shared/core';
import { TestHelper } from '@libs/shared/utils';
import {
    useAppDispatch,
    useAppSelector,
    CounterSelector,
    CounterActions
} from '@libs/shared/store';

const AboutHome = () => {
    const dispatch = useAppDispatch();
    const count = useAppSelector(CounterSelector.selectCount);


    useEffect(() => {
      const environment = EnvironmentHelper.environment;
        console.log('environment', environment);
        console.log('AboutHome - process.env', process.env);
    }, []);

    const decrement = useCallback(() => {
        TestHelper.decreaseCount();
    }, []);

    const increment = useCallback(() => {
        TestHelper.increaseCount();
    }, []);

    return (
        <div className="bg-red-50 mt-0.5px flex flex-col gap-4">
            <h1>Welcome to RemoteAbout!</h1>

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
                    onClick={increment}
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
}

export default AboutHome;
