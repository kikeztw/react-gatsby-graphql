import React, { memo, useCallback, useState, useEffect } from 'react';
import {
  Menu, Dropdown, Spin, Avatar, Typography,
} from 'antd';
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import { useQuery } from '@apollo/client';
import { GET_TEAM } from '~queries';
import styles from '../css/index.module.css';

const { Text, Title } = Typography;
const { Item } = Menu;
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

export default memo(({ onUserSelect, onUserRemove, isResect }) => {
  const { loading, error, data } = useQuery(GET_TEAM);
  const [onSelect, setSelect] = useState([]);

  useEffect(() => {
    if(isResect){
      setSelect([]);
    }
  }, [isResect])

  const onPickUser = useCallback((item) => () => {
    setSelect((state) => [...state, item]);
    onUserSelect?.(item.id);
  }, [onSelect.length]);

  const onRemove = useCallback((item) => () => {
    setSelect(state => state.filter( e => e.id !== item.id));
    onUserRemove?.(item.id);
  }, [onSelect.length]);

  const menu = (
    <Menu>
      <Item disabled key={0} style={{ minWidth: 250 }}>
        <Title level={4}>Team</Title>
      </Item>
      { data && data.userses.filter((e, i) => e.id !== onSelect[i]?.id).map((e) => (
        <Item key={e.id} onClick={onPickUser(e)} className={styles.team_picker_item}>
          <Avatar src={e.picture.url} size={45} />
          <Text className={styles.team_picker_item_text}>{`${e.name} (@${e.username})`}</Text>
        </Item>
      ))}
    </Menu>
  );

  return (
    <div className={styles.team_picker_container}>
      <Title style={{ width: '100%', color: '#000', fontSize: 14, fontWeight: 300}}>Assing Todo</Title>
      <Spin indicator={antIcon} spinning={loading && !error}>
        <Dropdown trigger={['click']} overlay={menu}>
          <span className={styles.team_picker_icon_plus}>
            <PlusOutlined style={{ color: '#000' }} />
          </span>
        </Dropdown>
      </Spin>
      <ul className={styles.team_picker_on_select_container}>
        {onSelect.map((e) => (
          <li 
            onClick={onRemove(e)} 
            key={e.id} 
            className={styles.team_picker_on_select_item}
          >
            <Avatar src={e.picture.url} size={35} />
          </li>
        ))}
      </ul>
    </div>

  );
});
