import { Button } from '@libs/shared/ui';
import { eventBus } from '@libs/shared/utils';
import { useCallback } from 'react';

export function RemoteAboutWidget() {
    const openPopup = useCallback(() => {
        eventBus.emit<{ openPopup: boolean }>({ eventName: 'remote:Widget', data: { openPopup: true } });
    }, []);

    const closePopup = useCallback(() => {
        eventBus.emit<{ openPopup: boolean }>({ eventName: 'remote:Widget', data: { openPopup: false } });
    }, []);

    return (
        <>
            <div className="remote-widget-container">
                <h3>Hello from the Remote About - Shared Widget!</h3>
                <p>
                    This component is served dynamically by the{' '}
                    <code>my-remote-app</code>.
                </p>
            </div>

            <br />

            {/* Event Bus */}
            <div>
                <h1>Event Bus</h1>

                <div className="flex flex-row gap-2">
                    <Button
                        aria-label="Open Popup"
                        onClick={openPopup}
                    >
                        Open Popup
                    </Button>
                    <Button
                        aria-label="Close Popup"
                        onClick={closePopup}
                    >
                        Close Popup
                    </Button>
                </div>
            </div>
        </>
    );
}

export default RemoteAboutWidget;
