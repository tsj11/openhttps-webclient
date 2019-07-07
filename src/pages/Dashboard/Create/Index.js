import React, { PureComponent, Fragment } from 'react';
import { Card, Steps } from 'antd';
import { connect } from 'dva';
import styles from './style.less';
import PrepareDomain from './PrepareDomain';
import VerifyDomainDNS from './VerifyDomainDNS';
import SetOrigin from './SetOrigin';

const { Step } = Steps;
const createSteps = [<PrepareDomain />, <VerifyDomainDNS />, <SetOrigin />];

@connect(({ createDomain }) => ({
  formStatus: createDomain,
}))
class Create extends PureComponent {

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'createDomain/clear',
    });
  }

  render() {
    const { formStatus } = this.props;
    const stepNumber = formStatus.step;

    return (
      <Card bordered={false}>
        <Fragment>
          <Steps current={stepNumber} className={styles.steps}>
            <Step title="添加域名" />
            <Step title="DNS验证" />
            <Step title="配置源站" />
          </Steps>
          {createSteps[stepNumber]}
        </Fragment>
      </Card>
    );
  }
}

export default Create;
