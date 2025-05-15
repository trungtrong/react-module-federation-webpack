import { createBrowserRouter, createRoutesFromElements, Link, Route, RouterProvider, Routes } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorInfo } from 'react';
import { AppLayout } from '../layouts';

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
            <RouterProvider router={AppRouter} />
        </ErrorBoundary>
    );
}

export default App;
