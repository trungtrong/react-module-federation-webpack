

import { IUserLoggedIn } from '../models';
import { ApiService } from './ApiService';
import { ApiEndpoints } from './api-endpoints.constant';

export const UsersService = {
  getUserInfo: () => {
    return ApiService.get<IUserLoggedIn>({
      url: `${ApiEndpoints.Users}/info`,
    });
  },
};
