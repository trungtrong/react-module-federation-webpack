import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

const SIDEBAR_MENU = [
    {
        id: '1_0',
        routerLink: '/',
        text: 'Home',
        icon: ' <i class="fas fa-user-friends"></i>',
    },
    {
        id: '1_1',
        routerLink: '/shop',
        text: 'Shop',
        icon: ' <i class="fas fa-user-friends"></i>',
    },
    {
        id: '1_2',
        routerLink: '/cart',
        text: 'Cart',
        icon: ' <i class="fas fa-user-friends"></i>',
    },
    {
        id: '1_3',
        routerLink: '/about',
        text: 'About',
        icon: ' <i class="fas fa-user-friends"></i>',
    },
];

const Sidebar = () => {
    return (
        <div className="side-bar-container">
            <div className="side-bar-item flex justify-start flex-col">
                {SIDEBAR_MENU.map((menu, index) => {
                    return (
                        <NavLink
                            key={index}
                            className={classNames(
                                'h-full w-full flex items-center p-2 border-solid border-spacing-1 border-black'
                            )}
                            to={menu.routerLink}
                        >
                            <span className="nav-title ml-2">{menu.text}</span>
                        </NavLink>
                    );
                })}
            </div>
        </div>
    );
};

export default Sidebar;
