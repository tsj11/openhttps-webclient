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

@connect(({ sync, loading }) => ({
  syncData: sync.syncData,
  loading: loading.effects['sync/fetchSync'],
}))
class Synctask extends PureComponent {

  componentDidMount() {
    const { dispatch, userId } = this.props;
    dispatch({
      type: 'sync/fetchSync',
      payload: {
        userId,
      },
    });
  }

  createSync = () => {
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

  editSync = syncId => {
    // router.push(`/dashboard/ctmanager/config/${syncId}`);
  }

  render() {
    const { syncData, loading } = this.props;
    return (
      <Card bordered={false}>
        <div style={styles.funcAreaContainer}>
          <div style={styles.buttonContainer}>
            <Button shape="circle" icon="plus" onClick={() => { this.createSync() }} />
            <Button shape="circle" icon="reload" onClick={() => { this.reload() }} />
          </div>
          <Search placeholder="输入关键字" onSearch={value => this.onSearch(value)} style={styles.inputSearch} />
        </div>
        <Table dataSource={syncData} loading={loading} rowKey="syncId">
          <Column
            title="Log Server"
            dataIndex="logServer"
            key="logServer"
          />
          <Column
            title="已同步"
            dataIndex="synchronized"
            key="synchronized"
          />
          <Column
            title="同步状态"
            dataIndex="syncState"
            key="syncState"
          />
          <Column
            title="已入库"
            dataIndex="saved"
            key="saved"
          />
          <Column
            title="上次同步时间"
            dataIndex="lastSyncTime"
            key="lastSyncTime"
          />
          <Column
            title="间隔"
            dataIndex="interval"
            key="interval"
          />
          <Column
            title="操作"
            key="action"
            render={(item) => (
              <span>
                <Button
                  icon="setting"
                  style={styles.inlineIcon}
                  onClick={() => { this.editSync(item.syncId) }}
                />
              </span>
            )}
          />
        </Table>
      </Card>
    );
  }
}

export default Synctask;
