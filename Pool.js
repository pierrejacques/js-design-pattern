// 维护一个div的对象池
class Div {
    constructor() {
        const div = document.createElement('div');
        document.body.appendChild(div);
        return div;
    }
}

class Pool {
    constructor(Creater) {
        this.pool = [];
        this.Creater = Creater;
    }

    create() {
        if (this.pool.length === 0) {
            return new this.Creater();
        } else {
            return this.pool.shift();
        }
    }

    recover(obj) {
        return this.pool.push(obj)
    }
}

const toolTipFactory = new Pool(Div);

const arr = [];
['A', 'B'].forEach(str => {
    const toolTip = toolTipFactory.create();
    toolTip.innerHTML = str;
    arr.push(toolTip);
});

arr.forEach(toolTip => {
    toolTipFactory.recover(toolTip);
});

['A', 'B', 'C', 'D', 'E', 'F', 'G'].forEach(str => {
    const toolTip = toolTipFactory.create();
    toolTip.innerHTML = str;
})
