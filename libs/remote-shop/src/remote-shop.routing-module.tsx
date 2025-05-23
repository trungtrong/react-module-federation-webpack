import RemoteAboutModule from './remote-shop.module';
import { Route, Routes } from 'react-router-dom';
import AboutHome from './modules/Home';
import AboutOne from './modules/About-1';
import AboutTwo from './modules/About-2';

const RemoteShopRoutingModule = () => {
    return (
        <Routes>
            <Route path="/" element={<RemoteAboutModule />}>
                <Route path="" element={<AboutHome />}></Route>
                <Route path="shop-1" element={<AboutOne />}></Route>
                <Route path="shop-2" element={<AboutTwo />}></Route>
            </Route>

        </Routes>
    );
};

export default RemoteShopRoutingModule;
