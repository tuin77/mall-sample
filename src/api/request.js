import axios from "axios";
// import { tansParams } from "@/utils/ruoyi";

// const server = require("../config/server.config");

axios.defaults.headers["Content-Type"] = "application/json";
axios.defaults.headers["FEAT-ENV-NAME"] = "dev";
// 解决方法二:使用axios请求
// 自定义适配器来适配uniapp语法
axios.defaults.adapter = function (config) {
  return new Promise((resolve, reject) => {
    var settle = require("axios/lib/core/settle");
    var buildURL = require("axios/lib/helpers/buildURL");
    uni.request({
      method: config.method.toUpperCase(),
      url:
        config.baseURL +
        buildURL(config.url, config.params, config.paramsSerializer),
      header: config.headers,
      data: config.data,
      dataType: config.dataType,
      responseType: config.responseType,
      sslVerify: config.sslVerify,
      complete: function complete(response) {
        // console.log("执行完成：", response)
        response = {
          data: response.data,
          status: response.statusCode,
          errMsg: response.errMsg,
          header: response.header,
          config: config,
        };
        settle(resolve, reject, response);
      },
    });
  });
};

// 创建axios实例
const service = axios.create({
  baseURL: "https://dev.app.test.collectivedynamic.com",
  timeout: 10000,
});

//请求计数
let reqNum = 0;
service.interceptors.request.use(
  (config) => {
    console.log("axios请求拦截器");
    // 在请求发出之前进行一些操作，每次发出请求就 reqNum++
    reqNum++;
    // 是否需要设置 token
    // const isToken = (config.headers || {}).isToken === false;
    // // 是否需要防止数据重复提交
    // const isRepeatSubmit = (config.headers || {}).repeatSubmit === false;
    // if (!isToken) {
    //   config.headers["uniapp"] = "Y "; // 让每个请求携带自定义token 请根据实际情况自行修改
    // }
    return config;
  },
  (error) => {
    console.log(error);
    Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (res) => {
    reqNum--; // 接受请求后 reqNum--，判断请求所有请求是否完成
    if (reqNum <= 0) {
      // console.log('请求完毕')
    } else {
      // console.log('接口' + reqNum + '请求中')
    }
    // 未设置状态码则默认成功状态
    const code = res.data.code || 200;
    // 获取错误信息errorCode[code] ||
    const msg = res.data.msg;
    // 二进制数据则直接返回
    // if (
    //   res.request.responseType === "blob" ||
    //   res.request.responseType === "arraybuffer"
    // ) {
    //   return res.data;
    // }
    if (code === 401) {
      return Promise.reject(
        "（401）：请求要求身份验证。对于需要登录的网页，服务器可能返回此响应"
      );
    } else if (code === 500) {
      uni.showToast({ title: msg, duration: 2000 });
      return Promise.reject(new Error(msg));
    } else if (code !== 200) {
      uni.showToast({ title: msg, duration: 2000 });
      return Promise.reject("error");
    } else {
      return res.data;
    }
  },
  (error) => {
    console.log("err" + error);
    let { message } = error;
    if (message == "Network Error") {
      message = "后端接口连接异常";
    } else if (message.includes("timeout")) {
      message = "系统接口请求超时";
    } else if (message.includes("Request failed with status code")) {
      message = "系统接口" + message.substr(message.length - 3) + "异常";
    }

    uni.showModal({
      title: "提示",
      content: message,
      success: function (res) {
        if (res.confirm) {
          console.log("用户点击确定");
        } else if (res.cancel) {
          console.log("用户点击取消");
        }
      },
    });

    return Promise.reject(error);
  }
);

export default service;
