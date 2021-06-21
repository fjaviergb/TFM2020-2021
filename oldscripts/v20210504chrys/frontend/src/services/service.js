import http from "../http.js";

class Service {
    login(data){
        return http.post("/login",data);
    }
    register(data){
        return http.post("/register",data);
    }
    getIdent(data){
        return http.post("/getident",data)
    }
    getPublicKeys(data){
        return http.post("/getpublickeys",data)
    }
    changeIdent(data){
        return http.post("/changeident", data)
    }
    changePublicKey(data){
        return http.post("/changepkey", data)
    }
    newIdent(data){
        return http.post("/newident", data)
    }
    newPublicKey(data){
        return http.post("/newpkey", data)
    }
    deleteIdent(data){
        return http.post("/delident", data)
    }
    deletePublicKey(data){
        return http.post("/delpkey", data)
    };
    pkeyOnIdent(data){
        return http.post("/pkeyonident", data)
    };
    pkeyOffIdent(data){
        return http.post("/pkeyoffident", data)
    };
    checkIdentKey(data){
        return http.post("/checkidentkey", data)
    }
    queryAll(data){
        return http.post("/queryall", data)
    }
    queryPkeys(data){
        return http.post("/querypkeys", data)
    }
    removePkeyRelationsIdent(data){
        return http.post('/removepkeyrelationsident', data)
    }
    removeIdentRelations(data){
        return http.post('/removeidentrelations', data)
    }
}

export default new Service();