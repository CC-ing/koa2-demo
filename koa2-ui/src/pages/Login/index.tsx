import React, { ChangeEvent, ChangeEventHandler, FC, useState } from "react";
import { useHistory } from "react-router-dom";
import { Form, Input, Button, message, Upload, Progress } from "antd";
import {
  UploadOutlined,
  LoadingOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { AxiosResponse } from "axios";
import "./index.less";
import { axios } from "../../utils";
import { UploadChangeParam } from "antd/lib/upload";

// https://www.jb51.net/article/182078.htm

const Login: FC = (props: any) => {
  let history = useHistory();
  let [imageUrl, setImageUrl] = useState(null);
  let [imageName, setImageName] = useState<string>("");
  let [loading, setLoading] = useState<boolean>(false);

  const onFinish = async (values: any) => {
    try {
      const formData = {
        name: values.name,
        password: values.password,
        avatar: {
          imageName,
          imageUrl,
        },
      };
      const res: AxiosResponse["data"] = await axios.post({
        url: "/login",
        data: formData,
      });
      console.log("propsprops", props, res);
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
    } catch (error) {}
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const handleUpload = (info: UploadChangeParam) => {
    if (info.file.status == "uploading") {
      setLoading(true);
    } else {
      setLoading(false);
      setImageName(info.file.name);

      const reader = new FileReader();
      reader.addEventListener("load", () => {
        // setImageUrl(reader.result);
        const image = new Image();
        image.addEventListener("load", () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          const { width, height } = image;
          console.log("---------", width, height);

          canvas.width = 200;
          canvas.height = 200;
          ctx.clearRect(0, 0, 200, 200);
          ctx.drawImage(image, 0, 0, 200, 200);
          const canvasUrl = canvas.toDataURL();
          setImageUrl(canvasUrl);
        });

        image.src = reader.result as string;
      });
      reader.readAsDataURL(info.file.originFileObj);
    }
  };

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };
  console.log("imageUrl", imageUrl);

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

        <Form.Item label="头像" name="avatar">
          <Upload
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            onChange={handleUpload}
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
