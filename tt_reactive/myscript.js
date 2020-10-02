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

const double = x => 2*x;

const tap = f => x => {f(x); return x;}
// Permite aplicar funciones que se alimentan del dato en bruto sucesivamente

const pipe = (f, g) => x => f(g(x))
// pipe se emplea para leer una corriente de datos y pasárselos al observador
// (f,g) implica que serán dos funciones
// (...f) implica todos los argumentos, que son funciones, que se le pasen

observable1.suscribe(pipe(console.log, tap(console.log)));
// En este ejemplo; x => console.log(x) equivaldría al observer.
// Funciona sin especificar la x

observable1.emit(10);
observable1.emit(5);
observable1.emit(2.5);
observable1.emit(11);

