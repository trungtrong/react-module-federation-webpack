
import { useCallback, useEffect } from 'react';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { environment } from '@host/environment';

import { Button } from '@libs/shared/ui';
import { TestHelper } from '@libs/shared/utils';

const Home = () => {
    useEffect(() => {
        console.log(environment, process.env, process.env.TARGET_ENV);
    }, []);

    const decrement = useCallback(() => {
        TestHelper.decreaseCount();
    }, []);

    const increment = useCallback(() => {
        TestHelper.increaseCount();
    }, []);

    return (
        <div title="host">
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
                <span aria-label="Count">count = { TestHelper.getCount() }</span>
                <Button
                    aria-label="Increment value"
                    onClick={() => increment()}
                >
                    Increase
                </Button>
            </div>
        </div>
    );
};

export default Home;
