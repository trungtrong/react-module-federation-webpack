import { memo } from 'react';
import { Link, Outlet } from 'react-router-dom';

const RemoteShop = () => {
    return (
        <div className="flex flex-col gap-2">
            <div className="flex flex-row gap-2">
                <div><Link to="/shop">Home</Link></div>
                <div><Link to="/shop/shop-1">Shop 1</Link></div>
                <div><Link to="/shop/shop-2">Shop 2</Link></div>
            </div>
            <div><Outlet></Outlet></div>
        </div>
    );
}

export default memo(RemoteShop);
