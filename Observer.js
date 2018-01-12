// 这里实现一个包含key的发发布期，即能受理不同的订阅内容

class Observable {
  constructor(obj = {}) {
    const event = {
      clientList: {},
      subscribe(key, fn) {
        if (!this.clientList[key]) {
          this.clientList[key] = new Set();
        }
        this.clientList[key].add(fn);
        return this;
      },
      unsubscribe(key, fn) {
        const fnList = this.clientList[key];
        if (fnList && fnList.size > 0) {
          if (!fn) {
            fnList = undefined;
          } else {
            fnList.delete(fn);
          }
        }
        return this;
      },
      trigger(key, ...params) {
        const fnList = this.clientList[key];
        if (fnList && fnList.size > 0) {
          fnList.forEach(fn => fn(...params));
        }
        return this;
      },
    };
    return Object.assign(obj, event);
  }
}

const showPrice88 = price => console.log(`88: price = ${price}`);
const showPrice100 = price => console.log(`100: price = ${price}`);
const salesOffices = new Observable();
salesOffices
  .subscribe('squareMeter88', showPrice88)
  .subscribe('squareMeter100', showPrice100)
  .trigger('squareMeter88', 20000)
  .trigger('squareMeter100', 50000)
  .unsubscribe('squareMeter100', showPrice100)
  .trigger('squareMeter100', 40000);
