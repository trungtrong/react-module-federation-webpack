import RemoteAboutRoutingModule from '@apps/remote-about/remote-about.routing-module';
import { environment } from '../environments/environment';
import { Suspense } from 'react';

export function App() {
    return (
        <Suspense fallback={<div>Loading remote feature...</div>}>
            <div title="about">
                Remote - About App {environment.name}
                <RemoteAboutRoutingModule />
            </div>
        </Suspense>
    );
}

export default App;
