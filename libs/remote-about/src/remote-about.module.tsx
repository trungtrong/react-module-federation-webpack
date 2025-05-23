import { memo } from 'react';
import { Link, Outlet } from 'react-router-dom';

const RemoteAbout = () => {
    return (
        <div className="flex flex-col gap-2">
            <div className="flex flex-row gap-2">
                <div><Link to="/about">Home</Link></div>
                <div><Link to="/about/about-1">About 1</Link></div>
                <div><Link to="/about/about-2">About 2</Link></div>
            </div>
            <div><Outlet></Outlet></div>
        </div>
    );
}

export default memo(RemoteAbout);
