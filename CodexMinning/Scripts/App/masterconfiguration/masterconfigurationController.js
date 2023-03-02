app.controller('masterconfigurationController', ['$scope', '$http', '$window', 'masterconfigurationService', '$localStorage', 'DTOptionsBuilder', 'DTColumnBuilder', 'toaster', 'DTColumnDefBuilder', '$uibModal', '$compile', '$location', function ($scope, $http, $window, masterconfigurationService, $localStorage, DTOptionsBuilder, DTColumnBuilder, toaster, DTColumnDefBuilder, $uibModal, $compile, $location) {

    var vm = this;
    vm.dtDataInstance = {};


    //*** PROPERTIES***// 
    var InIt = function () {
        $scope.UserRoles = {};
        $scope.searchVm = {};
    };
    InIt();
    var buttonHtml = '';


    $scope.getData = function () {
        
        var data = { Id: 0, name: "" };

        masterconfigurationService.loadData(data).then(function (response) {
            
            if (response.data.length > 0) {
                $('#datadetails').DataTable().clear().destroy();
                $scope.dataList = response.data;
                setTimeout(function () {
                    $('#datadetails').DataTable({
                        buttons: [
                            'copyHtml5',
                            'excelHtml5',
                            'csvHtml5',
                            'pdfHtml5'
                        ], dom: 'Blfrtip'
                    });
                }, 100);
            }

        }, function (response) {
            toaster.pop('error', 'Failure', 'Failed to load data.');
        });
    };
    $scope.getRoles = function () {
        
        var data = { Id: 0, name: "" };

        masterconfigurationService.getRoles(data).then(function (response) {
            
            if (response.data.length > 0) {
                $('#tblRoles').DataTable().clear().destroy();
                $scope.roleList = response.data;
                setTimeout(function () {
                    $('#tblRoles').DataTable({
                        buttons: [
                            'copyHtml5',
                            'excelHtml5',
                            'csvHtml5',
                            'pdfHtml5'
                        ], dom: 'Blfrtip'
                    });
                }, 100);
            }

        }, function (response) {
            toaster.pop('error', 'Failure', 'Failed to load data.');
        });
    };
    $scope.getLookUp = function (Id) {
        
        var data = { Id: Id, name: "" };
        masterconfigurationService.getLookUp(data).then(function (response) {
            
            //if (response.data.length > 0) {
                $('#tblLookUp').DataTable().clear().destroy();
                $scope.lookUpList = response.data;
                setTimeout(function () {
                    $('#tblLookUp').DataTable({
                        buttons: [
                            'copyHtml5',
                            'excelHtml5',
                            'csvHtml5',
                            'pdfHtml5'
                        ], dom: 'Blfrtip'
                    });
                }, 100);
            //}

        }, function (response) {
            toaster.pop('error', 'Failure', 'Failed to load data.');
        });
    };
    $scope.getData();
    $scope.getRoles();
    $scope.getLookUp(0);
    $scope.checkUserRoles = function () {
        
        masterconfigurationService.checkUserRoles(0).then(function (response) {
            
            if (response.data) {
                $scope.UserRoles = response.data;
            }

        }, function (response) {
            toaster.pop('error', 'Failure', 'Failed to load user roles.');
        });
    };
    //$scope.checkUserRoles();
    $scope.ClearSearch = function () {
        //vm.RequestNumber = undefined;
        // $scope.getPagedDataAsync();
    };
    $scope.ClearLookUpSearch = function () {
        $scope.searchVm.TypeId = undefined;
        $scope.getLookUp(0);
    };
    $scope.getTypes = function () {
        masterconfigurationService.getTypes(0).then(function (response) {
            
            $scope.TypeList = response.data;
        }, function (response) {
            toaster.pop('error', 'Failure', 'Failed to load data.');
        });
    };
    //$scope.getLookUpByTypeId = function (Id) {
    //    masterconfigurationService.getLookUpByTypeId(Id).then(function (response) {
    //        
    //        $scope.LookUpList = response.data;
    //    }, function (response) {
    //        toaster.pop('error', 'Failure', 'Failed to load data.');
    //    });
    //};
    $scope.searchLookUp = function (Id) {
        if ($scope.searchVm.TypeId != undefined && $scope.searchVm.TypeId != "" && $scope.searchVm.TypeId != null) {
            $scope.getLookUp($scope.searchVm.TypeId);
        }

    };
    $scope.getTypes();
    $scope.addEdit = function (id) {
        
        $scope.openAddPopUp(id);
    };
    $scope.openAddPopUp = function (Id) {
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: '/MasterConfiguration/AddEdit',
            scope: $scope,
            size: 'lg',
            backdrop: 'static',
            keyboard: false,
            controller: 'addEditController',
            controllerAs: 'ctrl',
            resolve: {
                ParamObject: function () {
                    var obj = {};
                    obj.Id = Id;
                    return obj;
                }
            }
        });

        $scope.modelInstance = modalInstance;
        modalInstance.result.then(function (Id) {
            
            if (Id != undefined)
                $scope.getData();
            return true;
        }, function () {
            return false;
        });
    };
    $scope.addEditRole = function (id) {
        
        $scope.openAddPopUpForRole(id, true);
    };
    $scope.openAddPopUpForRole = function (Id, IsRole) {
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: '/MasterConfiguration/AddEditRole',
            scope: $scope,
            size: 'lg',
            backdrop: 'static',
            keyboard: false,
            controller: 'addEditRoleController',
            controllerAs: 'ctrl',
            resolve: {
                ParamObject: function () {
                    var obj = {};
                    obj.Id = Id;
                    obj.IsRole = IsRole;
                    return obj;
                }
            }
        });

        $scope.modelInstance = modalInstance;
        modalInstance.result.then(function (Id) {
            
            if (Id != undefined)
                $scope.getRoles();
            return true;
        }, function () {
            return false;
        });
    };


    $scope.addEditLookUp = function (id) {
        
        $scope.openAddPopUpForLookUp(id, false);
    };
    $scope.openAddPopUpForLookUp = function (Id, IsRole) {
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: '/MasterConfiguration/AddEditLKP',
            scope: $scope,
            size: 'lg',
            backdrop: 'static',
            keyboard: false,
            controller: 'addEditLKPController',
            controllerAs: 'ctrl',
            resolve: {
                ParamObject: function () {
                    var obj = {};
                    obj.Id = Id;
                    obj.IsRole = IsRole;
                    return obj;
                }
            }
        });

        $scope.modelInstance = modalInstance;
        modalInstance.result.then(function (Id) {
            
            if (Id != undefined)
                $scope.getLookUp($scope.searchVm.TypeId);
            return true;
        }, function () {
            return false;
        });
    };

    $scope.preventToShowHashInUrl = function (evnt) {
        evnt.preventDefault();
    }
}]);