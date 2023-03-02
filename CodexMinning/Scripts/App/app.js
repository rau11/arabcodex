
//agGrid.initialiseAgGridWithAngular1(angular);
var app = angular.module("codexApp",
    [
        'ngStorage',
        'datatables',
        'datatables.buttons',
        'ui.bootstrap',
        'ui.select',
        'ngSanitize',
        'angularFileUpload',
        'ui.validate',
        'toaster',
        'ngAnimate',
        'oitozero.ngSweetAlert',
        'ui.bootstrap.datepicker',
        'ui.bootstrap.alert',
        'chart.js',
        //'pascalprecht.translate',
        '720kb.datepicker',
        'gfl.textAvatar'
        //'agGrid'

    ]);
app.controller('mainController', ['$scope', '$http', '$window',  '$localStorage', 'DTOptionsBuilder', 'DTColumnBuilder', 'toaster', 'DTColumnDefBuilder', '$uibModal', '$compile', '$location', function ($scope, $http, $window, $localStorage, DTOptionsBuilder, DTColumnBuilder, toaster, DTColumnDefBuilder, $uibModal, $compile, $location) {



    $scope.addEdit = function (id) {
        
        $scope.openAddPopUp(id);
    };
    $scope.openAddPopUp = function (Id) {
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: '/Dashboard/Profile',
            scope: $scope,
            size: 'lg',
            backdrop: 'static',
            keyboard: false,
            controller: 'profileController',
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
                return true;
        }, function () {
            return false;
        });
    };


}]);
app.filter('propsFilter', function () {
    return function (items, props) {
        var out = [];

        if (angular.isArray(items)) {
            items.forEach(function (item) {
                var itemMatches = false;

                var keys = Object.keys(props);
                for (var i = 0; i < keys.length; i++) {
                    var prop = keys[i];
                    var text = props[prop].toLowerCase();
                    if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
                        itemMatches = true;
                        break;
                    }
                }

                if (itemMatches) {
                    out.push(item);
                }
            });
        } else {
            // Let the output be the input untouched
            out = items;
        }

        return out;
    };
});
angular.module('ui.validate', []).directive('uiValidate', function () {
    'use strict';

    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, elm, attrs, ctrl) {
            var validateFn, validators = {},
                validateExpr = scope.$eval(attrs.uiValidate);

            if (!validateExpr) { return; }

            if (angular.isString(validateExpr)) {
                validateExpr = { validator: validateExpr };
            }

            angular.forEach(validateExpr, function (exprssn, key) {
                validateFn = function (valueToValidate) {
                    var expression = scope.$eval(exprssn, { '$value': valueToValidate });
                    if (angular.isObject(expression) && angular.isFunction(expression.then)) {
                        // expression is a promise
                        expression.then(function () {
                            ctrl.$setValidity(key, true);
                        }, function () {
                            ctrl.$setValidity(key, false);
                        });
                        return valueToValidate;
                    } else if (expression) {
                        // expression is true
                        ctrl.$setValidity(key, true);
                        return valueToValidate;
                    } else {
                        // expression is false
                        ctrl.$setValidity(key, false);
                        return valueToValidate;
                    }
                };
                validators[key] = validateFn;
                ctrl.$formatters.push(validateFn);
                ctrl.$parsers.push(validateFn);
            });

            function apply_watch(watch) {
                //string - update all validators on expression change
                if (angular.isString(watch)) {
                    scope.$watch(watch, function () {
                        angular.forEach(validators, function (validatorFn) {
                            validatorFn(ctrl.$modelValue);
                        });
                    });
                    return;
                }

                //array - update all validators on change of any expression
                if (angular.isArray(watch)) {
                    angular.forEach(watch, function (expression) {
                        scope.$watch(expression, function () {
                            angular.forEach(validators, function (validatorFn) {
                                validatorFn(ctrl.$modelValue);
                            });
                        });
                    });
                    return;
                }

                //object - update appropriate validator
                if (angular.isObject(watch)) {
                    angular.forEach(watch, function (expression, validatorKey) {
                        //value is string - look after one expression
                        if (angular.isString(expression)) {
                            scope.$watch(expression, function () {
                                validators[validatorKey](ctrl.$modelValue);
                            });
                        }

                        //value is array - look after all expressions in array
                        if (angular.isArray(expression)) {
                            angular.forEach(expression, function (intExpression) {
                                scope.$watch(intExpression, function () {
                                    validators[validatorKey](ctrl.$modelValue);
                                });
                            });
                        }
                    });
                }
            }
            // Support for ui-validate-watch
            if (attrs.uiValidateWatch) {
                apply_watch(scope.$eval(attrs.uiValidateWatch));
            }
        }
    };
});
app.directive('validFile', function () {
    return {
        restrict: 'A',
        require: '?ngModel',
        link: function (scope, el, attrs, ngModel) {
            el.bind('change', function () {
                scope.$apply(function () {
                    ngModel.$setViewValue(el.val());
                });
            });
        }
    };
});
app.directive('fancybox', ['$compile', function ($compile) {
    return {
        restrict: 'A',
        replace: false,
        link: function ($scope, element, attrs) {

            $scope.open_fancybox = function () {

                var el = angular.element(element.html()),

                    compiled = $compile(el);

                $.fancybox.open(el);

                compiled($scope);

            };
        }
    };
}]);
app.run(['$rootScope', function ($rootScope) {

    $rootScope.correctGivenDate = function (date) {
        if (date != null && date != undefined && date != "") {
            var d = new Date(date);
            var userTimezoneOffset = d.getTimezoneOffset() * 60000;
            if (userTimezoneOffset < 0)
                date = new Date(d.getTime() - userTimezoneOffset);
            else
                date = new Date(d.getTime() + userTimezoneOffset);
        }
        return date;
    };

}]);
//app.config(['$httpProvider', function ($httpProvider) {
//    $httpProvider.interceptors.push('authInterceptorService'); 
//}]);
function paddingTimeDigits(digit) {

    var zpad = digit + '';
    if (digit < 10) {
        zpad = "0" + zpad;
    }
    return zpad;
}
app.filter('secondsToDhms', function () {
    return function (seconds) {
        seconds = Number(seconds);
        var d = Math.floor(seconds / (3600 * 24));
        var h = Math.floor(seconds % (3600 * 24) / 3600);
        var m = Math.floor(seconds % 3600 / 60);
        var s = Math.floor(seconds % 60);


        var dDisplay = paddingTimeDigits(d) + "d - ";
        var hDisplay = paddingTimeDigits(h) + "h:";
        var mDisplay = paddingTimeDigits(m) + "m";
        return dDisplay + hDisplay + mDisplay;
    };
});
app.directive('secondsToDhms', function () {
    return {
        restrict: 'EA',
        scope: {
            time: '=time'
        },
        template: '<span><div class="text_timing"><span class="text_day inner_count" ng-bind="day"></span><span>Day</span></div><div class="text_timing"><span class="text_hour inner_count" ng-bind="hour"></span><span>Hrs</span></div><div class="text_timing"><span class="text_minute inner_count" ng-bind="minute"></span><span>Min</span></div><div class="text_timing"><span class="text_second inner_count" ng-bind="second"></span><span>Sec</span></div></span>',
        link: function (scope, element, attrs) {
            if (scope.time == undefined)
                scope.time = 0;

            seconds = Number(scope.time);
            var d = Math.floor(seconds / (3600 * 24));
            var h = Math.floor(seconds % (3600 * 24) / 3600);
            var m = Math.floor(seconds % 3600 / 60);
            var s = Math.floor(seconds % 60);


            scope.day = paddingTimeDigits(d);
            scope.hour = paddingTimeDigits(h);
            scope.minute = paddingTimeDigits(m);
            scope.second = paddingTimeDigits(s);
        }
    };
});
app.directive('timeIncrementer', function ($interval, $sce) {
    return {
        restrict: 'EA',
        scope: {
            time: '=time'
        },
        template: '<span><div class="text_timing"><span class="text_day inner_count" ng-bind="day"></span><span>Day</span></div><div class="text_timing"><span class="text_hour inner_count" ng-bind="hour"></span><span>Hrs</span></div><div class="text_timing"><span class="text_minute inner_count" ng-bind="minute"></span><span>Min</span></div><div class="text_timing"><span class="text_second inner_count" ng-bind="second"></span><span>Sec</span></div></span>',
        link: function (scope, element, attrs) {
            if (scope.time == undefined)
                scope.time = 0;

            var tick = function () {
                scope.time = scope.time + 1;
                seconds = Number(scope.time);
                var d = Math.floor(seconds / (3600 * 24));
                var h = Math.floor(seconds % (3600 * 24) / 3600);
                var m = Math.floor(seconds % 3600 / 60);
                var s = Math.floor(seconds % 60);



                scope.day = paddingTimeDigits(d);
                scope.hour = paddingTimeDigits(h);
                scope.minute = paddingTimeDigits(m);
                scope.second = paddingTimeDigits(s);

            };

            stopTime = $interval(tick, 1000);
            element.on('$destroy', function () {
                $interval.cancel(stopTime);
                stopTime = null;
            });
        }
    };
});

app.filter('startswithFilter', function () {
    debugger;
    return function (items, props) {
        var filtered = [];
        //for (var i = 0; i < items.length; i++) {
        //    var item = items[i];
        //    if (lettersMatch.test(item.Name.substring(0, letters.length))) {
        //        filtered.push(item);
        //    }
        //}
        debugger;
        if (angular.isArray(items)) {
            debugger;
            items.forEach(function (item) {
                debugger;
                var keys = Object.keys(props);
                for (var i = 0; i < keys.length; i++) {
                    var prop = keys[i];
                    var text = props[prop].toLowerCase();
                    var lettersMatch = new RegExp(text, 'i');
                    if (item[prop] != null && item[prop] != undefined) {
                        if (lettersMatch.test(item[prop].toString().toLowerCase().substring(0, text.length))) {
                            filtered.push(item);
                            break;
                        }
                    }
                    else {
                        // filtered.push(item);
                        break;
                    }
                }
            });
        } else {
            // Let the output be the input untouched
            filtered = items;
        }
        return filtered;
    };
}); 
app.filter('dropdownFilter', function () {
    return function (items, props) {
        var out = [];

        if (angular.isArray(items)) {
            items.forEach(function (item) {
                var itemMatches = false;
                var canbreak = false;

                // Filter out logically deleted records
                if (item.Deleted != 0)
                    itemMatches = false;
                else {
                    var keys = Object.keys(props);

                    for (var i = 0; i < keys.length; i++) {
                        var prop = keys[i];
                        var text = "";
                        // If an object, e.g. searching deep, such as Project: {ProjectName: $select.search}
                        // Then iterate through the object to find values.  
                        // NOTE: This one searches one deep from each object,
                        // e.g. Project.ProjectName
                        //      Project.User.LastName WILL NOT WORK.
                        if (angular.isObject(props[prop])) {
                            angular.forEach(props[prop], function (value, key) {
                                text = value.toLowerCase();
                                if (item[prop][key].toLowerCase().indexOf(text) !== -1) {
                                    itemMatches = true;
                                    canbreak = true;
                                }
                            });
                            if (canbreak)
                                break;
                        }
                        // If it's a simple array, then woo!
                        else {
                            text = props[prop].toLowerCase();
                            if (item[prop] != undefined && item[prop].toString().toLowerCase().indexOf(text) !== -1) {
                                itemMatches = true;
                                break;
                            }
                        }
                    }
                }

                if (itemMatches) {
                    out.push(item);
                }
            });
        }
        else {
            // Let the output be the input untouched
            out = items;
        }

        return out;
    }
});