import { IApiMap } from './../src/type';
import Apis from "../dist/index.js";

let serverMap = {
  baseServer: {
    default: true,
    baseURL: "https://localhost.apis.com"
  },
  authServer: {
    baseURL: "https://auth.apis.com"
  },
  orderServer: {
    baseURL: "http://localhost:4320"
  }
};

let apiMap: IApiMap = {
  getBaseInfo: {
    method: "get",
    url: "/info"
  },
  "user/postOrder": {
    server: "orderServer",
    method: "post",
    url: "/order/:id"
  }
};

Apis.useReq(
  function (config: { headers: { Authorization: string; }; }) {
    config.headers.Authorization = "Bearer";
    return config;
  },
  function (error: any) {
    return Promise.reject(error);
  }
);

let apis = new Apis(serverMap, apiMap);

window.apis = apis;

apis.getBaseInfo();

apis.user.postOrder({
  rest: {
    id: 1234
  }
});