app.service("dashboardService", ['$http', function ($http) {
    
    var _getDTUrl = function (fnName) {
        //var url = "/api/dashboard/" + fnName;
        var url = "/api/dashboard/getdatatable";
        return url;
    }
    this.getDTUrl = _getDTUrl;
    this.loadData = function (model) {
        
        return $http.post("/api/dashboard/getdatatable", model)
    };

    this.addUpdate = function (model) {
        
        return $http.post("/api/dashboard/addUpdate", model)
    };
    this.getDataById = function (id) {
        return $http.get("/api/dashboard/getDataById", {
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

    this.getLookUp = function (model) {
        return $http.post("/api/masterconfiguration/getLookUp", model)
    };

    this.getLookUpAndSAResult = function (model) {

        return $http.post("/api/masterconfiguration/getLookUpAndSAResult", model)
    };
}]); 