import produce from 'immer';
import { LOGIN_USER_SUCCESS } from './action';

// The initial state of the App
export const initialState = {
  isAuthenticated: false,
  user: {},
  token: '',
};

/* eslint-disable default-case, no-param-reassign */
const AuthenticationReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOGIN_USER_SUCCESS:
        const {payload} = action;
        sessionStorage.setItem('accessToken', payload.user.accessToken);
        draft.isAuthenticated = true;
        draft.user = payload.user;
        draft.token = payload.user.accessToken;
        break;
    }
  });

export default AuthenticationReducer;
