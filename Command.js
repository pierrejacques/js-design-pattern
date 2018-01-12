// 命令模式旨在解耦命令者和执行者
// command可以排队，等待，回撤   

class Command {
    constructor(fn) {
        this.fn = fn;
    }

    execute(...params) {
        this.fn(...params);
    }

    bind(commander, eventName) {
        commander.on(eventName, this.execute);
    }
}

class MacroCommand {
    constructor(commandList) {
        this.commandList = commandList;
    }

    execute() {
        this.commandList.forEach(fn => fn());
    }
}

const MenuBar = {
    refresh: function() {
        console.log('refresh menu');
    },
};

const button = document.createElement('button');

const commandRefresh = new Command(Menu.refresh);
commandRefresh.bind(button);
