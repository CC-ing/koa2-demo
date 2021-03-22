import React, { FC } from "react";
import { Form, Input, Button } from "antd";
import { AxiosResponse } from 'axios'
import { axios } from "../../utils";

const Posts: FC = () => {
  const onFinish = async (values: any) => {
    console.log(values);
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const post = {
      ...values,
      ctime: new Date(),
      uid: userInfo.id
    };
    const result: AxiosResponse['data'] = await axios.post({
      url: '/posts/addPost',
      data: post
    });
    console.log("--------", result);
  };

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  return (
    <Form {...layout} name="nest-messages" onFinish={onFinish}>
      <Form.Item name="title" label="文章名称" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item name="content" label="内容">
        <Input.TextArea />
      </Form.Item>
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Posts;
