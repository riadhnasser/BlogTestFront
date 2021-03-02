import { toast } from 'react-toastify';
import { setupAxiosInterceptors } from '../../utils/axios';

export const REGISTER_USER = 'auth/REGISTER_USER';
export const REGISTER_USER_SUCCESS = 'auth/REGISTER_USER_SUCCESS';
export const REGISTER_USER_ERROR = 'auth/REGISTER_USER_ERROR';

export const LOGIN_USER = 'auth/LOGIN_USER';
export const LOGIN_USER_SUCCESS = 'auth/LOGIN_USER_SUCCESS';
export const LOGIN_USER_ERROR = 'auth/LOGIN_USER_ERROR';

export function registerAction(user, history) {
  return {
    types: [REGISTER_USER, REGISTER_USER_SUCCESS, REGISTER_USER_ERROR],
    promise: client => client.post('/users/register', user),
    afterError: () => {
      toast.error('User not Registered');
    },
    afterSuccess: () => {
      toast.success('User Registered');
      history.push('/login');
    }
  };
}

export function login(user, history) {
  return {
    types: [LOGIN_USER, LOGIN_USER_SUCCESS, LOGIN_USER_ERROR],
    promise: client => client.post('/users/login', user),
    afterSuccess: () => {
      toast.success('Login Success');
      history.push('/posts')
    },
    afterError: () => {
      toast.error('Login Failed');
    },
  };
}
