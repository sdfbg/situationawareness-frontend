// 验证最大长度
export function validateLen(len = 32) {
  return {
    max: len,
    message: '最大长度为' + len + '个字符',
    trigger: 'blur'
  }
}
/* 是否手机号码或者固话*/
export function validatePhoneTwo(rule, value, callback) {
  const reg = /^((0\d{2,3}-\d{7,8})|(1[34578]\d{9}))$/;
  if (value == '' || value == undefined || value == null) {
    callback()
  } else {
    if ((!reg.test(value)) && value != '') {
      callback(new Error('请输入正确的电话号码或者固话号码'));
    } else {
      callback()
    }
  }
}
/* 是否邮箱*/
export function validateEMail(rule, value, callback) {
  const reg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
  // const reg = /^((0\d{2,3}-\d{7,8})|(1[34578]\d{9}))$/;
  if (value == '' || value == undefined || value == null) {
    callback();
  } else {
    if (!reg.test(value)) {
      callback(new Error('请输入正确的邮箱'));
    } else {
      callback();
    }
  }
}
export const validatePsdReg = (rule, value, callback) => {
  if (!value) {
    return callback(new Error('请输入密码'))
  }
  if (value.substring(0, 7) == "$2a$10$") {
    callback()
  } else if (value.substring(0, 7) == "$2a$12$") {
    callback()
  } else if (!/^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$)([^\u4e00-\u9fa5\s]){6,20}$/.test(value)) {
    callback(new Error('请输入6-20位英文字母、数字或者符号（除空格），且字母、数字和标点符号至少包含两种'))
  } else {
    callback()
  }
}
export const validateCode = (rule, value, callback) => {
  if (!value) {
    return callback(new Error('请输入用户ID'))
  }

  if (!/[a-zA-Z0-9_]{4,20}$/.test(value)) {
    callback(new Error('账号必须为4-20位带下划线的字母或数字'))
  } else {
    callback()
  }
}
export const validatePolceCode = (rule, value, callback) => {
  if (!value) {
    return callback(new Error('请输入警号'))
  }
  if (!/^(?![0-9]*$)(?![a-zA-Z]*$)[a-zA-Z0-9]{6,20}$/.test(value)) {
    callback(new Error('警号必须为6-20位字母和数字组合'))
  } else {
    callback()
  }
}
