import React, { FC, useState } from "react";
import { useHistory } from "react-router-dom";
import { Form, Input, Button, message } from "antd";
import { AxiosResponse } from 'axios'
import "./index.less";
import { axios } from "../../utils";

const Login: FC = (props: any) => {
  let history = useHistory();
  // let Api = Api.create()

  const onFinish = async (values: any) => {
    try {
      // const res = await axios.post({"/login", values});
      
      const res: AxiosResponse["data"] = await axios.post({ url: '/login', data: values });
      console.log('propsprops', props, res);
      if (res.code === 200) {
        localStorage.setItem("token", res.token);
        localStorage.setItem("userInfo", JSON.stringify(res.user));
        localStorage.setItem("isLogin", "true");
        if (props.location.state && props.location.state.from) {
          console.log("login", props.location.state.from);
          history.push(props.location.state.from);
        } else {
          history.push("/");
        }
      } else {
        message.error(res.msg);
      }
    } catch (error) { }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };

  return (
    <div className="login-wrap">
      <Form
        {...layout}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="用户名"
          name="name"
          rules={[{ required: true, message: "请输入用户名" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="密码"
          name="password"
          rules={[{ required: true, message: "请输入密码" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
