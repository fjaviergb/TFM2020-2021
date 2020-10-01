class Observable {
    constructor () {
        this.cbs = [];
    }
    suscribe(cbs) {
        this.cbs.push(cbs);
    }
    emit (x) {
        this.cbs.map(cb => cb(x));
    }
}

const observable = new Observable();

observable.suscribe(x => console.log(x));

observable.emit(10);
observable.emit(5);
observable.emit(2.5);


