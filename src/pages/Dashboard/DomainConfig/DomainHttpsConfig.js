import React, { Fragment } from 'react';
import { connect } from 'dva';
import { Form, Button, Switch, Radio } from 'antd';
import { object2FormData } from '@/utils/utils';

const RadioGroup = Radio.Group;

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
  loading: loading.effects['domains/updateDomain'],
}))
@Form.create()
class DomainHttpsConfig extends React.PureComponent {

  componentDidMount() {
    const { form, domainList, id } = this.props;
    const { setFieldsValue } = form;
    const currentDomain = domainList.filter(value => value.id === id)[0];
    const { httpsForward } = currentDomain;
    setFieldsValue({
      ...httpsForward,
    });
  }

  save() {
    const { form, dispatch, id } = this.props;
    const { validateFields } = form;
    // const currentDomain = domainList.filter(value => value.domainId === id)[0];
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
            label="HSTS"
          >
            {
              getFieldDecorator('hsts')(
                <RadioGroup name="1">
                  <Radio value={1}>当前域</Radio>
                  <Radio value={2}>当前域名及所有子域名</Radio>
                  <Radio value={0}>禁用</Radio>
                </RadioGroup>
              )
            }
          </Form.Item>
          <Form.Item
            {...style.formItemLayout}
            label="浏览器钩子"
          >
            {getFieldDecorator('browserHook', { valuePropName: 'checked' })(<Switch />)}
          </Form.Item>
          <Form.Item
            {...style.formItemLayout}
            label="第三方资源"
          >
            {
              getFieldDecorator('thirdPartyRes')(
                <RadioGroup name="2">
                  <Radio value={1}>集中代理</Radio>
                  <Radio value={2}>强制HTTPS</Radio>
                  <Radio value={0}>不处理</Radio>
                </RadioGroup>
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

export default DomainHttpsConfig;
