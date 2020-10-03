// GENERAL PURPOSE FUNCTION
// ===========================
const tap = f => x => {f(x); return x;}
// Permite aplicar funciones que se alimentan del dato en bruto sucesivamente

const pipe = (...fs) => x => fs.reduce((val, f) => f(val), x)
// (...fs) pasa todos los elementos del array
// reduce() 

const double = x => 2*x;
const half = x => x/2;
const mult = x => y => x*y;

// REACTIVE LIBRARY
// ===========================
class Observable {
    constructor () {
        this.cbs = [];
        // Lista de observers que están atentos del observable
    }
    suscribe(dd) {
        this.cbs.push(dd);
        // Append un nuevo observer; en este caso en vez de un objeto une una función
    }
    emit(x) {
        this.cbs.map(cb => cb(x));
        // Notifica a cada observer de la existencia de un nuevo mensaje.
        // cb toma cada elemento del array, con valor: function (x) {console.log(x)}
        // Por ello, se pasa x como argumento de cb
    }
    pipe(...os) {
        return os.reduce((acc,o) => { 
            acc.suscribe(x => o.emit(x));
            return o;
        }, this)
    }
}


// CLASE MAPPER
// ===========================
class Mapper {
    constructor (f) {
        this.ob = new Observable();
        this.f = f;
    }
    suscribe (cbs) {
        this.ob.suscribe(cbs);
    }
    emit (x) {
        this.ob.emit(this.f(x));
    }
}

const Rx = {};
Rx.map = f => new Mapper(f);
// Otra manera para llamar a Mapper. Permite agrupar distintas inicializaciones para Mapper

// EXAMPLE
// ===========================
const observable = new Observable();
const doubler = observable.pipe(Rx.map(x => x*2))
const tripler = observable.pipe(Rx.map(x => x*3))
const mixtopisto = observable.pipe(
    Rx.map(x=>x*2),
    Rx.map(x=>x+10)
    )

setTimeout(() => {
observable.emit(10);
observable.emit(5);
observable.emit(2.5);
observable.emit(11);
}, 1000)

observable.suscribe(console.log);
doubler.suscribe(console.log);
tripler.suscribe(console.log)
mixtopisto.suscribe(console.log);




