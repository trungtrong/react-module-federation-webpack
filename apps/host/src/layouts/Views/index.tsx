import { Outlet, Route, Routes } from 'react-router-dom';
import { lazy, memo } from 'react';

import Home from '../../modules/Home';
import { PageError404 } from '@libs/shared/ui';

const Shop = lazy(() => import('shop/Module'));
const Cart = lazy(() => import('cart/Module'));
const About = lazy(() => import('about/Module'));


const View = () => {
    return (
        <Routes>
            <Route path="/" element={<Outlet />}>
                <Route path="/" element={<Home />} />
                <Route path="/shop/*" element={<Shop />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/about/*" element={<About />} />
            </Route>

            <Route path='*' element={<PageError404 />}></Route>
        </Routes>
    );
};

export default memo(View);
