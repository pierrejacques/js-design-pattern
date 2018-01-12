// 一般的函数装饰器实现

let fn = n => n + 1;

const Multiplier = (fn, n = 2) => (...params) => fn(...params) * n;
const Divider = (fn, n = 2) => (...params) => fn(...params) / n;
const Increaser = (fn, n = 1) => (...params) => fn(...params) + n;
const Decreaser = (fn, n = 1) => (...params) => fn(...params) - n;

fn = Multiplier(fn, 5);
fn = Divider(fn, 2);
fn = Increaser(fn, 10);

console.log(fn(3))

// AOP方式

fn = () => console.log('shit');

Function.prototype.before = function(beforefn) {
    const self = this;
    return function(...params) {
        beforefn.apply(this, params);
        const ret = self.apply(this, params);
        return ret;
    };
};

Function.prototype.after = function(afterfn) {
    const self = this;
    return function(...params) {
        const ret = self.apply(this, params);
        afterfn.apply(this, params);
        return ret;
    };
};

fn = fn.after(() => console.log('fuck')).before(() => console.log('dick'));
fn();
