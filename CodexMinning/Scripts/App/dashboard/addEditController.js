'use strict';
app.controller('addEditController', ['$scope', '$filter', '$compile', 'dashboardService', 'toaster', '$uibModal', '$uibModalInstance', 'ParamObject', function ($scope, $filter, $compile, dashboardService, toaster, $uibModal, $uibModalInstance, ParamObject) {

    var InIt = function () {
        $scope.model = {};
        $scope.lookUpList = [];
        $scope.lookUpUnit = [];
        $scope.lookUpSAList = [];
        $scope.model.IsActive = true;

        $scope.submitted = false;
        $scope.submitAndNew = false;
        $scope.isEdit = true;
    };
    InIt();

    $scope.getDataById = function () {
        dashboardService.getDataById($scope.model.Id).then(function (response) {
            
            $scope.model = response.data;
        }, function (response) {
            toaster.pop('error', 'Failure', 'Failed to load data.');
        });
    };
    $scope.addUpdate = function () {
        dashboardService.addUpdate($scope.model).then(function (response) {
            
                swal({
                    text: response.data.Message,
                    type: response.data.Success == true ? "success" : "error",
                }).then(function () {
                    $uibModalInstance.close(response.data.Id);
                });

        }, function (response) {
            toaster.pop('error', 'Failure', 'Failed to submit.');
        });
    };

   
    $scope.validateInput = function (name, type) {
        var input = $scope.Form[name];
        return (input.$dirty || $scope.submitted) && input.$error[type];
    };

    $scope.submitForm = function () {
        $scope.submitted = true;
        console.log($scope.submitAndNew)
        if ($scope.Form.$valid) {
            console.log('Submitted!!');
            $scope.addUpdate();

        } else {
            console.log('Not valid!!');
            return false;
        }
    };

    $scope.closeThisModel = function () {
        $uibModalInstance.dismiss('cancel');
    };
    $scope.getLookUp = function () {
        
        var data = { Id: 0, name: "" };
        dashboardService.getLookUpAndSAResult(data).then(function (response) {
            debugger;
            $scope.lookUpSAList = response.data.dataSA;
            $scope.lookUpList = response.data.data;
            $scope.lookUpUnit = response.data.data.filter(x => x.TypeName == "Unit");

        }, function (response) {
            toaster.pop('error', 'Failure', 'Failed to load lookup.');
        });
    };
    $scope.getLookUp();

   
    $scope.InItData = function () {
        
        if (ParamObject != undefined) {
            if (ParamObject.Id != undefined && ParamObject.Id > 0) {
                $scope.model.Id = parseInt(ParamObject.Id);
                $scope.isEdit = ParamObject.isEdit;
                $scope.getDataById($scope.model.Id);
            } else {
                $scope.isEdit = false;
            }
        }

    };
    $scope.InItData();

    //$scope.getSelected = function (expected, actual) {
    //    debugger;
    //    return actual.indexOf(expected) > -1;
    //};
}]);