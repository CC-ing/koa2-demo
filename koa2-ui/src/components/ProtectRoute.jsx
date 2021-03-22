import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectRoute = (props) => {
  const { component: Component, ...rest } = props;
  let isLogin = JSON.parse(localStorage.getItem("isLogin"));

  console.log("--------", isLogin);

  return isLogin ? (
    <Route {...props} />
  ) : (
    <Redirect
      to={{
        pathname: "/login",
        state: {
          from: props.path,
        },
      }}
    />
  );
};

export default ProtectRoute;
