app.service("loginService", ['$http', function ($http) {
    
    this.submit = function (model) {
        
        //return $http.post("/api/login/validate", model)
        return $http.post("/Account/LoginPost", model)
    };
    this.getById = function (id) {
        return $http.get("/api/login/getById", {
            params: {
                Id: id
            }
        });
    };
    this.getCountryList = function (model) {
        return $http.get("/api/masterconfiguration/getCountryList");
    };

    this.addUsers = function (model) {
        //return $http.get("/api/masterconfiguration/getCountryList");
        return $http.post("/api/login/addUsers", model)
    };

}]); 