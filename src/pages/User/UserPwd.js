
import React, { Fragment } from 'react';
import { connect } from 'dva';
import { Form, Input, Button } from 'antd';
import { object2FormData } from '@/utils/utils';

const style = {
  formItemLayout: {
    labelCol: {
      span: 2,
    },
    wrapperCol: {
      span: 19,
    },
  },
};

@connect(({ user, loading }) => ({
  user: user.user,
  loading: loading.effects['user/changePassword'],
}))
@Form.create()
class UserPwd extends React.PureComponent {

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('newPassword')) {
      callback('两次输入的密码不一致');
    } else {
      callback();
    }
  }

  save() {
    const { form, dispatch, user } = this.props;
    const { validateFields } = form;

    validateFields((err, values) => {
      if (!err) {
        const payload = object2FormData({
          ...values,
          id: user.id,
        });
        dispatch({
          type: 'user/changePassword',
          payload,
        });
      }
    });
  }

  render() {

    const { form, loading } = this.props;
    const { getFieldDecorator } = form;

    return (
      <Fragment>
        <Form layout="horizontal">
          <Form.Item
            {...style.formItemLayout}
            label="当前的密码"
            hasFeedback
          >
            {
              getFieldDecorator('currentPassword', {
                rules: [
                  { required: true, message: '当前密码不能为空' },
                ],
              })(
                <Input type="password" placeholder="当前密码" style={{ width: 400 }} />
              )
            }
          </Form.Item>
          <Form.Item
            {...style.formItemLayout}
            label="输入新密码"
            hasFeedback
          >
            {
              getFieldDecorator('newPassword', {
                rules: [
                  { required: true, message: '新密码不能为空' },
                ],
              })(
                <Input type="password" placeholder="新密码" style={{ width: 400 }} />
              )
            }
          </Form.Item>
          <Form.Item
            {...style.formItemLayout}
            label="确认新密码"
            hasFeedback
          >
            {
              getFieldDecorator('newPassword2', {
                rules: [
                  { required: true, message: '两次输入的密码不一致' },
                  { validator: this.compareToFirstPassword, }
                ],
              })(
                <Input type="password" placeholder="再次输入新密码" style={{ width: 400 }} />
              )
            }
          </Form.Item>
          <Form.Item
            wrapperCol={{
              xs: { span: 24, offset: 0 },
              sm: {
                span: style.formItemLayout.wrapperCol.span,
                offset: style.formItemLayout.labelCol.span,
              },
            }}
            label=""
          >
            <Button
              type="primary"
              onClick={() => { this.save() }}
              style={{ marginRight: 60 }}
              loading={loading}
            >
              保存
            </Button>
          </Form.Item>
        </Form>
      </Fragment>
    );
  }
}

export default UserPwd;
