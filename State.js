class LightState {
    constructor(onPress) {
        this.nextState = null;
        this.onPress = onPress;
    }

    getNext() {
        return this.nextState;
    }

    setNext(state) {
        this.nextState = state;
    }
}

class Light {
    constructor(iniState) {
        this.lumi = null;
        this.currentState = iniState;
        this.update();
    }

    update() {
        this.currentState.onPress(this);
    }

    onPress() {
        this.currentState = this.currentState.getNext();
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
weakState.setNext(mediumState);
mediumState.setNext(strongState);
strongState.setNext(offState);
offState.setNext(weakState);
const light = new Light(offState);

light.onPress();
light.onPress();
light.onPress();
light.onPress();
