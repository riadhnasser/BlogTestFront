import axios from 'axios';

let promiseCount = 0;

export default function promiseMiddleware({ dispatch, getState }) {
  return next => action => {
    if (typeof action === 'function') {
      return action(dispatch, getState);
    }

    const { promise, types, afterSuccess, afterError, ...rest } = action;
    if (!action.promise) {
      return next(action);
    }

    const [REQUEST, SUCCESS, FAILURE] = types;
    next({ ...rest, type: REQUEST });

    if (!promiseCount) {
      const pace = document.getElementById('hackpace');
      if (pace) {
        // hackpace

        pace.className = 'pace pace-activity';
      }
    }

    // eslint-disable-next-line no-plusplus
    promiseCount++;

    const onFulfilled = result => {
      // eslint-disable-next-line no-plusplus
      promiseCount--;

      next({ ...rest, ...result.data, type: SUCCESS });

      if (afterSuccess) {
        const afterReturn = afterSuccess(dispatch, getState, result);

        if (afterReturn && typeof afterReturn.then === 'function') {
          return afterReturn;
        }
      }

      return result.data;
    };
    const onRejected = error => {
      // eslint-disable-next-line no-plusplus
      promiseCount--;

      next({ ...rest, error, type: FAILURE });
      // eslint-disable-next-line no-unused-expressions
      afterError && afterError(dispatch, getState, error);
      if (error.response && error.response.status === 404) {
        // notify.show(error.response.status + ':' + error.response.statusText);
      }

      return Promise.reject(error);
    };

    return promise(axios, dispatch).then(onFulfilled, onRejected);
    // .catch(error => {
    //     console.error('MIDDLEWARE ERROR:', error);
    //    // onRejected(error)
    // });
  };
}
