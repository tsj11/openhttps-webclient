import { routerRedux } from 'dva/router';
import { stringify } from 'qs';
import { AccountLogin, AccountLogout } from '@/services/api';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
import { reloadAuthorized } from '@/utils/Authorized';

export default {
  namespace: 'login',

  state: {
    status: undefined,
    imageCaptchaSrc: `/api/framework/session/captcha?t=${new Date().getTime()}`,
  },

  effects: {

    *login({ payload }, { call, put }) {
      const response = yield call(AccountLogin, payload);
      yield put({
        type: 'changeLoginStatus',
        payload: {
          currentAuthority: response.roles,
          status: response.success,
        },
      });
      // Login successfully
      // roles: ["user"]
      // success: true
      if (response.success) {
        reloadAuthorized();
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let { redirect } = params;
        if (redirect) {
          const redirectUrlParams = new URL(redirect);
          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);
            if (redirect.startsWith('/#')) {
              redirect = redirect.substr(2);
            }
          } else {
            window.location.href = redirect;
            return;
          }
        }
        yield put(routerRedux.replace(redirect || '/'));
      }
    },

    *logout(_, { call, put }) {
      yield call(AccountLogout);
      yield put({
        type: 'changeLoginStatus',
        payload: {
          status: false,
          currentAuthority: 'guest',
        },
      });
      reloadAuthorized();
      yield put(
        routerRedux.push({
          pathname: '/user/login',
          search: stringify({
            redirect: window.location.href,
          }),
        })
      );
    },
  },

  reducers: {
    newImageCaptcha(state) {
      return {
        ...state,
        imageCaptchaSrc: `/api/framework/session/captcha?t=${new Date().getTime()}`,
      };
    },
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.currentAuthority);
      return {
        ...state,
        status: payload.status,
        // type: payload.type,
      };
    },
  },
};
