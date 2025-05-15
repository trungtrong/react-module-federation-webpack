import { Outlet, Route, Routes } from 'react-router-dom';
import { lazy, memo } from 'react';

import Home from '../../modules/Home';

const Shop = lazy(() => import('shop/Module'));
const Cart = lazy(() => import('cart/Module'));
const About = lazy(() => import('about/Module'));


const View = () => {
    return (
        <Routes>
            <Route path="/" element={<Outlet />}>
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/about" element={<About />} />
            </Route>
        </Routes>
    );
};

export default memo(View);
