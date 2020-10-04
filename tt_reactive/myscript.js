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
    suscribe (cb) {
        this.ob.suscribe(cb);
    }
    emit (x) {
        this.ob.emit(this.f(x));
    }
}

class Filter {
    constructor (p) {
        this.ob = new Observable();
        this.p = p;
    }
    suscribe (cb) {
        this.ob.suscribe(cb);
    }
    emit (x) {
        if (this.p(x)) {
            this.ob.emit(x);
        }
    }
}

const Rx = {};
Rx.map = f => new Mapper(f);
// Otra manera para llamar a Mapper. Permite agrupar distintas inicializaciones para Mapper
Rx.filter = p => new Filter(p);


// EXAMPLE
// ===========================
const observable = new Observable();

setTimeout(() => {
observable.emit(10);
observable.emit(5);
}, 1000)

observable.pipe(
    Rx.filter(x => x > 1),
    Rx.map(x => x*2)
).suscribe(console.log)

//04-10-2020. Duración: 4 horas
