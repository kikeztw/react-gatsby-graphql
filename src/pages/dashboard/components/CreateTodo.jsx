import React, {
  memo, useState, useCallback, useEffect,
} from 'react';
import {
  Button, Modal, Form, Input,
} from 'antd';
import { useMutation } from '@apollo/client';
import { CREATE_TODO } from '~queries';
import TeamPicker from './TeamPicker';


export default memo(() => {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [userAssing, setUserAssing] = useState([]);
  const [createTodo, { loading }] = useMutation(CREATE_TODO);

  useEffect(() => {
    if (visible) {
      setUserAssing([]);
    }
  }, [visible]);

  const onUserSelect = useCallback((id) => {
    setUserAssing((state) => [...state, id]);
  }, []);

  const onUserRemove = useCallback((id) => {
    setUserAssing((state) => state.filter((e) => e !== id));
  }, []);

  const onButtonPress = useCallback(() => {
    form.submit();
  }, []);

  const handleVisible = useCallback(() => {
    form.resetFields();
    setVisible((state) => !state);
  }, []);

  const handleSubmit = useCallback((values) => {
    createTodo({
      variables: {
        name: values.name,
        description: values.description,
        users: userAssing.map((e) => ({ id: e })),
      },
    });
  }, [userAssing]);

  return (
    <div>
      <Button onClick={handleVisible} type="primary" block size="large">Add Todo</Button>
      <Modal
        centered
        visible={visible}
        onOk={handleVisible}
        onCancel={handleVisible}
        footer={null}
      >
        <Form
          form={form}
          onFinish={handleSubmit}
          layout="vertical"
        >
          <Form.Item
            label="Title"
            name="name"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input.TextArea />
          </Form.Item>
        </Form>
        <div>
          <TeamPicker isResect={visible} onUserSelect={onUserSelect} onUserRemove={onUserRemove} />
        </div>
        <Button
          onClick={onButtonPress}
          loading={loading}
          type="primary"
          block
          size="large"
        >
          Submit
        </Button>
      </Modal>
    </div>
  );
});
