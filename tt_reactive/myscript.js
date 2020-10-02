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

const observable1 = new Observable();
const observable2 = new Observable();

const double = x => 2*x;

observable1.suscribe(x => console.log(x));
observable2.suscribe(x => console.log(double(x)))
// En este ejemplo; x => console.log(x) equivaldría al observer.

observable1.emit(10);
observable1.emit(5);
observable1.emit(2.5);
observable1.emit(11);
observable2.emit(11);

