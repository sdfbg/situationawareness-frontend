export const dealNum = num => {
  num = num.toString();
  // 把数变成字符串
  if (num.length < 8) {
    num = "0" + num; // 如未满八位数，添加"0"补位
    // 递归添加"0"补位
    num = dealNum(num);
  }
  return num;
};
//变动动画
export const timer = (arr, num, trans, _this) => {
  arr.forEach((item, i) => {
    item.forEach(subItem => {
      if (num[i] == subItem) {
        trans[i] = "translateY(-" + num[i] * 10 + "%)";
        _this.$forceUpdate();
      }
    });
  });
};
