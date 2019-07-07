
export default {
  namespace: 'error',

  state: {
    error: '',
    isloading: false,
  },

  effects: {
  },

  reducers: {
    trigger(state, action) {
      return {
        error: action.payload,
      };
    },
  },
};
