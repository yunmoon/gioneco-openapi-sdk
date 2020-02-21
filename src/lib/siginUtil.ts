import * as qs from "qs";
import * as crypto from "crypto";

function objectSort(obj) {
  const keys = Object.keys(obj).sort()
  let newObj = {}
  keys.forEach((val) => {
    if (obj[val] !== "") {
      newObj[val] = encodeURIComponent(obj[val])
    }
  })
  return newObj
}
function formatStr(obj) {
  return qs.stringify(obj)
}
function getSign(str, secret) {
  str += `&app_key=${secret}`
  return md5(str).toUpperCase();
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
function md5(str) {
  return crypto.createHash('md5').update(str).digest('hex');
}
export {
  sign,
  aesEcbEncrypt,
  aesEcbDecrypt,
  md5
}