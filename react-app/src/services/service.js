import http from "../http.js";

class Service {
    login(data){
        return http.post("/login",data);
    }
    register(data){
        return http.post("/register",data);
    }
    getAddresses(data){
        return http.post("/getaddresses",data)
    }
    getTags(data){
        return http.post("/gettags",data)
    }
    getPublicKeys(data){
        return http.post("/getpublickeys",data)
    }
    changeTag(data){
        return http.post("/changetag", data)
    }
    changeAddress(data){
        return http.post("/changeaddress", data)
    }
    changePublicKey(data){
        return http.post("/changepkey", data)
    }
    newAddress(data){
        return http.post("/newaddress", data)
    }
    newTag(data){
        return http.post("/newtag", data)
    }
    newPublicKey(data){
        return http.post("/newpkey", data)
    }
    deleteAddress(data){
        return http.post("/deladdress", data)
    }
    deleteTag(data){
        return http.post("/deltag", data)
    }
    deletePublicKey(data){
        return http.post("/delpkey", data)
    }

}

export default new Service();