import React, { Fragment } from 'react';
import { connect } from 'dva';
import { Button, Steps } from 'antd';
import { object2FormData } from '@/utils/utils';

const { Step } = Steps;

const domainStatusInfo = {
  '00': '未申请',
  '01': '开始申请',
  '02': '已撤销',
  '10': '等待验证',
  '11': '已验证',
  '12': '验证失败',
  '20': '等待下载',
  '21': '已获取',
  '22': '下载失败',
  '23': '限速'
};

const styles = {
  saveBtn: {
    marginLeft: 20,
  },
};
@connect(({ domains, loading }) => ({
  domainList: domains.domainList,
  loading: loading.effects['domains/fetchDomains'],
}))
class DomainCertificateConfig extends React.PureComponent {

  deploy(currentHttpsStep) {
    const { id, dispatch } = this.props;
    const payload = object2FormData({ id });
    if (currentHttpsStep === 2) {
      dispatch({
        type: 'domains/revokeCertificate',
        payload,
      });
    } else {
      dispatch({
        type: 'domains/deployCertificate',
        payload,
      });
    }

  }

  reLoad() {
    const { dispatch } = this.props;
    dispatch({
      type: 'domains/fetchDomains',
    });
  }

  render() {
    // TODO: 关于一场情况的支持，如认证失败、下载限速
    const { domainList, id } = this.props;
    const currentDomain = domainList.filter(value => value.id === id)[0];
    const currentHttpsStep = Math.floor(parseInt(currentDomain.status, 10)/10) || -1;
    return (
      <Fragment>
        <Steps current={currentHttpsStep} style={{margin: 20, width: '85%'}}>
          <Step title="申请" description={currentHttpsStep >= 0 ? '已申请' : '未申请'} />
          <Step title="验证" description={currentHttpsStep >= 1 ? '已验证' : '未验证'} />
          <Step title="部署" description={currentHttpsStep >= 2 ? '已部署' : '未部署'} />
        </Steps>
        <Button type="primary" style={styles.saveBtn} onClick={() => { this.deploy(currentHttpsStep) }}>
          {currentHttpsStep === 2 ? '撤销证书' : '部署证书'}
        </Button>
        <Button type="primary" style={styles.saveBtn} onClick={() => { this.reLoad() }}>
          刷新状态
        </Button>
      </Fragment>
    );
  }
}

export default DomainCertificateConfig;
