import { queryUser, changeEmail, changePassword } from '@/services/user';
// import { message } from 'antd';

export default {
  namespace: 'user',

  state: {
    user: {
      id: undefined,
      email: undefined,
      phone: undefined,
    },
  },

  effects: {
    // 请求用户邮箱、手机号
    *fetchUser( _, { call, put }) {
      const response = yield call(queryUser);
      yield put({
        type: 'saveUser',
        payload: response,
      });
    },
    // 更新用户邮箱、手机
    *changeEmail({ payload }, { call, put }) {
      const response = yield call(changeEmail, payload);
      if (response.success) {
        yield put({
          type: 'fetchUser',
        });
        yield put({
          type: 'userInfo/setModalState',
          payload: false,
        });
      }
      // TODO: 提示失败
    },

    // 更换用户密码
    *changePassword({ payload }, { call, put }) {
      const response = yield call(changePassword, payload);
      if (response.updateUserPwd === 'success') {
        // yield put({
        //   type: 'login/logout',
        // });
      }
      // TODO: 提示失败
    }
  },

  reducers: {
    saveUser(state, action) {
      return {
        ...state,
        user: action.payload || {},
      };
    },
  },
};
