'use strict';
app.controller('addEditController', ['$scope', '$filter', '$compile', 'masterconfigurationService', 'toaster', '$uibModal', '$uibModalInstance', 'ParamObject', function ($scope, $filter, $compile, masterconfigurationService, toaster, $uibModal, $uibModalInstance, ParamObject) {

    var InIt = function () {
        $scope.model = {};
        $scope.model.IsActive = true;
        $scope.model.IsUserRegistration = false;

        $scope.submitted = false;
        $scope.submitAndNew = false;
    };
    InIt();

    $scope.getDataById = function () {
        masterconfigurationService.getDataById($scope.model.Id).then(function (response) {
            
            $scope.model = response.data.data;
            $scope.roles = response.data.roles;
        }, function (response) {
            toaster.pop('error', 'Failure', 'Failed to load data.');
        });
    };
    $scope.addUpdate = function () {
        masterconfigurationService.addUpdate($scope.model).then(function (response) {
            
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

    $scope.addUpdateUserRoles = function (roleId) {
        
        var model = { UserId: $scope.model.Id, RoleId: roleId}
        masterconfigurationService.addUpdateUserRoles(model).then(function (response) {
            
            swal({
                text: response.data.Message,
                type: response.data.Success == true ? "success" : "error",
            }).then(function () {
                //$uibModalInstance.close(response.data.Id);
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
  
    $scope.getCountryList = function () {
        masterconfigurationService.getCountryList().then(function (response) {
            $scope.countryList = response.data;
        });
    };
    

    $scope.InItData = function () {
        
        $scope.getCountryList();
        if (ParamObject != undefined) {
            if (ParamObject.Id != undefined && ParamObject.Id > 0) {
                $scope.model.Id = parseInt(ParamObject.Id);
                $scope.getDataById($scope.model.Id);
            }
        }

    };
    $scope.InItData();


}]);