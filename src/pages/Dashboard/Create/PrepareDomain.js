import React, { Fragment } from 'react';
import { connect } from 'dva';
import { Form, Input, Button } from 'antd';
import router from 'umi/router';
import { object2FormData } from '@/utils/utils';
// import style from './style.less';

const styles = {
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
  validateStatus: createDomain.validateStatus,
  validateInfo: createDomain.validateInfo,
}))
@Form.create()
class PrepareDomain extends React.PureComponent {

  render() {

    const { form, dispatch, validateStatus, validateInfo } = this.props;
    const { getFieldDecorator, validateFields } = form;

    const onCancel = () => {
      dispatch({
        type: 'createDomain/clear',
      });
      router.push('/dashboard/domainmanager/domains');
    };

    const validateInput = () => {
      validateFields((err, values) => {
        if (!err) {
          // 1. 更改页面提示信息为 '验证中'
          // 2. 请求后端检查域名是否可用
          dispatch({
            type: 'createDomain/updateDomainValidateStatus',
            payload: {
              validateStatus: 'validating',
            },
          });

          const payload = object2FormData({
            domain: values.domain,
          });
          dispatch({
            type: 'createDomain/prepareDomain',
            payload,
          });
        }
      });
    };

    return (
      <Fragment>
        <Form layout="horizontal" className={styles.stepForm}>
          <Form.Item
            {...styles.formItemLayout}
            label="域名"
            hasFeedback
            validateStatus={validateStatus}
            help={validateInfo}
          >
            {getFieldDecorator('domain', {
              rules: [
                { required: true, message: '请输入域名' },
              ],
            })(<Input placeholder="请输入域名" style={styles.input} />)}
          </Form.Item>
          <Form.Item
            wrapperCol={{
              xs: { span: 24, offset: 0 },
              sm: {
                span: styles.formItemLayout.wrapperCol.span,
                offset: styles.formItemLayout.labelCol.span,
              },
            }}
            label=""
          >
            <Button type="default" onClick={onCancel} style={{ marginRight: 60 }}>
              取消
            </Button>
            <Button type="primary" onClick={validateInput}>
              下一步
            </Button>
          </Form.Item>
        </Form>
      </Fragment>
    );
  }
}

export default PrepareDomain;
