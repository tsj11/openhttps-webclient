/* eslint-disable no-underscore-dangle */
import { prepareDomain, verifyDomainDNS } from '@/services/domain';
import { message } from 'antd';

const initialState = {

  // step: 步骤序号
  step: 0,

  prepareDomain: {
    // 服务器所返回的数据格式
    domainId: undefined,
    domain: undefined,
    cdnCNAME: undefined,
    cdnIP: undefined,
    challengeCdnDomain: undefined,
    challengeCdnTXT: undefined,
    status: undefined,
  },

  // 域名验证状态
  validateStatus: null,
  // 域名验证状态所对应的提示信息
  validateInfo: null,

  // dns解析验证状态
  validateDNS: null,
  // dns验证状态提示
  validateDNSInfo: null,

};

export default {
  namespace: 'createDomain',

  state: initialState,

  effects: {

    *prepareDomain({ payload }, { call, put }) {
      const response = yield call(prepareDomain, payload);
      if (response.level === 'ERROR') {
        message(response.__error__);
        yield put({
          type: 'updateDomainValidateStatus',
          payload: {
            validateStatus: 'error',
            __error__: response.__error__,
          },
        });
      } else {
        yield put({
          type: 'updatePrepareDomain',
          payload: response,
        });
        yield put({
          type: 'updateDomainValidateStatus',
          payload: {
            validateStatus: 'success',
          },
        });
      }
    },

    *verifyDomainDNS({ payload }, { call, put }) {
      const response = yield call(verifyDomainDNS, payload);

      if (response.level === 'ERROR') {
        yield put({
          type: 'updateDNSValidateStatus',
          payload: {
            validateDNS: 'error',
            __error__: response.__error__,
          },
        });
      } else {
        yield put({
          type: 'updatePrepareDomain',
          payload: response,
        });
        yield put({
          type: 'domains/fetchDomains',
          payload: {},
        });
        yield put({
          type: 'updateDNSValidateStatus',
          payload: {
            validateDNS: 'success',
          },
        });
      }
    },
  },

  reducers: {

    // 更新 prepareDomain
    updatePrepareDomain(state, action) {
      return {
        ...state,
        prepareDomain: action.payload,
      };
    },

    // 更新域名验证状态
    updateDomainValidateStatus(state, action) {
      const info = {
        'validating': '域名验证中',
        'error': '域名验证失败',
        'success': '域名验证成功',
      };
      return {
        ...state,
        validateStatus: action.payload.validateStatus,
        validateInfo: action.payload.__error__ || info[action.payload.validateStatus],
        step: action.payload.validateStatus === 'success' ? 1 : 0,
      };
    },

    // 更新DNS验证状态
    updateDNSValidateStatus(state, action) {
      const info = {
        'validating': 'DNS验证中',
        'error': 'DNS验证失败',
        'success': 'DNS验证成功',
      };
      return {
        ...state,
        validateDNS: action.payload.validateDNS,
        validateDNSInfo: action.payload.__error__ || info[action.payload.validateDNS],
        step: action.payload.validateDNS === 'success' ? 2 : 1,
      };
    },

    // 还原初始状态
    clear() {
      return initialState;
    }
  },
};
