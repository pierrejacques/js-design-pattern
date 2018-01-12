class LightState {
    constructor(light, onPress) {
        this.light = light;
        this.nextState = null;
        this.onPress = onPress.bind(this.light);
    }

    next() {
        this.light.currentState = this.nextState;
    }

    setNext(state) {
        this.nextState = state;
    }
}

class Light {
    constructor() {
        this.lumi = null;
        this.weakState = new LightState(this, () => this.setLumi(1));
        this.mediumState = new LightState(this, () => this.setLumi(2));
        this.strongState = new LightState(this, () => this.setLumi(3));
        this.offState = new LightState(this, () => this.setLumi(0));
        this.weakState.setNext(this.mediumState);
        this.mediumState.setNext(this.strongState);
        this.strongState.setNext(this.offState);
        this.offState.setNext(this.weakState);
        this.currentState = this.offState;
    }

    init() {
        this.currentState.onPress();
    }

    onPress() {
        this.currentState.next();
        this.currentState.onPress();
    }

    setLumi(val) {
        this.lumi = val;
        console.log(val);
    }
}

const light = new Light();
light.onPress();
light.onPress();
light.onPress();
light.onPress();
