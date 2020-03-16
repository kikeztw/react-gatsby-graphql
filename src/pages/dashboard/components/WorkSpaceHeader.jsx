import React, { memo, useEffect, useState } from 'react';
import { Typography, Avatar,  Menu, Dropdown } from 'antd';
import styles from '../css/index.module.css';
import { navigate } from 'gatsby';
import { UserSwitchOutlined, LoginOutlined } from '@ant-design/icons';


const { Text } = Typography;

const onSwitch = () => {
  localStorage.removeItem("user");
  navigate("/");
}

const menu = (
  <Menu >
    <Menu.Item onClick={onSwitch}>
      <UserSwitchOutlined style={{ fontSize: 20, color: "#000", marginRight: 5}}/>
      Change user
    </Menu.Item>
    <Menu.Item onClick={onSwitch}>
      <LoginOutlined style={{ fontSize: 20, color: "#000", marginRight: 5}}/>
      log out
    </Menu.Item>
  </Menu>
);

export default memo(() => {
  const [data, setData] = useState({});
  useEffect(() => {
    if(localStorage.getItem('user')){
      setData(JSON.parse(localStorage.getItem('user')))
    }
  }, [])

  if(!Object.values(data).length) return null;

  return (
      <div className={styles.workspace_header}>
        <Text className={styles.header_title}>WorkSpace</Text>
        <div>
          <Dropdown overlay={menu}>
            <div>
              <Text className={styles.avatar_name}>{data?.name}</Text>
              <Avatar size={40} src={data?.picture.url} />
            </div>
          </Dropdown>
        </div>
      </div>
  );
});
