import React, { memo } from 'react';
import { useQuery } from '@apollo/client';
import {
  List, Avatar, Typography,
} from 'antd';
import { GET_TEAM } from '~queries';

const { Title, Text } = Typography;
const { Item } = List;
const { Meta } = Item;


export default memo(() => {
  const { loading, error, data } = useQuery(GET_TEAM);
  return (
    <>
      <Title level={4}>Team</Title>
      {error && (<Text type="danger">Error fetching data</Text>)}
      <List
        loading={loading && !error}
        itemLayout="horizontal"
        dataSource={data && !error ? data.userses : []}
        renderItem={(item) => (
          <Item className="todo-card">
            <Meta
              className="todo-meta"
              avatar={<Avatar src={item.picture.url} size={70} />}
              title={item.name}
              description={`@${item.username}`}
            />
          </Item>
        )}
      />
    </>
  );
});
