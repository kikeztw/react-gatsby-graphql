import React, { memo } from 'react';
import {
  Row, Col, Avatar, List, Typography, Button
} from 'antd';
import { useQuery } from '@apollo/client';
import { GET_TODOS } from '~queries';
import styles from '../css/index.module.css';

const { Text } = Typography;
const { Item } = List;
const { Meta } = Item;


export default memo(() => {
  const { loading, error, data } = useQuery(GET_TODOS, {
    pollInterval: 500,
  });

  return (
    <div className={styles.todos_container}>
      <Row type="flex" justify="center">
        <Col sm={14} lg={12} xxl={10}>
          {error && (<Text type="danger">Error fetching data</Text>)}
          <List
            loading={loading && !error}
            dataSource={data && !error ? data.todoes : []}
            renderItem={(item) => (
              <Item className="todo-card">
                <span className={styles.todo_body}>
                  <Meta
                    className="todo-meta"
                    title={item.name}
                    description={item.description}
                  />
                  <div className={styles.todos_footer}>
                    {item.userses?.map((e, i) => <Avatar key={e.id} size={25} src={e.picture.url} />)}
                  </div>
                </span>
              </Item>
            )}
          />
        </Col>
      </Row>
    </div>
  );
});
