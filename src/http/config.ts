export const baseUrl = location.protocol + "//localhost"; //项目域名
const environment = process.env.NODE_ENV === "production" ? "pro" : "dev"; //dev开发环境  pro 生产环境
let export_obj = {};
// 开发环境
if (environment === "dev") {
  export_obj = {
    proxyBaseUrl: "/api",
    fyBaseUrl: "/apis", //防疫接口
  };
  // 线上环境
} else if (environment === "pro") {
  export_obj = {
    // 项目使用到多个域名，可以进行多个入口配置
    proxyBaseUrl: location.protocol + "//localhost", // 应用1
    fyBaseUrl: location.protocol + "//localhost", //应用2
  };
}
export default export_obj;
