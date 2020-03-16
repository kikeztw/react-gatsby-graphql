/* eslint-disable no-undef */
import React, { useCallback, useState } from 'react';
import {
  Typography, Col, Row, List, Avatar,
} from 'antd';
import { navigate } from 'gatsby';
import { useQuery } from '@apollo/client';
import { GET_TEAM } from '~queries';
import { Layout } from '~modules';

const { Title, Text } = Typography;
const { Item } = List;
const { Meta } = Item;


export default () => {
  const { loading, error, data } = useQuery(GET_TEAM);
  const [isLoading, setLoading] = useState(false);

  const handleSelect = useCallback((user) => () => {
    if (localStorage) {
      setLoading(true);
      localStorage.setItem('user', JSON.stringify(user));
      setTimeout(() => {
        navigate('/dashboard');
      }, 250);
    }
  }, []);

  return (
    <Layout>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
      }}
      >
        <Row>
          <Col sm={24}>
            <div style={{ textAlign: 'center' }}>
              <Title level={2}>Gatsby Todo App</Title>
              <Text type="secondary">Choise your user Name</Text>
            </div>
          </Col>
          <Col sm={24}>
            {error && (<Text type="danger">Error fetching data</Text>)}
            <List
              loading={(loading && !error) || isLoading}
              itemLayout="horizontal"
              dataSource={data && !error ? data.userses : []}
              renderItem={(item) => (
                <Item onClick={handleSelect(item)} className="todo-card">
                  <Meta
                    className="todo-meta"
                    avatar={<Avatar src={item.picture.url} size={70} />}
                    title={item.name}
                    description={`@${item.username}`}
                  />
                </Item>
              )}
            />
          </Col>
        </Row>
      </div>
    </Layout>
  );
};
