// 对前端而言，职责链模式类似点击事件冒泡，亦可用AOP的方式实现

const order500 = function(objIn) {
    const obj = objIn;
    if (obj.orderType === 1 && obj.done === false) {
        console.log('500');
        obj.done = true;
    }
    return obj;
};

const order200 = function(objIn) {
    const obj = objIn;
    if (obj.orderType === 2 && obj.done === false) {
        console.log('200');
        obj.done = true;
    }
    return obj;
};

const orderNormal = function(objIn) {
    const obj = objIn;
    if (obj.orderType === 3 && obj.done === false) {
        if (obj.stock > 0) {
            console.log('buy');
            obj.done = true;
        }
    }
    return obj;
};

class ChainNode {
    constructor(fn) {
        this.fn = fn;
        this.nextNode = null;
    }

    setNext(node) {
        this.nextNode = node;
    }

    async run(objIn) {
        const obj = await this.fn(Object.assign(objIn, { done: false }));
        if (!obj.done) {
            this.nextNode.run(obj);
        }
    }
}

const node500 = new ChainNode(order500);
const node200 = new ChainNode(order200);
const nodeNormal = new ChainNode(orderNormal);

// 组装
node500.setNext(node200);
node200.setNext(nodeNormal);

// 运行
node500.run({
    orderType: 2,
    stock: 500,
});
