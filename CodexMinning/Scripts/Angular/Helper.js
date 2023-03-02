//app.directive('access', function (userService) {
//        return {
//            restrict: 'A',
//            link: function (scope, element, attrs) {
//                var makeVisible = function () {
//                    element.removeClass('accesshidded');
//                },
//                    makeHidden = function () {
//                        element.addClass('accesshidded');
//                    },
//                    determineVisibility = function (resetFirst) {
//                        var result;
//                        if (resetFirst) {
//                            makeVisible();
//                        }

//                        result = userService.authorize(roles);
//                        if (result) {
//                            makeVisible();
//                        } else {
//                            makeHidden();
//                        }
//                    },
//                    roles = attrs.access.split(',');


//                if (roles.length > 0) {
//                    determineVisibility(true);
//                }
//            }
//        };
//    });


app.directive('access', ['userService', '$http', '$localStorage', function (userService, $http, $localStorage) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var makeVisible = function () {
                element.removeClass('accesshidded');
            },
                makeHidden = function () {
                    element.addClass('accesshidded');
                },
                determineVisibility = function (resetFirst) {
                    var result;
                    if (resetFirst) {
                        makeVisible();
                    }

                    if ($localStorage.Permissions === undefined) {
                        if ($localStorage.accessDone === undefined) {                            
                            $http.get("/api/user/getUserPermissions").then(function (response) {
                                $localStorage.Permissions = response.data;
                                result = userService.authorize(roles);
                                if (result) {
                                    makeVisible();
                                } else {
                                    makeHidden();
                                }
                            }, function (response) {
                                console.log('local call')
                                $localStorage.Permissions = [];
                                result = userService.authorize(roles);
                                if (result) {
                                    makeVisible();
                                } else {
                                    makeHidden();
                                }
                            });
                        } 
                        $localStorage.accessDone = 'done'
                    } else {                        
                        $localStorage.accessDone = undefined;
                        result = userService.authorize(roles);
                        if (result) {
                            makeVisible();
                        } else {
                            makeHidden();
                        }
                    } 
                },
                roles = attrs.access.split(',');


            if (roles.length > 0) {
                determineVisibility(true);
            }
        }
    };
}]);