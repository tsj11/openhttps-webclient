import React, { Fragment } from 'react';
import { connect } from 'dva';
import { Form, Radio, Button, Alert } from 'antd';
import { object2FormData } from '@/utils/utils';
// import style1 from './style.less';

const RadioGroup = Radio.Group;
const styles = {
  stepForm: {
    margin: 80,
    maxWidth: 1000,
  },
  radioGroupStyle: {
    marginTop: 10,
    marginBottom: 10,
  },
  radioStyle: {
    display: 'block',
    paddingTop: 20,
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
  validateDNS: createDomain.validateDNS,
  validateDNSInfo: createDomain.validateDNSInfo,
}))
@Form.create()
class VerifyDomainDNS extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      selection: 1,
    };
  }

  getTips = (validateDNS, validateDNSInfo) => {
    if (validateDNS) {
      if (validateDNS === 'validating') {
        return (
          <Button type="primary" loading disabled style={{ width: 210, height: 40}}>
            {validateDNSInfo}
          </Button>
        );
      }
      return (
        <Alert type={validateDNS} message={validateDNSInfo} showIcon style={{ width: 210, height: 40 }} />
      );
    }
    return (
      <Button type="primary" disabled style={{ width: 210, height: 40 }}>
        请选择DNS解析方式
      </Button>
    );
  }

  render() {

    const { dispatch, prepareDomain, validateDNS, validateDNSInfo } = this.props;
    const { selection } = this.state;

    const onChange = (e) => {
      this.setState({
        selection: e.target.value,
      });
    }

    const goBack = () => {
      dispatch({
        type: 'createDomain/clear',
      });
    };

    const validate = () => {
      dispatch({
        type: 'createDomain/updateDNSValidateStatus',
        payload: {
          validateDNS: 'validating',
        },
      });

      const payload = object2FormData({
        bindingType: selection,
      });
      dispatch({
        type: 'createDomain/verifyDomainDNS',
        payload,
      });
    };

    const tip = this.getTips(validateDNS, validateDNSInfo);

    return (
      <Fragment>
        <Form layout="horizontal" className={styles.stepForm}>
          <Form.Item
            {...styles.formItemLayout}
            label="绑定方式"
          >
            <RadioGroup name="radiogroup" onChange={onChange} value={selection} style={styles.radioGroupStyle}>
              <Radio style={styles.radioStyle} value="ip">
                <span>IP方式：</span>
              </Radio>
              <span>将域名{prepareDomain.domain}的AAAA记录指向:
                <span style={{ color: 'red' }}>{prepareDomain.cdnIP}</span>
              </span>
              <Radio style={styles.radioStyle} value="cname">
                CNAME方式：
              </Radio>
              <span>
                将添加{prepareDomain.challengeCdnDomain}的TXT记录:
                <span style={{ color: 'red' }}>{prepareDomain.challengeCdnTXT}</span>
              </span>
            </RadioGroup>
          </Form.Item>
          <Form.Item
            {...styles.formItemLayout}
            label="DNS验证"
          >
            {tip}
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
            <Button type="default" onClick={goBack} style={{ marginRight: 60 }}>
              上一步
            </Button>
            <Button type="primary" onClick={validate}>
              下一步
            </Button>
          </Form.Item>
        </Form>
      </Fragment>
    );
  }
}

export default VerifyDomainDNS;
