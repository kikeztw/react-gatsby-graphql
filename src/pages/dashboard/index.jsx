import React from 'react';
import { Layout, Divider } from 'antd';
import { Redirect } from '@reach/router';
import { Layout as AppLayout } from '~modules';
import WorkSpaceTeam from './components/WorkSpaceTeam';
import WorkSpaceHeader from './components/WorkSpaceHeader';
import Todos from './components/Todos';
import CreateTodo from './components/CreateTodo';

import styles from './css/index.module.css';

const { Content, Header, Sider } = Layout;

export default () => {
  if (!localStorage.getItem('user')) {
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
