import React, { Component } from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
import { Checkbox, Alert } from 'antd';
import Login from '@/components/Login';
import { object2FormData } from '@/utils/utils';
import styles from './Login.less';

const { Tab, UserName, Password, ImageCaptcha, Submit } = Login;

@connect(({ login, loading }) => ({
  login,
  submitting: loading.effects['login/login'],
}))
class LoginPage extends Component {
  state = {
    type: 'account',
    autoLogin: true,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'login/newImageCaptcha',
    });
  }

  onTabChange = type => {
    this.setState({ type });
  };

  // onGetCaptcha = () =>
  //   new Promise((resolve, reject) => {
  //     this.loginForm.validateFields(['mobile'], {}, (err, values) => {
  //       if (err) {
  //         reject(err);
  //       } else {
  //         const { dispatch } = this.props;
  //         dispatch({
  //           type: 'login/getCaptcha',
  //           payload: values.mobile,
  //         })
  //           .then(resolve)
  //           .catch(reject);
  //       }
  //     });
  //   });

  changeImageCaptcha = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'login/newImageCaptcha',
    });
  }

  handleSubmit = (err, values) => {
    if (!err) {
      const { dispatch } = this.props;
      const payload = object2FormData({
        ...values,
      });
      dispatch({
        type: 'login/login',
        payload,
      });
    }
  };

  changeAutoLogin = e => {
    this.setState({
      autoLogin: e.target.checked,
    });
  };

  renderMessage = content => (
    <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon />
  );

  render() {
    const { login, submitting } = this.props;
    const { type, autoLogin } = this.state;

    return (
      <div className={styles.main}>
        <Login
          defaultActiveKey={type}
          onTabChange={this.onTabChange}
          onSubmit={this.handleSubmit}
          ref={form => {
            this.loginForm = form;
          }}
        >
          <Tab key="account" tab="账户密码登录">
            {login.status === 'error' &&
              login.type === 'account' &&
              !submitting &&
              this.renderMessage('账户或密码错误')}
            <UserName name="account" />
            <Password
              name="password"
            />
            <ImageCaptcha
              name="captcha"
              captcha={login.imageCaptchaSrc}
              changeImageCaptcha={() => { this.changeImageCaptcha() }}
              onPressEnter={() => this.loginForm.validateFields(this.handleSubmit)}
            />
          </Tab>
          {/* <Tab key="mobile" tab="手机号登录">
            {login.status === 'error' &&
              login.type === 'mobile' &&
              !submitting &&
              this.renderMessage('验证码错误')}
            <Mobile name="mobile" />
            <Captcha name="captcha" countDown={120} onGetCaptcha={this.onGetCaptcha} />
          </Tab> */}
          {/* <div>
            <Checkbox checked={autoLogin} onChange={this.changeAutoLogin}>
              自动登录
            </Checkbox>

          </div> */}
          <Submit loading={submitting}>登录</Submit>
          <div className={styles.other}>
            <a style={{ float: 'left' }} href="">
              忘记密码
            </a>
            {/* <Icon type="alipay-circle" className={styles.icon} theme="outlined" /> */}
            <Link className={styles.register} to="/User/Register">
              注册账户
            </Link>
          </div>
        </Login>
      </div>
    );
  }
}

export default LoginPage;
