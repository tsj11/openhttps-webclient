import { queryEdge } from '@/services/api';

export default {
  namespace: 'edge',

  state: {
    edgeData: [],
  },

  effects: {

    *fetchEdge({ payload }, { call, put }) {
      const response = yield call(queryEdge, payload);
      yield put({
        type: 'saveEdge',
        payload: response.edge,
      });
    },
  },

  reducers: {

    saveEdge(state, action) {
      return {
        ...state,
        edgeData: action.payload,
      };
    },
  },
};
