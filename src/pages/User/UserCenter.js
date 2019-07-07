import { Card, Tabs, Icon } from 'antd';
import React, { PureComponent } from 'react';
import { connect } from 'dva';
import UserInfo from './UserInfo';
import UserPwd from './UserPwd';

const { TabPane } = Tabs;

const styles = {
  tabs: {
    marginTop: 10,
  },
};

@connect(({ user }) => ({
  user: user.user,
}))
class UserCenter extends PureComponent {

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'user/fetchUser',
    });
  }

  render() {
    return (
      <Card bordered={false}>
        <Tabs defaultActiveKey="1" style={styles.tabs}>
          <TabPane tab={<span><Icon type="home" />基本信息</span>} key="1">
            <UserInfo />
          </TabPane>
          <TabPane tab={<span><Icon type="idcard" />密码重置</span>} key="2">
            <UserPwd />
          </TabPane>
        </Tabs>
      </Card>
    );
  }
}

export default UserCenter;
