import React, { FC, ReactNode } from "react";
import { RouteComponentProps } from "react-router-dom";
import { useRequest } from "ahooks";
import moment from "moment";
import { Comment } from "antd";
import { axios } from "../../utils";
import "./index.less";

interface PostItemProps extends RouteComponentProps {
  children: ReactNode;
}
const PostItem: FC = (props: PostItemProps) => {
  console.log(props.match.params);

  const getPostDetail = async () => {
    const id = (props.match.params as { id: number }).id;
    const res: any = await axios.get(`/posts/${id}`);
    return res.data;
  };

  const { data = {} } = useRequest(getPostDetail);
  return (
    <div className="posts">
      <h3 className="title">{data.title}</h3>
      <div className="desc-detail">
        <span>创建时间：{moment(data.ctime).format('YYYY-MM-DD hh:mm:ss')}</span>
        <span>发帖人：{data.username}</span>
      </div>
      <p className="content">{data.content}</p>
    </div>
  );
};

export default PostItem;
