/**
 * 动态匹配api接口地址
 */
import { isInnerIPFn } from 'Utils/tools'
const website = [
  {
    web: "//kqyl.net.cn/",
    api: "//kqyl.net.cn:7002",
    static: "//kqyl.net.cn/",
    env: "prod"
  },
  {
    web: "//www.kqyl.net.cn/",
    api: "//www.kqyl.net.cn:7002",
    static: "//www.kqyl.net.cn/",
    env: "prod"
  },
  {
    web: "//localhost:7001/",
    api: "//127.0.0.1:8080",
    static: "//127.0.0.1/",
    cloud: "//127.0.0.1:7001/",
    env: "dev"
  },
  {
    web: "//0.0.0.0:7001/",
    api: "//192.168.0.170:8080",
    static: "//192.168.0.241/",
    cloud: "//110.53.141.98:7001/",
    env: "dev"
  },
  {
    web: "localhost:9001",
    api: "//kqyl.net.cn:7002",
    static: "//kqyl.net.cn/",
    env: "dev"
  }
];
let matchApi

// 内网的情况单独处理
if (isInnerIPFn()) {
  let ip = location.hostname
  matchApi = [
    {
      web: ip,
      api: `//${ip}:8080`,
      static: `//${ip}/`,
      cloud: '//110.53.141.98:7001/',
      env: 'inner'
    }
  ]
} else {
  matchApi = website.filter(item => new RegExp(item.web).test(location.href));

  // 没有匹配到对应的api地址
  if (!matchApi.length) {
    console.error(`${location.href}: 该站点没有对应的api地址， 请检查`);
  }

  // 匹配到多个对于的api地址
  if (matchApi.length > 1) {
    console.error(
      `${location.href}: 该站点映射了多个api地址${matchApi
        .map(item => item.api)
        .join(",")}，默认选取第一个匹配项`
    );
  }
}

export const staticPath = matchApi[0].static

export const api = matchApi[0].api

export const cloudPath = matchApi[0].cloud

export default matchApi[0];
