import { useCallback, useEffect, useState } from 'react';

import { UsersService } from '../services/UsersService';
import useApiMutation from '../hooks/useApiMutation';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { UserStorage } from './../../../utils/src';

const useAppInitializer = () => {
    const [isInitializer, setIsInitializer] = useState(false);

    const { mutate: getApisInitializedMutate } = useApiMutation({
        mutationFn: () => {
            return Promise.all([
                UsersService.getUserInfo()
            ]);
        },
        onSuccess: ([userInfo]) => {
            // Store Response Data
            console.log(userInfo);
        },
        onError: () => {
            signOut();
        },
        onSettled: () => {
            setIsInitializer(() => {
                return true;
            });
        },
    });

    useEffect(() => {
        // TODO: For Testing only
        getApisInitializedMutate();
        return;
        //
        if (UserStorage.isLoggedIn()) {
            getApisInitializedMutate();
        } else {
            signOut();
            setIsInitializer(() => {
                return true;
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const signOut = useCallback(() => {
        //
    }, []);

    return isInitializer;
};

export default useAppInitializer;
