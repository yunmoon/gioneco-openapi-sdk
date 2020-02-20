const { GionecoClient } = require("../dist/index");
const appId = "";
const secret = "";
const aesKey = ""
const gionecoClient = new GionecoClient(appId, secret, aesKey);
(async () => {
  const result = await gionecoClient.request("realname.verification", {
    name: "test",
    cardNo: "test",
    imageData: "test"
  })
  console.log(result);
})();