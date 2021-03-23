import React, { FC, useEffect } from "react";
import { List, Avatar } from "antd";
import { Link } from "react-router-dom";
import { useRequest } from "ahooks";
import { axios } from "../../utils";

const PostList: FC = () => {
  const getPostList = async () => {
    const res: any = await axios.get("/posts/list");
    console.log("===========", res);

    return res;
  };

  const { data = [], loading } = useRequest(getPostList);
  return (
    <List
      itemLayout="horizontal"
      dataSource={data}
      renderItem={(item: any) => (
        <List.Item>
          <List.Item.Meta
            avatar={
              <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
            }
            title={<Link to={`/posts/${item.id}`}>{item.title}</Link>}
            description={item.content}
          />
        </List.Item>
      )}
    />
  );
};

export default PostList;
