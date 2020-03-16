/* eslint-disable react/prop-types */
import React from 'react';
import { Layout } from 'antd';
import 'antd/dist/antd.css';
import '../../css/global.css';
import style from './css/index.module.css';

const { Content } = Layout;

export default ({ children }) => (
  <Layout className={style.layout_container}>
    <Content className={style.layout_content}>
      {children}
    </Content>
  </Layout>
);
