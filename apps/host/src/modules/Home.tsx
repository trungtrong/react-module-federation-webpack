import { lazy, Suspense, useCallback, useEffect, useState } from 'react';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { environment } from '@host/environment';
//
import { Button } from '@libs/shared/ui';
// import { Test2Helper } from '@libs/shared/core';
import { eventBus, TestHelper } from '@libs/shared/utils';
// import { ENV } from '../helper';
import {
    useAppDispatch,
    useAppSelector,
    CounterSelector,
    CounterActions,
} from '@libs/shared/store';

const RemoteAboutWidget = lazy(
    () => import('about/shared/features/RemoteAboutWidget')
);

const Home = () => {
    const dispatch = useAppDispatch();
    const count = useAppSelector(CounterSelector.selectCount);
    //
    const [openPopup, setOpenPopup] = useState(false);

    //#region State Management
    useEffect(() => {
        console.log('Home - environment', environment);
        console.log('process.env', process.env);
    }, []);
    //#endregion

    //#region Use static Class
    const decrement = useCallback(() => {
        TestHelper.decreaseCount();
    }, []);

    const increment = useCallback(() => {
        TestHelper.increaseCount();
    }, []);
    //#endregion

    //#region Event Bus with Subject
    useEffect(() => {
        eventBus.on({ eventName: 'remote:Widget' });
        const { unsubscribe: unsubscribeEvent } = eventBus.subscribe<{ openPopup: boolean }>({
            eventName: 'remote:Widget',
            callback: (data) => {
                setOpenPopup(data.openPopup);
            },
            clearAfterUnsubscribed: true
        });

        return () => {
            unsubscribeEvent();
        };
    }, []);
    //#endregion

    return (
        <div title="host" className="flex flex-col gap-4">
            <h1 className="bg-primary-100 m-0.5 truncate container">
                1. Welcome Home {environment.name}
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
            <br />
            {/* State Management */}
            <div>
                <h1>2. Counter - State Management</h1>

                <div className="flex flex-row gap-2">
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
            <br />
            {/* Render the dynamically loaded RemoteWidget */}
            <div>
                <h1>3. Consume shared components from Remotes</h1>
                <Suspense fallback={<div>Loading Remote Widget</div>}>
                    <RemoteAboutWidget />
                </Suspense>
            </div>

            <br />
            {/* Event Bus */}
            <div>
                <h1>Event Bus</h1>

                <div>Popup is {openPopup ? 'opened' : 'closed'} </div>
            </div>
        </div>
    );
};

export default Home;
