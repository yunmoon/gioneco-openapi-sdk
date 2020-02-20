import * as qs from "qs";
import * as crypto from "crypto";

function objectSort(obj) {
  const keys = Object.keys(obj).sort()
  let newObj = {}
  keys.forEach((val) => {
    newObj[val] = encodeURIComponent(obj[val])
  })
  return newObj
}
function formatStr(obj) {
  return qs.stringify(obj)
}
function getSign(str, secret) {
  str += `&app_key=${secret}`
  const md5 = crypto.createHash('md5')
  return md5.update(str).digest('hex').toUpperCase();
}
function sign(params, secret) {
  let sign = getSign(formatStr(objectSort(params)), secret);
  return sign;
}
function aesEcbEncrypt(str, aesKey) {
  const iv = "";
  const clearEncoding = 'utf8';
  const cipherEncoding = 'base64';
  const cipherChunks = [];
  const cipher = crypto.createCipheriv('aes-128-ecb', aesKey, iv);
  cipher.setAutoPadding(true);
  cipherChunks.push(cipher.update(str, clearEncoding, cipherEncoding));
  cipherChunks.push(cipher.final(cipherEncoding));
  return cipherChunks.join('');
}

function aesEcbDecrypt(str, aesKey) {
  const iv = "";
  const clearEncoding = 'utf8';
  const cipherEncoding = 'base64';
  const cipherChunks = [];
  const decipher = crypto.createDecipheriv('aes-128-ecb', aesKey, iv);
  decipher.setAutoPadding(true);
  cipherChunks.push(decipher.update(str, cipherEncoding, clearEncoding));
  cipherChunks.push(decipher.final(clearEncoding));
  return cipherChunks.join('');
}
export {
  sign,
  aesEcbEncrypt,
  aesEcbDecrypt
}