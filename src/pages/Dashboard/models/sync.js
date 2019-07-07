import { querySync, updateSync } from '@/services/api';

export default {
  namespace: 'sync',

  state: {
    syncData: [],
  },

  effects: {

    *fetchSync({ payload }, { call, put }) {
      const response = yield call(querySync, payload);
      yield put({
        type: 'saveSync',
        payload: response.sync,
      });
    },

    *updateSync({ payload }, { call, put }) {
      yield call(updateSync, payload);
      yield put({
        type: 'fetchSync',
        payload: {
          userId: payload.userId,
        },
      });
    },
  },

  reducers: {

    saveSync(state, action) {
      return {
        ...state,
        syncData: action.payload,
      };
    },
  },
};
