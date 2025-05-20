import { useCallback } from 'react';

import { Button } from '@libs/shared/ui';
import { TestHelper } from '@libs/shared/utils';

export function RemoteAbout() {
    const decrement = useCallback(() => {
        TestHelper.decreaseCount();
    }, []);

    const increment = useCallback(() => {
        TestHelper.increaseCount();
    }, []);

    return (
        <div className="bg-red-50 mt-0.5px">
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
                    onClick={() => increment()}
                >
                    Increase
                </Button>
            </div>
        </div>
    );
}

export default RemoteAbout;
