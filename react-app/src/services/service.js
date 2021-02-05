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
}

export default new Service();