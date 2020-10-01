class Observable {
    constructor () {
        this.cbs = [];
        // Lista de observers que están atentos del observable
    }
    suscribe(dd) {
        this.cbs.push(dd);
        // Append un nuevo observer; en este caso en vez de un objeto une una función
    }
    emit (x) {
        this.cbs.map(cb => cb(x));
        // Notifica a cada observer de la existencia de un nuevo mensaje.
        // cb toma cada elemento del array, con valor: function (x) {console.log(x)}
        // Por ello, se pasa x como argumento de cb
    }
}

const observable = new Observable();

observable.suscribe(x => console.log(x));
// En este ejemplo; x => console.log(x) equivaldría al observer.

observable.emit(10);
observable.emit(5);
observable.emit(2.5);
observable.emit(11);

