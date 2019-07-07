import {
  queryDomains,
  deleteDomain,
  setOrigin,
  setDomainHttpsConfig,
  setDomainWafConfig,
  deployCertificate,
  revokeCertificate
} from '@/services/domain';

export default {
  namespace: 'domains',

  state: {
    domainList: [],
  },

  effects: {

    // 请求用户所管理的 domain 列表
    *fetchDomains({ payload }, { call, put }) {
      const response = yield call(queryDomains, payload);
      yield put({
        type: 'saveDomains',
        payload: response,
      });
    },

    // 删除当前用户指定id的domain
    *deleteDomain({ payload }, { call, put }) {
      const response = yield call(deleteDomain, payload);
      if (response.success) {
        yield put({
          type: 'fetchDomains',
        });
      }
    },

    // 设置指定id的domain源站地址和端口
    *setOrigin({ payload }, { call, put }) {
      const response = yield call(setOrigin, payload);
      if (response.success) {
        yield put({
          type: 'fetchDomains',
        });
      }
    },

    // 为指定id的domain申请证书
    *deployCertificate({ payload }, { call, put }) {
      yield call(deployCertificate, payload);
      yield put({
        type: 'fetchDomains',
      });
    },

    // 为指定id的domain申请证书
    *revokeCertificate({ payload }, { call, put }) {
      yield call(revokeCertificate, payload);
      yield put({
        type: 'fetchDomains',
      });
    },

    *setDomainHttpsConfig({ payload }, { call, put }) {
      yield call(setDomainHttpsConfig, payload);
      yield put({
        type: 'fetchDomains',
        payload: {
        },
      });
    },

    *setDomainWafConfig({ payload }, { call, put }) {
      yield call(setDomainWafConfig, payload);
      yield put({
        type: 'fetchDomains',
        payload: {
        },
      });
    },
  },

  reducers: {

    // 更新redux中的domains列表
    saveDomains(state, action) {
      return {
        ...state,
        domainList: action.payload || [],
      };
    },
  },
};
