/*打包及编译使用的环境信息文件*/
import dev from "./env.dev";
import uat from "./env.uat";
import prod from "./env.prod";

var env = {
  baseUrl: ""
};
var environment = null;
// 根据json中配置的信息,给environment变量赋值
console.log(process.env);
switch (process.env.env) {
  case "dev":
    environment = dev;
    break;
  case "uat":
    environment = uat;
    break;
  case "prod":
    environment = prod;
    break;
  default:
    console.log("环境信息异常!");
}
// 将环境信息做整合
Object.assign(env, environment);

export default env;
