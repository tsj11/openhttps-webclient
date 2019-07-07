import React, { Fragment } from 'react';
import { connect } from 'dva';
import { Form, Input, Button, InputNumber } from 'antd';
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

@connect(({ domains, loading }) => ({
  domainList: domains.domainList,
  loading: loading.effects['domains/setOrigin'],
}))
@Form.create()
class DomainOriginConfig extends React.PureComponent {

  componentDidMount() {
    const { form, domainList, id } = this.props;
    const { setFieldsValue } = form;
    const currentDomain = domainList.filter(value => value.id === id)[0];
    setFieldsValue({
      targetIP: currentDomain.targetIP,
      targetPort: currentDomain.targetPort,
    });
  }

  save() {
    const { form, dispatch, id } = this.props;
    const { validateFields } = form;
    validateFields((err, values) => {
      if (!err) {
        const payload = object2FormData({
          id,
          targetIP: values.targetIP,
          targetPort: values.targetPort,
        });
        dispatch({
          type: 'domains/setOrigin',
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
            label="源站地址"
            hasFeedback
          >
            {
              getFieldDecorator('targetIP', {
                rules: [
                  { required: true, message: '源站地址不能为空' },
                ],
              })(
                <Input placeholder="请输入源站地址" style={{ width: 400 }} />
              )
            }
          </Form.Item>
          <Form.Item
            {...style.formItemLayout}
            label="源站端口"
            hasFeedback
          >
            {
              getFieldDecorator('targetPort', {
                rules: [
                  { required: true, message: '端口不能为空' },
                ],
              })(
                <InputNumber min={0} max={65536} />
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

export default DomainOriginConfig;
