import { UsersService } from '@libs/shared/core';
import useApiMutation from '@libs/shared/core/hooks/useApiMutation';
import { useState } from 'react';

const useGetUserInfoFacade = () => {
    const [isLoading, setIsLoading] = useState(false);
    //
    const { mutate: getUserInfo } = useApiMutation({
        onMutate: () => {
            setIsLoading(() => {
                return true;
            });
        },
        mutationFn: () => {
            return UsersService.getUserInfo();
        },
        onSuccess: (res) => {
            console.log('useGetUserInfoFacade', res);
        },
        onError: () => {
            //
        },
        onSettled: () => {
            setIsLoading(() => {
                return false;
            });
        },
    });

    return { isLoading, getUserInfo };
};

const useGetUserInfo2Facade = () => {
    const [isLoading, setIsLoading] = useState(false);
    //
    const { mutate: getUserInfo } = useApiMutation({
        onMutate: () => {
            setIsLoading(() => {
                return true;
            });
        },
        mutationFn: () => {
            return UsersService.getUserInfo();
        },
        onSuccess: (res) => {
            //
        },
        onError: () => {
            //
        },
        onSettled: () => {
            setIsLoading(() => {
                return false;
            });
        },
    });

    return { isLoading, getUserInfo };
};

export { useGetUserInfoFacade, useGetUserInfo2Facade };
