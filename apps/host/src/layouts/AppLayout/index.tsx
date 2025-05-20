import { memo, Suspense } from 'react';

import Views from '../Views';
import Sidebar from '../Sidebar';
import styles from './index.module.css';
import { useAppInitializer } from '@libs/shared/core/app-initializer';

const AppLayout = () => {
    const isInitializer = useAppInitializer();

    return (
        <Suspense
            fallback={<div className="flex flex-auto flex-col h-[100vh]"></div>}
        >
            <div className={styles['app-container']}>
                <Sidebar></Sidebar>
                <Views></Views>
            </div>
        </Suspense>
    );
};

export default memo(AppLayout);
