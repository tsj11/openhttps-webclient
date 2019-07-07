import { Table, Button, Input, Popconfirm, Card } from 'antd';
import React, { PureComponent } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import { object2FormData } from '@/utils/utils';

const { Column } = Table;
const { Search } = Input;

// 域名status编号与状态对应表
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

// 页面元素所用样式
const styles = {
  funcAreaContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    width: 70,
  },
  inputSearch: {
    width: 200,
  },
  inlineIcon: {
    marginRight: 4,
  }
};

@connect(({ domains, loading }) => ({
  domainList: domains.domainList || [],
  loading: loading.effects['domains/fetchDomains'],
}))
class Domains extends PureComponent {

  componentDidMount() {
    const { dispatch } = this.props;
    const payload = object2FormData({
      size: 3,
    });
    dispatch({
      type: 'domains/fetchDomains',
      payload,
    });
  }

  createDomain = () => {
    router.push('/dashboard/domainmanager/create');
  }

  reload = () => {
    const { dispatch } = this.props;
    const payload = object2FormData({
      size: 3,
    });
    dispatch({
      type: 'domains/fetchDomains',
      payload,
    });
  }

  onSearch = (value) => {
    // TODO: 搜索
    console.log("onSearch:", value);
  }

  deleteDomain = id => {
    const { dispatch } = this.props;
    const payload = object2FormData({ id });
    dispatch({
      type: 'domains/deleteDomain',
      payload,
    });
  }

  editDomain = id => {
    router.push(`/dashboard/domainmanager/config/${id}`);
  }

  render() {
    const { domainList, loading } = this.props;

    // 将status编号转换成文字信息
    domainList.forEach((domain, index) => {
      domainList[index].https = domainStatusInfo[domain.status]
    });

    return (
      <Card bordered={false}>
        <div style={styles.funcAreaContainer}>
          <div style={styles.buttonContainer}>
            <Button shape="circle" icon="plus" onClick={() => { this.createDomain() }} />
            <Button shape="circle" icon="reload" onClick={() => { this.reload() }} />
          </div>
          <Search placeholder="输入关键字" onSearch={value => this.onSearch(value)} style={styles.inputSearch} />
        </div>
        <Table dataSource={domainList} loading={loading} rowKey="id">
          <Column title="域名" dataIndex="domain" key="domain" />
          <Column title="CNAME" dataIndex="cname" key="cname" />
          <Column title="源站地址" dataIndex="targetIP" key="targetIP" />
          <Column title="端口" dataIndex="targetPort" key="targetPort" />
          <Column title="HTTPS证书" dataIndex="https" key="https" />
          <Column
            title="操作"
            key="action"
            render={(item) => (
              <span>
                <Button
                  icon="setting"
                  style={styles.inlineIcon}
                  onClick={() => { this.editDomain(item.id) }}
                />
                <Popconfirm
                  title="确定删除域名？"
                  onConfirm={() => { this.deleteDomain(item.id) }}
                  onCancel={() => { }}
                  okText="确定"
                  cancelText="取消"
                >
                  <Button
                    icon="delete"
                    style={styles.inlineIcon}
                  />
                </Popconfirm>
              </span>
            )}
          />
        </Table>
      </Card>
    );
  }
}

export default Domains;
