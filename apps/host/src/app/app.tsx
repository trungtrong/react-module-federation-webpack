import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorInfo } from 'react';
//
import { AppLayout } from '../layouts';
import { AppInitializer } from '@libs/shared/core';
import { environment as environmentRoot } from '../environments/environment';
import { Provider } from 'react-redux';
import store from '@libs/shared/store/store';

const AppRouter = createBrowserRouter(
    createRoutesFromElements(
        <Route
            path="*"
            element={<AppLayout />}
            errorElement={<div>Error</div>}
        />
    )
);

export function App() {
    return (
        <ErrorBoundary
            fallbackRender={() => <div>Error</div>}
            onError={(error: Error, info: ErrorInfo) => {
                console.error(error);
                console.error(info);
            }}
        >
            <Provider store={store}>
                <AppInitializer environmentRoot={environmentRoot}>
                    <RouterProvider router={AppRouter} />
                </AppInitializer>
            </Provider>
        </ErrorBoundary>
    );
}

export default App;
