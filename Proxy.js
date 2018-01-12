// 以下为一个计算缓存代理的例子

const mult = (...params) => {
  console.log('Starting a complex computing');
  let ans = 1;
  params.forEach(value => {
    ans *= value;
  });
  return ans;
};

const proxyMulti = (() => {
  const cache = {};
  return (...params) => {
    const key = params.join(',');
    if (key in cache) {
      return cache[key];
    }
    return cache[key] = mult(...params);
  }
})();

console.log(proxyMulti(1,2,3,4,5));
console.log(proxyMulti(1,2,3,4,5));
