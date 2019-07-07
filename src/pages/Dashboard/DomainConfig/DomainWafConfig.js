import React, { Fragment } from 'react';
import { connect } from 'dva';
import { Form, Button, Switch } from 'antd';
import { object2FormData } from '@/utils/utils';

const style = {
  formItemLayout: {
    labelCol: {
      span: 3,
    },
    wrapperCol: {
      span: 19,
    },
  },
};

@connect(({ domains, loading }) => ({
  domainList: domains.domainList,
  loading: loading.effects['domains/updateDomain'],
}))
@Form.create()
class DomainWafConfig extends React.PureComponent {

  componentDidMount() {
    const { form, domainList, id } = this.props;
    const { setFieldsValue } = form;
    const currentDomain = domainList.filter(value => value.id === id)[0];
    const { waf } = currentDomain;
    setFieldsValue({
      ...waf,
    });
  }

  save() {
    const { form, dispatch, id } = this.props;
    const { validateFields } = form;
    validateFields((err, values) => {
      if (!err) {
        const payload = object2FormData({
          id,
          ...values,
        });
        dispatch({
          type: 'domains/updateDomain',
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
            label="Cookie Shadowing"
          >
            {getFieldDecorator('cookieShadowing', { valuePropName: 'checked' })(<Switch />)}
          </Form.Item>
          <Form.Item
            {...style.formItemLayout}
            label="SQL注入"
          >
            {getFieldDecorator('sqlInjection', { valuePropName: 'checked' })(<Switch />)}
          </Form.Item>
          <Form.Item
            {...style.formItemLayout}
            label="跨站攻击"
          >
            {getFieldDecorator('xss', { valuePropName: 'checked' })(<Switch />)}
          </Form.Item>
          <Form.Item
            {...style.formItemLayout}
            label="CSRF"
          >
            {getFieldDecorator('csrf', { valuePropName: 'checked' })(<Switch />)}
          </Form.Item>
          <Form.Item
            {...style.formItemLayout}
            label="Response Splitting"
          >
            {getFieldDecorator('responseSplitting', { valuePropName: 'checked' })(<Switch />)}
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

export default DomainWafConfig;
