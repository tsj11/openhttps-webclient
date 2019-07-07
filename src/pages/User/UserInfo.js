import React, { Fragment } from 'react';
import { connect } from 'dva';
import { Form, Input, Button, Modal } from 'antd';
import { object2FormData } from '@/utils/utils';

const style = {
  formItemLayout: {
    labelCol: {
      span: 2,
    },
  },
};

@connect(({ user, userInfo, loading }) => ({
  user: user.user,
  userInfo,
  confirmLoading: loading.effects['user/updateUser'],
}))
@Form.create()
class AccountInfo extends React.PureComponent {

  state = {
    newEmail: undefined,
    captcha: undefined,
  };

  showModal = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'userInfo/setModalState',
      payload: true,
    });
  }

  getNewEmail = (e) => {
    this.setState({
      newEmail: e.target.value,
    });
  }

  getCaptcha = (e) => {
    this.setState({
      captcha: e.target.value,
    });
  }

  changeImageCaptcha = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'userInfo/newImageCaptcha',
    });
  }

  handleOk = () => {
    const { dispatch } = this.props;
    const { newEmail, captcha } = this.state;
    const payload = object2FormData({
      newEmail,
      captcha,
    });
    dispatch({
      type: 'user/changeEmail',
      payload,
    });
  }

  handleCancel = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'userInfo/setModalState',
      payload: false,
    });
  }

  render() {
    const { user, userInfo, confirmLoading } = this.props;

    const ModalInput = (
      <div>
        <Input placeholder="新邮箱地址" style={{ width: 400, marginBottom: 10 }} onChange={this.getNewEmail} />
        <span>
          <Input placeholder="验证码" style={{ width: 200 }} onChange={this.getCaptcha} />
          <span onClick={this.changeImageCaptcha}>
            <img alt="验证码" style={{ width: 80, height: 30, marginLeft: 10 }} src={userInfo.imageCaptchaSrc} />
          </span>
        </span>
      </div>
    );

    return (
      <Fragment>
        <Form layout="horizontal">
          <Form.Item
            {...style.formItemLayout}
            label="邮箱地址"
            hasFeedback
          >
            <Input style={{ width: 250 }} value={user.email} disabled />
            <Button onClick={this.showModal} icon="edit" style={{ marginLeft: 5 }} />
            <Modal
              title="修改邮箱"
              visible={userInfo.modalVisible}
              okText="验证"
              onOk={this.handleOk}
              onCancel={this.handleCancel}
              confirmLoading={confirmLoading}
              destroyOnClose
              maskClosable={false}
            >
              {ModalInput}
            </Modal>
          </Form.Item>
          {/* <Form.Item
            {...style.formItemLayout}
            label="手机号码"
            hasFeedback
          >
            <Input style={{ width: 250 }} value={user.phone} disabled />
            <Button onClick={this.showModal} icon="edit" style={{ marginLeft: 5 }} />
            <Modal
              title="修改手机"
              visible={visible}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
              destroyOnClose
            >
              <p>ceshi</p>
            </Modal>
          </Form.Item> */}
        </Form>
      </Fragment>
    );
  }
}

export default AccountInfo;
