import Cookies from "js-cookie";

// 设置一个独一无二的key
const TokenKey = "hrsaas-ihrm-token";
const timeKey = "hrsaas-timestamp-key";

export function getToken() {
  return Cookies.get(TokenKey);
}

export function setToken(token) {
  return Cookies.set(TokenKey, token);
}

export function removeToken() {
  return Cookies.remove(TokenKey);
}

// 获取时间戳
export function getTimestamp() {
  return Cookies.get(timeKey);
}

// 设置时间戳
export function setTimestamp() {
  Cookies.set(timeKey, Date.now());
}

// 持久化
