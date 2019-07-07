import React, { Fragment } from 'react';
import { connect } from 'dva';
import { Form, Input, Button, InputNumber } from 'antd';
import router from 'umi/router';
import { object2FormData } from '@/utils/utils';
// import styles from './style.less';

const style = {
  stepForm: {
    margin: 80,
    maxWidth: 1000,
  },
  input: {
    width: 400,
  },
  formItemLayout: {
    labelCol: {
      span: 5,
    },
    wrapperCol: {
      span: 19,
    },
  },
};

@connect(({ createDomain }) => ({
  prepareDomain: createDomain.prepareDomain,
}))
@Form.create()
class SetOrigin extends React.PureComponent {

  render() {

    const { form, dispatch, prepareDomain } = this.props;
    const { getFieldDecorator, validateFields } = form;

    const finish = () => {
      validateFields((err, values) => {
        if (!err) {
          const payload = object2FormData({
            id: prepareDomain.domainId,
            targetIP: values.targetIP,
            targetPort: values.targetPort,
          });
          dispatch({
            type: 'domains/setOrigin',
            payload,
          });
          router.push('/dashboard/domainmanager/domains');
          dispatch({
            type: 'createDomain/clear',
          });
        }
      });
    };

    return (
      <Fragment>
        <Form layout="horizontal" className={style.stepForm}>
          <Form.Item
            {...style.formItemLayout}
            label="源站地址"
            hasFeedback
          >
            {getFieldDecorator('targetIP', {
              rules: [
                { required: true, message: '源站地址不能为空' },
              ],
            })(<Input placeholder="请输入源站地址" style={style.input} />)}
          </Form.Item>
          <Form.Item
            {...style.formItemLayout}
            label="源站端口"
            hasFeedback
          >
            {getFieldDecorator('targetPort', {
              rules: [
                { required: true, message: '端口不能为空' },
              ],
            })(<InputNumber min={0} max={65536} />)}
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
            <Button type="primary" onClick={finish}>
              完成
            </Button>
          </Form.Item>
        </Form>
      </Fragment>
    );
  }
}

export default SetOrigin;
