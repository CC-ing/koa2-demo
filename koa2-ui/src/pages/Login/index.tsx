import React, { FC, useState } from "react";
import { useHistory } from "react-router-dom";
import { Form, Input, Button, message, Upload } from "antd";
import {
  UploadOutlined,
  LoadingOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { AxiosResponse } from "axios";
import "./index.less";
import { axios } from "../../utils";

const Login: FC = (props: any) => {
  let history = useHistory();
  let [imageUrl, setImageUrl] = useState(null);
  let [loading, setLoading] = useState<boolean>(false);

  const onFinish = async (values: any) => {
    try {
      // const res = await axios.post({"/login", values});
      console.log('form', values);
      
      const res: AxiosResponse["data"] = await axios.post({
        url: "/login",
        data: values,
      });
      console.log("propsprops", props, res);
      // if (res.code === 200) {
      //   localStorage.setItem("token", res.token);
      //   localStorage.setItem("userInfo", JSON.stringify(res.user));
      //   localStorage.setItem("isLogin", "true");
      //   if (props.location.state && props.location.state.from) {
      //     console.log("login", props.location.state.from);
      //     history.push(props.location.state.from);
      //   } else {
      //     history.push("/");
      //   }
      // } else {
      //   message.error(res.msg);
      // }
    } catch (error) {}
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

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const getBase64 = (img: any, callback: any) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  const beforeUpload = (file: any) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  };

  const handleChange = (info: any) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(
        info.file.originFileObj,
        (imageUrl: any) => {
          setLoading(false);
          setImageUrl(imageUrl);
        }
        // this.setState({
        //   imageUrl,
        //   loading: false,
        // })
      );
    }
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

        <Form.Item label="头像" name="avatar" rules={[{ required: true }]}>
          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            // showUploadList={false}
            // action="/upload.do"
            // beforeUpload={beforeUpload}
            beforeUpload={(file, fileList)=>false}
            // onChange={handleChange}
          >
            {imageUrl ? (
              <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
            ) : (
              uploadButton
            )}
          </Upload>
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
