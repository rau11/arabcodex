app.service("masterconfigurationService", ['$http', function ($http) {
    
    var _getDTUrl = function (fnName) {
        var url = "/api/masterconfiguration/" + fnName;
        return url;
    }
    this.getDTUrl = _getDTUrl;
    this.loadData = function (model) {
        
        return $http.post("/api/masterconfiguration/getdatatable", model)
    };
    this.getRoles = function (model) {
        
        return $http.post("/api/masterconfiguration/getAllRoles", model)
    };
    this.getLookUp = function (model) {
        
        return $http.post("/api/masterconfiguration/getLookUp", model)
    };

   

    this.addUpdate = function (model) {
        
        return $http.post("/api/masterconfiguration/addUpdate", model)
    };
    this.addUpdateUserRoles = function (model) {
        
        return $http.post("/api/masterconfiguration/addUpdateUserRoles", model)
    };

    this.addUpdateRoles = function (model) {
        
        return $http.post("/api/masterconfiguration/addUpdateRoles", model)
    };

    this.addUpdateLookUp = function (model) {
        
        return $http.post("/api/masterconfiguration/addUpdateLookUp", model)
    };

    this.getDataById = function (id) {
        return $http.get("/api/masterconfiguration/getDataById", {
            params: {
                Id: id
            }
        });
    };

    this.getRoleById = function (id) {
        return $http.get("/api/masterconfiguration/getRoleById", {
            params: {
                Id: id
            }
        });
    };

    this.getLookUpById = function (id) {
        return $http.get("/api/masterconfiguration/getLookUpById", {
            params: {
                Id: id
            }
        });
    };
    this.getTypes = function (id) {
        return $http.get("/api/masterconfiguration/getTypes", {
            params: {
                Id: id
            }
        });
    };
    this.checkUserRoles = function (id) {
        return $http.get("/api/dashboard/checkUserRoles", {
            params: {
                Id: id
            }
        });
    };
    this.getLookUpByTypeId = function (id) {
        return $http.get("/api/masterconfiguration/getLookUpByTypeId", {
            params: {
                Id: id
            }
        });
    };
    this.getCountryList = function (model) {
        return $http.get("/api/masterconfiguration/getCountryList");
    };

    this.getProfile = function (id) {
        return $http.get("/api/masterconfiguration/getProfile", {
            params: {
                Id: id
            }
        });
    };
    this.addUpdateProfile = function (model) {

        return $http.post("/api/masterconfiguration/addUpdateProfile", model)
    };

}]); 