var app = angular.module("smartInspectionApp",
    [
        'ngStorage',
        'datatables',
        'datatables.buttons',
        'ui.bootstrap',
        'ui.select',
        'ngSanitize', 
        'ui.validate',
        'toaster',
        'ngAnimate',
        'oitozero.ngSweetAlert',
        'ui.bootstrap.datepicker',
        'ui.bootstrap.alert',  
        '720kb.datepicker'
    ]);

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

app.directive('fancybox', ['$compile',function ($compile) {
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
            //var FromDate = new Date(data.FromDate).toISOString();
            //data.FromDate = FromDate;
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

////by Shabs
//app.config(['$httpProvider', function ($httpProvider) {
//    $httpProvider.interceptors.push('authInterceptorService'); 
//}]);

//app.filter('secondsToDateTime', function () {
//    return function (seconds) {
//        var d = new Date(0, 0, 0, 0, 0, 0, 0);
//        d.setSeconds(seconds);
//        return d;
//    };
//});

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

        //var dDisplay = d > 0 ? d + (d == 1 ? " day, " : " days, ") : "";
        //var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
        //var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
        //var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
        //return dDisplay + hDisplay + mDisplay + sDisplay;
        

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

            //var dDisplay = d > 0 ? d + (d == 1 ? " day, " : " days, ") : "";
            //var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
            //var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
            //var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
            //return dDisplay + hDisplay + mDisplay + sDisplay;


            scope.day = paddingTimeDigits(d);
            scope.hour = paddingTimeDigits(h);
            scope.minute = paddingTimeDigits(m);
            scope.second = paddingTimeDigits(s);
        }
    };
});


//app.filter('datetimeIncrementer', function () {
//    return function (date) {       
//        var d = new Date();
//        if (date != undefined)
//            d = new Date(date);

//        timer = setInterval(function () {

//        }, 1000);       
//        return d;
//    };
//});

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

                //var dDisplay = d > 0 ? d + (d == 1 ? " day, " : " days, ") : "";
                //var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
                //var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
                //var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
                //return dDisplay + hDisplay + mDisplay + sDisplay;

                
                scope.day = paddingTimeDigits(d) ;
                scope.hour = paddingTimeDigits(h) ;
                scope.minute = paddingTimeDigits(m);
                scope.second = paddingTimeDigits(s);
                //scope.output = $sce.trustAsHtml(angular.copy(dDisplay + hDisplay + mDisplay + sDisplay));
            };

            stopTime = $interval(tick, 1000); 
            element.on('$destroy', function () {
                $interval.cancel(stopTime);
                stopTime = null;
            }); 
        }
    };
});

// added by shabbir for filter in uiselect to start with functionality on 05 may 2019
app.filter('startswithFilter', function () {
    return function (items, props) { 
        var filtered = []; 
        //for (var i = 0; i < items.length; i++) {
        //    var item = items[i];
        //    if (lettersMatch.test(item.Name.substring(0, letters.length))) {
        //        filtered.push(item);
        //    }
        //}
        if (angular.isArray(items)) {
            items.forEach(function (item) { 
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
//https://embed.plnkr.co/plunk/gZhSIa
//https://stackoverflow.com/questions/37051434/want-to-pass-ng-repeat-object-to-custom-filter-function
//https://www.google.com/search?q=angularjs+ng-repeat+custom+filter+with+text+field&rlz=1C1GCEU_enAE819AE819&ei=-THYYK2sHYmh1fAP4PWV8AQ&oq=angularjs+ng-repeat+custom+filter+with+text+&gs_lcp=Cgdnd3Mtd2l6EAMYATIFCCEQoAEyBQghEKABMgUIIRCgAToFCAAQkQI6BAgAEEM6AggAOggILhDHARCjAjoCCC46CAguEMcBEK8BOgQIABAKOggIABDqAhCPAToGCAAQFhAeOggIIRAWEB0QHkoECEEYAFDq3f8FWNr1gAZg3ZCBBmgKcAJ4AIABtAKIAfEnkgEIMC4yMC41LjGYAQCgAQGqAQdnd3Mtd2l6sAEKwAEB&sclient=gws-wiz
app.filter("groupBy", ["$parse", "$filter", function ($parse, $filter) {
    return function (array, groupByField) {       
        var result = [];
        var prev_item = null;
        var groupKey = false;
        var filteredData = $filter('orderBy')(array, groupByField);
        for (var i = 0; i < filteredData.length; i++) {
            groupKey = false;
            if (prev_item !== null) {
                if (prev_item[groupByField] !== filteredData[i][groupByField]) {
                    groupKey = true;
                }
            } else {
                groupKey = true;
            }
            if (groupKey) {
                filteredData[i]['group_by_key'] = true; 
            } else {
                filteredData[i]['group_by_key'] = false; 
            }
            filteredData[i]['group_by_key_value'] = filteredData[i][groupByField];
            result.push(filteredData[i]);
            prev_item = filteredData[i]; 
        }
        return result;
    }
}])