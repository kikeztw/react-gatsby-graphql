import React, { useState, useEffect } from 'react';
import { Layout, Divider, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { Redirect } from '@reach/router';
import { Layout as AppLayout } from '~modules';
import WorkSpaceTeam from './components/WorkSpaceTeam';
import WorkSpaceHeader from './components/WorkSpaceHeader';
import Todos from './components/Todos';
import CreateTodo from './components/CreateTodo';

import styles from './css/index.module.css';

const { Content, Header, Sider } = Layout;
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;


export default () => {
  const [loading, setLoading] = useState(true);
  const [isUserLogin, setIsUserLogin] = useState(false);

  useEffect(() => {
    const checkUser = () => {
      if (localStorage) {
        setIsUserLogin(!localStorage.getItem('user'));
        setLoading(false);
      }
    };
    checkUser();
  }, []);

  if (loading && !isUserLogin) {
    return (
      <Spin
        style={{
          display: 'flex',
          height: '100vh',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
        indicator={antIcon}
        tip="loading"
      />
    );
  }

  if (isUserLogin && !loading) {
    return <Redirect to="/" />;
  }

  return (
    <AppLayout>
      <Header className={styles.dashboard_header}>
        <WorkSpaceHeader />
      </Header>
      <Layout className={styles.dashboard_layout} hasSider>
        <Sider
          width={350}
          className={styles.dashboard_background}
        >
          <div className={styles.team_container}>
            <CreateTodo />
            <Divider />
            <WorkSpaceTeam />
          </div>
        </Sider>
        <Layout className={styles.dashboard_background}>
          <Content style={{ maxHeight: '90vh', overflowY: 'scroll' }}>
            <Todos />
          </Content>
        </Layout>
      </Layout>
    </AppLayout>
  );
};
