// 模板应该是基于继承的一种设计模式，但在js中，可以通过把钩子方法传入构造器获得
// 该模式看起来对于js不是很实用，主要是用它创建一系列的构造函数

function Beverage(params) {
    const boilWater = function() {
        console.log();
    };

    const brew = params.brew || function() { throw new Error('require method "brew"'); }
    const pourInCup = params.pourInCup || function() { throw new Error('require method "pourInCup"'); }
    const addCondiments = params.addCondiments || function() { throw new Error('require method "addCondiments"'); }

    const F = function() {};
    F.prototype.init = function() {
        boilWater();
        brew();
        pourInCup();
        addCondiments();
    }

    return F;
}

const Coffee = Beverage({
    brew() {
        console.log('rush coffee');
    },
    pourInCup() {
        console.log('pour coffee into cup');
    },
    addCondiments() {
        console.log('add in sugar and milk');
    }
});

const Tea = Beverage({
    brew() {
        console.log('rush tea');
    },
    pourInCup() {
        console.log('pour tea into cup');
    },
    addCondiments() {
        console.log('add lemon');
    }
});

const coffee = new Coffee();
coffee.init();

const tea = new Tea();
tea.init();
