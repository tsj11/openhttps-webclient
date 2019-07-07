import { Table, Button, Input, Card } from 'antd';
import React, { PureComponent } from 'react';
import { connect } from 'dva';
import router from 'umi/router';

const { Column } = Table;
const { Search } = Input;

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

@connect(({ edge, loading }) => ({
  edgeData: edge.edgeData,
  loading: loading.effects['edge/fetchEdge'],
}))
class Edgetask extends PureComponent {

  componentDidMount() {
    const { dispatch, userId } = this.props;
    dispatch({
      type: 'edge/fetchEdge',
      payload: {
        userId,
      },
    });
  }

  createEdge = () => {
    // router.push('/dashboard/domainmanager/create');
  }

  reload = () => {
    // const { dispatch, userId } = this.props;
    // dispatch({
    //   type: 'domains/fetchDomains',
    //   payload: {
    //     userId,
    //   },
    // });
  }

  onSearch = (value) => {
    // TODO: 搜索
    console.log("onSearch:", value);
  }

  render() {
    const { edgeData, loading } = this.props;
    return (
      <Card bordered={false}>
        <div style={styles.funcAreaContainer}>
          <div style={styles.buttonContainer}>
            <Button shape="circle" icon="plus" onClick={() => { this.createEdge() }} />
            <Button shape="circle" icon="reload" onClick={() => { this.reload() }} />
          </div>
          <Search placeholder="输入关键字" onSearch={value => this.onSearch(value)} style={styles.inputSearch} />
        </div>
        <Table dataSource={edgeData} loading={loading} rowKey="edgeId">
          <Column
            title="IP"
            dataIndex="ip"
            key="ip"
          />
          <Column
            title="控制端口"
            dataIndex="port"
            key="port"
          />
          <Column
            title="备注"
            dataIndex="comment"
            key="comment"
          />
          <Column
            title="状态"
            dataIndex="state"
            key="state"
          />
          <Column
            title="同步时间"
            dataIndex="syncTime"
            key="syncTime"
          />
          <Column
            title="启用"
            dataIndex="using"
            key="using"
          />
        </Table>
      </Card>
    );
  }
}

export default Edgetask;
