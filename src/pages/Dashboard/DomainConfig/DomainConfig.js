import { Button, Card, Tabs, Icon } from 'antd';
import React, { PureComponent } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import DomainOriginConfig from './DomainOriginConfig';
import DomainCertificateConfig from './DomainCertificateConfig';
import DomainHttpsConfig from './DomainHttpsConfig';
import DomainWafConfig from './DomainWafConfig';

const { TabPane } = Tabs;

// 页面元素所用样式
const styles = {
  goBackBtn: {
    marginRight: 20,
  },
  tabs: {
    marginTop: 10,
  },
};

@connect(({ domains }) => ({
  domainList: domains.domainList,
}))
class Config extends PureComponent {

  render() {
    const { match, domainList } = this.props;
    const { params } = match;
    const domainId = parseInt(params.id, 10);
    const currentDomain = domainList.filter(value => value.id === domainId)[0];

    const goBack = () => {
      router.push('/dashboard/domainmanager/domains');
    }

    return (
      <Card bordered={false}>
        <div>
          <Button shape="circle" size="small" onClick={goBack} style={styles.goBackBtn}>
            <Icon type="left" />
          </Button>

          配置域名：{currentDomain.domain}
        </div>
        <Tabs defaultActiveKey="1" style={styles.tabs}>
          <TabPane tab={<span><Icon type="home" />源站</span>} key="1">
            <DomainOriginConfig id={domainId} />
          </TabPane>
          <TabPane tab={<span><Icon type="idcard" />证书</span>} key="2">
            <DomainCertificateConfig id={domainId} />
          </TabPane>
          <TabPane tab={<span><Icon type="interation" />HTTPS转发</span>} key="3">
            <DomainHttpsConfig id={domainId} />
          </TabPane>
          <TabPane tab={<span><Icon type="safety" />WAF</span>} key="4">
            <DomainWafConfig id={domainId} />
          </TabPane>
        </Tabs>,
      </Card>
    );
  }
}

export default Config;

