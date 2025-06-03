import RemoteAboutModule from './remote-about.module';
import { Route, Routes } from 'react-router-dom';
import AboutHome from './modules/Home';
import AboutOne from './modules/About-1';
import AboutTwo from './modules/About-2';
import { Suspense } from 'react';

const RemoteAboutRoutingModule = () => {
    return (
        <Suspense fallback={<div>Loading remote feature...</div>}>
            <Routes>
                <Route path="/" element={<RemoteAboutModule />}>
                    <Route path="" element={<AboutHome />}></Route>
                    <Route path="about-1" element={<AboutOne />}></Route>
                    <Route path="about-2" element={<AboutTwo />}></Route>
                </Route>
            </Routes>
        </Suspense>
    );
};

export default RemoteAboutRoutingModule;
