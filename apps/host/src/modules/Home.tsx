import { lazy, Suspense, useCallback, useEffect, useState } from 'react';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { environment } from '@host/environment';
//
import { Button } from '@libs/shared/ui';
// import { Test2Helper } from '@libs/shared/core';
import {
    broadcastChannelEmitter,
    eventBus,
    TestHelper,
} from '@libs/shared/utils';
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
    const [turnOnChannel, setTurnOnChannel] = useState(false);

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
        const { unsubscribe: unsubscribeEvent } = eventBus.subscribe<{
            openPopup: boolean;
        }>({
            eventName: 'remote:Widget',
            callback: (data) => {
                setOpenPopup(data.openPopup);
            },
            clearAfterUnsubscribed: true,
        });

        return () => {
            unsubscribeEvent();
        };
    }, []);
    //#endregion

    //#region Broadcast Channel
    useEffect(() => {
        broadcastChannelEmitter.on('host:turnOnChannel');
        const { unsubscribe: unsubscribeBroadcastChannel } = broadcastChannelEmitter.subscribe<{ turnOnChannel: boolean }>({
            channelName: 'host:turnOnChannel',
            callback: (event) => {
                const data = event.data;
                console.log('broadcastChannelEmitter event', event);
                setTurnOnChannel(data.turnOnChannel);
            },
            clearAfterUnsubscribed: true
        });
        return () => {
            unsubscribeBroadcastChannel();
        }
    }, []);

    const toggleChannel = useCallback(() => {
        const currentChannelStatus = turnOnChannel;
        broadcastChannelEmitter.emit({
            channelName: 'host:turnOnChannel',
            data: { turnOnChannel: !currentChannelStatus },
        });
        setTurnOnChannel(!currentChannelStatus);
    }, [turnOnChannel]);
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

            <br />
            {/* Broadcast Channel */}
            <div className="flex flex-col gap-2">
                <h1>Broadcast Channel </h1>
                <Button
                    aria-label="Toggle Channel"
                    onClick={() => toggleChannel()}
                >
                    Toggle Channel
                </Button>

                <div>Channel is {turnOnChannel ? 'opened' : 'closed'} </div>
            </div>
        </div>
    );
};

export default Home;
