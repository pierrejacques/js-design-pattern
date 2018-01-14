class LightState {
    constructor(onPress) {
        this.nextState = null;
        if (Object.prototype.toString.call(onPress) === '[object Function]') {
            this.onPress = onPress;
        } else {
            throw new Error('onPress should be a function');
        }
    }
}

class Light {
    constructor(iniState) {
        this.lumi = null;
        this.currentState = iniState;
        this.update();
    }

    update() {
        this.currentState.onPress.call(this);
    }

    onPress() {
        this.currentState = this.currentState.nextState;
        this.update();
    }

    setLumi(val) {
        this.lumi = val;
        console.log(val);
    }
}

const weakState = new LightState(light => light.setLumi(1));
const mediumState = new LightState(light => light.setLumi(2));
const strongState = new LightState(light => light.setLumi(3));
const offState = new LightState(light => light.setLumi(0));
weakState.nextState = mediumState;
mediumState.nextState = strongState;
strongState.nextState = offState;
offState.nextState = weakState;
const light = new Light(offState);
const light2 = new Light(mediumState);

light.onPress();
light.onPress();
light.onPress();
light.onPress();

console.log('\n');

light2.onPress();
light2.onPress();
light2.onPress();
light2.onPress();
