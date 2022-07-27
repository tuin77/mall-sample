import request from "./request";

let post = (path, data = {}) => {
  let req = {
    source: "weapp",
    timestamp: Date.now() + "", //时间戳
    auth_token: "0", //token
    app_version: "4.6.1", //登录id
    cp_user_id: "0", //
    data,
  };
  return request.post(path, req);
};

export default {
  wxLogin: (data) => post("/weapp/account/v1/login", data), // 配置设置
  getProductList: (data) => post("/weapp/star/production/homepage", data), // 配置设置
};
