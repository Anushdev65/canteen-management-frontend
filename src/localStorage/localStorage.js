export const getLevelInfo = () => {
  const info = localStorage.getItem("loginInfo");
  if (info) {
    const parseInfo = JSON.parse(info);
    return parseInfo;
  }
  return;
};

export const setLevelInfo = (loginInfo) => {
  const stringifyInfo = JSON.stringify(loginInfo);
  if (stringifyInfo) {
    localStorage.setItem("loginInfo", stringifyInfo);
  }
};

export const getUserInfo = () => {
  const info = localStorage.getItem("userInfo");
  if (info) {
    const parseInfo = JSON.parse(info);
    return parseInfo;
  }
  return;
};

export const setUSerInfo = (loginInfo) => {
  const stringifyInfo = JSON.stringify(loginInfo);
  if (stringifyInfo) {
    localStorage.setItem("userInfo", stringifyInfo);
  }
};

export const removeLevelInfo = () => {
  localStorage.removeItem("loginInfo");
  localStorage.removeItem("userInfo");
};
