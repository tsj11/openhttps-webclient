// 控制 UserInfo 中 Modal 显示状态

export default {
  namespace: 'userInfo',

  state: {
    modalVisible: false,
    imageCaptchaSrc: `/api/framework/session/captcha?t=${new Date().getTime()}`,
  },

  effects: {

  },

  reducers: {
    newImageCaptcha(state) {
      return {
        ...state,
        imageCaptchaSrc: `/api/framework/session/captcha?t=${new Date().getTime()}`,
      };
    },
    setModalState(state, action) {
      return {
        ...state,
        modalVisible: action.payload,
      };
    },
  },
};
