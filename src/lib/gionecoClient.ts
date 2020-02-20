import { sign, aesEcbDecrypt, aesEcbEncrypt } from "./siginUtil";
import axios from "axios";
type httpMethod = {
  http_method: string
  version?: string
}
export class GionecoClient {
  constructor(private appId: string, private secret: string, private aesKey: string) {

  }
  async request(http_method: httpMethod | string, bizContent = {}) {
    const time = parseInt(`${(new Date().getTime()) / 1000}`);
    let version = "1.0";
    if ((<httpMethod>http_method).version) {
      version = (<httpMethod>http_method).version;
    }
    let method = http_method;
    if ((<httpMethod>http_method).http_method) {
      method = (<httpMethod>http_method).http_method;
    }
    let obj: any = {
      http_method: method,
      appid: this.appId,
      timestamp: time,
      version,
      nonceStr: "30b0dd2d",
      biz_content: JSON.stringify(bizContent)
    }
    const signStr = sign(obj, this.secret);
    obj.sign = signStr;
    const { data } = await axios.post("https://openapi.cnzhiyuanhui.com/gateway", bizContent, {
      params: obj
    });
    return data;
  }
  aesEcbDecrypt(str: string) {
    return aesEcbDecrypt(str, this.aesKey);
  }
  aesEcbEncrypt(str: string) {
    return aesEcbEncrypt(str, this.aesKey);
  }
}