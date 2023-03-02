'use strict';
app.controller('addEditLKPController', ['$scope', '$filter', '$compile', 'masterconfigurationService', 'toaster', '$uibModal', '$uibModalInstance', 'ParamObject', function ($scope, $filter, $compile, masterconfigurationService, toaster, $uibModal, $uibModalInstance, ParamObject) {

    var InIt = function () {
        $scope.model = {};
        $scope.model.IsActive = true;

        $scope.submitted = false;
        $scope.submitAndNew = false;
    };
    InIt();

    $scope.addUpdate = function () {
        masterconfigurationService.addUpdateLookUp($scope.model).then(function (response) {
            
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

    $scope.getDataById = function () {
        masterconfigurationService.getLookUpById($scope.model.Id).then(function (response) {
            
            $scope.model = response.data;
        }, function (response) {
            toaster.pop('error', 'Failure', 'Failed to load data.');
        });
    };
    $scope.getTypes = function () {
        masterconfigurationService.getTypes(0).then(function (response) {
            
            $scope.TypeList = response.data;
        }, function (response) {
            toaster.pop('error', 'Failure', 'Failed to load data.');
        });
    };
    $scope.InItData = function () {
        
        if (ParamObject != undefined) {
            if (ParamObject.Id != undefined && ParamObject.Id > 0) {
                $scope.model.Id = parseInt(ParamObject.Id);
                $scope.getDataById($scope.model.Id);
            }
        }
        $scope.getTypes();

    };
    $scope.InItData();


}]);