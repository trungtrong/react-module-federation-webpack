import { Outlet, Route, Routes } from 'react-router-dom';
import { ComponentType, lazy, memo, Suspense } from 'react';

import Home from '../../modules/Home';
import { PageError404 } from '@libs/shared/ui';
import {
    loadRemote,
    registerRemotes,
} from '@module-federation/enhanced/runtime';
import { ErrorBoundary } from 'react-error-boundary';

/**
 * Example: https://github.com/RussellCanfield/nx-rspack-microfrontend-demo/blob/dynamic-loader/apps/mfe-monorepo/src/app/features/Home/components/Home.tsx
 */

// const useRemote = (scope: string, module: string) => {
//   const LazyComponent = lazy(async () => {
//     registerRemotes([
//       {
//         name: scope,
//         alias: scope,
//         entry: 'http://localhost:4203/about/remoteEntry.js',
//       },
//     ]);

//     return loadRemote<{ default: ComponentType<any> }>(`${scope}`, {
//       from: 'runtime',
//     }) as Promise<{ default: ComponentType<any> }>;
//   });

//   return (props: any) => {
//     return (
//       <ErrorBoundary fallback={<p>ut oh!!</p>}>
//         <LazyComponent {...props} />
//       </ErrorBoundary>
//     );
//   };
// };

// const Shop = lazy(async () => {
//     loadRemote('shop', {
//         from: 'runtime',
//     }).then((m) => {
//         console.log('shop', m);
//     }).catch((error) => {
//         console.log('shop - error', error);
//     });;
//     return import('shop/Module');
// });
const Shop = lazy(
    () => loadRemote('shop/Module') as Promise<{ default: ComponentType<any> }>
);

// const Cart = lazy(async () => {
//     await loadRemote('cart', {
//         from: 'runtime',
//     }).then((m) => {
//         console.log('Cart', m);
//     }).catch((error) => {
//         console.log('Cart - error', error);
//     });;
//     return import('cart/Module');
// });
const Cart = lazy(
    () => loadRemote('cart/Module') as Promise<{ default: ComponentType<any> }>
);

const About = lazy(() => {
    return loadRemote('about/Module', {
        from: 'runtime',
    }).then((m) => {
        console.log('about', m);
        return Promise.resolve({ default: m });
    }).catch((error) => {
        console.log('about - error', error);
    }) as Promise<{ default: ComponentType<any>; }>;
    return import('about/Module');
});
// const About = lazy(() => loadRemote('about/Module') as Promise<{ default: ComponentType<any>; }>);
// const Hero = lazy(() => {
//   return loadRemote<{ default: typeof ProductHero }>('hero/ProductHero', {
//     from: 'runtime',
//   }) as Promise<{ default: typeof ProductHero }>;
// });
// const About = lazy(async () => {
//     registerRemotes([
//         {
//             name: 'about',
//             alias: 'about',
//             entry: 'http://localhost:4203/about/remoteEntry.js',
//         },
//     ]);

//     return loadRemote<{ default: ComponentType<any> }>(`about`, {
//         from: 'runtime',
//     }) as Promise<{ default: ComponentType<any> }>;
// });

// const Cart = lazy(() => import('cart/Module'));
// const About = lazy(() => import('about/Module'));

const View = () => {
    return (
        <Suspense fallback={<div>Loading remote feature...</div>}>
            <Routes>
                <Route path="/" element={<Outlet />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/shop/*" element={<Shop />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/about/*" element={<About />} />
                </Route>

                <Route path="*" element={<PageError404 />}></Route>
            </Routes>
        </Suspense>
    );
};

export default memo(View);
