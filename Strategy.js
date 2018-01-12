// 一个表单验证规则的策略模式
const strategies = {
  isNonEmpty(value, errorMsg) {
    return value === '' ? errorMsg : null;
  },
  minLength(value, length, errorMsg) {
    return value.length < length ? errorMsg : null;
  },
  isMobile(value, errorMsg) {
    return !/(^1[3|5|8][0-9]{9}$)/.test(value) ? errorMsg : null;
  },
};

class Validator {
  constructor() {
    this.cache = [];
  }

  add(dom, rule, errorMsg) {
    const arr = rule.split(':');
    const strategy = arr.shift();
    return strategies[strategy].apply(dom, [dom.value, ...arr, errorMsg]);
  }

  start() {
    this.cache.forEach(item => {
      const msg = item();
      return msg || null;
    })
  }
}

// 调用
const validateFunc = () => {
  const validator = new Validator();
  validator.add(registerForm.userName, 'isNonEmpty', '用户名不能为空');
  validator.add(registerForm.password, 'minLength:6', '密码长度不能少于6位');
  validator.add(registerForm.phoneNumber, 'isMobile', '手机号码格式不正确');
  const errorMsg = validator.start();
  return errorMsg;
};
