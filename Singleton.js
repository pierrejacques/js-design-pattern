class Div {
  constructor(html) {
    this.html = html;
    this.init();
  }

  init() {
    const div = document.createElement('div');
    div.innerHTML = this.html;
    document.body.appendChild(div);
  }
}

const ProxySingleton = Func => {
  const closure = () => {
    let instance;
    return function(...params) {
      if (!instance) {
        instance = new Func(...params);
      }
    };
  }
  return closure();
}

const ProxySingletonCreateDiv = ProxySingleton(Div);

const a = new ProxySingletonCreateDiv('sven1');
const b = new ProxySingletonCreateDiv('sven2');

console.log(a === b);
