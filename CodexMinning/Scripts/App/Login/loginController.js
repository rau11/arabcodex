var app = angular.module("codexLoginApp", ['pascalprecht.translate'])
    .config(function ($translateProvider) {
        $translateProvider.useStaticFilesLoader({
            prefix: '/Translations/',
            suffix: '.json'
        });
        languagePreference = $('#userLanguagePreferenceInput').val();
        if (languagePreference == "1" || languagePreference == undefined) {
            $translateProvider.preferredLanguage('en');
            $("body").addClass("english_language");
            $("body").removeClass("arabic_language");
            $(".lg-english").hide();
            $(".lg-arabic").show();
        }
        else if (languagePreference == "2") {
            $translateProvider.preferredLanguage('ar');
            $("body").addClass("arabic_language");
            $("body").removeClass("english_language");
            $(".lg-english").show();
            $(".lg-arabic").hide();
        }

    })
    .controller('loginController', ['$scope', '$window', 'loginService', '$translate', function ($scope, $window, loginService, $translate) {

        var InIt = function () {

            $scope.login = {};
            $scope.isValidUser = false;
            $scope.LoginValid = false;
            $scope.islogin = true;
            $scope.inValidMessage = "";


            $scope.URLogin = {};
            $scope.URLogin.IsActive = true;
            $scope.URLogin.IsUserRegistration = true;
            $scope.LoginValidUR = false;
            $scope.isValidUserUR = false;
            $scope.inValidMessageUR = "";


            $scope.emailFormat = /^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/;
            $scope.pattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;
        };
        InIt();
        $scope.submit = function () {

            $scope.submitted = true;
            $scope.isValidUser = false;
            $scope.LoginValid = true;
            console.log($scope.submitAndNew);
            if ($scope.Form.$valid) {
                console.log('Submitted!!');
                loginService.submit($scope.login).then(function (response) {

                    if (!response.data.Success) {
                        $scope.isValidUser = true;
                        $scope.inValidMessage = response.data.Message;
                    } else {
                        $scope.isValidUser = false;
                        window.location.href = "/Dashboard/Index";
                    }
                    $scope.LoginValid = false;
                });
            } else {
                console.log('Not valid!!');
                $scope.LoginValid = false;
                return false;
            }
        };

        $scope.validateInput = function (name, type) {

            var input = $scope.Form[name];
            return (input.$dirty || $scope.submitted) && input.$error[type];
        };


        $scope.submitUR = function () {
            //$scope.Clearall();
            //return false;
            $scope.submittedUR = true;
            $scope.isValidUserUR = false;
            $scope.LoginValidUR = true;

            if ($scope.URLogin.Password != $scope.URLogin.CPassword) {
                $scope.LoginValidUR = false;
                $scope.URForm.$valid = false;
            }

            if ($scope.URForm.$valid) {

                $scope.URLogin.UserName = $scope.URLogin.Email;
                console.log('Submitted!!');

                loginService.addUsers($scope.URLogin).then(function (response) {

                    var type = "success";
                    if (!response.data.Success) {
                        type = "error";
                    }
                    //swal("User Registeration", response.data.Message, type);

                    $scope.LoginValidUR = false;

                    swal({
                        title: "User Registeration !",
                        text: response.data.Message,
                        icon: type
                    }).then(function (res) {

                        $scope.isValidUserUR = true;
                        $scope.inValidMessageUR = response.data.Message;

                        if (response.data.Success == true) {
                            location.reload();
                        }

                    });

                });
            } else {
                console.log('Not valid!!');
                $scope.LoginValidUR = false;
            }
        };


        $scope.validateInputUR = function (name, type) {

            var input = $scope.URForm[name];
            return (input.$dirty || $scope.submittedUR) && input.$error[type];
        };

        $scope.getCountryList = function () {
            loginService.getCountryList().then(function (response) {
                $scope.countryList = response.data;
            });
        };
        $scope.getCountryList();

        $scope.Clearall = function () {

            $scope.URLogin = { "FullName": "", "Email": "", "Password": "", "CPassword": "", "CountryId": "", "Organization": "" };
            $scope.defaultFormData = angular.copy($scope.URLogin);
            $scope.URForm.$setUntouched();
        }

        $scope.showHideLoginAndRegistration = function (id, val) {

            if (val == true) {
                $("#divSignIn").show();
                $("#divRegistration").hide();
            }
            else {
                $("#divSignIn").hide();
                $("#divRegistration").show();
            }


        }

        $scope.changeLanguage = function (lang, data) {
            debugger;
            //$.post("/DMInspection/Account/UpdateLanguagePreference", { key: data }, function (result) {
            //    console.log(result)
            //});
            $translate.use(lang);
            if (lang == "ar") {
                $("body").addClass("arabic_language");
                $("body").removeClass("english_language");
                $("#ancEnglish").show();
                $("#ancArabic").hide();
                $("#btnLogin").addClass("buttonwidth");
            } else if (lang == "en") {
                $("body").addClass("english_language");
                $("body").removeClass("arabic_language");
                $("#ancEnglish").hide();
                $("#ancArabic").show();
                $("#btnLogin").removeClass("buttonwidth");
            }

        };

    }]);



var LanguageTranslateHelper = {
    ChangeDynamicHTML: function (html) {
        return angular.element(document).injector().invoke(function ($compile, $rootScope) {
            html = $compile(html)($rootScope);
            return html;
        });
    },
    ChangeDatatableLanguage: function (dt) {
        languagePreference = $('#userLanguagePreferenceInput').val();
        if (languagePreference == "1" || languagePreference == undefined) {
            dt.language = {
                "sEmptyTable": "No data available in table",
                "sInfo": "Showing _START_ to _END_ of _TOTAL_ entries",
                "sInfoEmpty": "Showing 0 to 0 of 0 entries",
                "sInfoFiltered": "(filtered from _MAX_ total entries)",
                "sInfoPostFix": "",
                "sInfoThousands": ",",
                "sLengthMenu": "Show _MENU_ entries",
                "sLoadingRecords": "Loading...",
                "sProcessing": "Processing...",
                "sSearch": "Search:",
                "sZeroRecords": "No matching records found",
                "oPaginate": {
                    "sFirst": "First",
                    "sLast": "Last",
                    "sNext": "Next",
                    "sPrevious": "Previous"
                },
                "oAria": {
                    "sSortAscending": ": activate to sort column ascending",
                    "sSortDescending": ": activate to sort column descending"
                }
            }
        }
        else if (languagePreference == "2") {
            dt.language = {
                "sProcessing": "جارٍ التحميل...",
                "sLengthMenu": "أظهر _MENU_ مدخلات",
                "sZeroRecords": "لم يعثر على أية سجلات",
                "sInfo": "إظهار _START_ إلى _END_ من أصل _TOTAL_ مدخل",
                "sInfoEmpty": "يعرض 0 إلى 0 من أصل 0 سجل",
                "sInfoFiltered": "(منتقاة من مجموع _MAX_ مُدخل)",
                "sInfoPostFix": "",
                "sSearch": "ابحث:",
                "sUrl": "",
                "oPaginate": {
                    "sFirst": "الأول",
                    "sPrevious": "السابق",
                    "sNext": "التالي",
                    "sLast": "الأخير"
                }
            }
        }
    },
   
    SelectDatatableLanguage: function () {
        languagePreference = $('#userLanguagePreferenceInput').val();
        if (languagePreference == "1" || languagePreference == undefined) {
            return {
                "sEmptyTable": "No data available in table",
                "sInfo": "Showing _START_ to _END_ of _TOTAL_ entries",
                "sInfoEmpty": "Showing 0 to 0 of 0 entries",
                "sInfoFiltered": "(filtered from _MAX_ total entries)",
                "sInfoPostFix": "",
                "sInfoThousands": ",",
                "sLengthMenu": "Show _MENU_ entries",
                "sLoadingRecords": "Loading...",
                "sProcessing": "Processing...",
                "sSearch": "Search:",
                "sZeroRecords": "No matching records found",
                "oPaginate": {
                    "sFirst": "First",
                    "sLast": "Last",
                    "sNext": "Next",
                    "sPrevious": "Previous"
                },
                "oAria": {
                    "sSortAscending": ": activate to sort column ascending",
                    "sSortDescending": ": activate to sort column descending"
                }
            }
        }
        else if (languagePreference == "2") {
            return {
                "sProcessing": "جارٍ التحميل...",
                "sLengthMenu": "أظهر _MENU_ مدخلات",
                "sZeroRecords": "لم يعثر على أية سجلات",
                "sInfo": "إظهار _START_ إلى _END_ من أصل _TOTAL_ مدخل",
                "sInfoEmpty": "يعرض 0 إلى 0 من أصل 0 سجل",
                "sInfoFiltered": "(منتقاة من مجموع _MAX_ مُدخل)",
                "sInfoPostFix": "",
                "sSearch": "ابحث:",
                "sUrl": "",
                "oPaginate": {
                    "sFirst": "الأول",
                    "sPrevious": "السابق",
                    "sNext": "التالي",
                    "sLast": "الأخير"
                }
            }
        }
    }
};
function showHideLoginAndRegistration(val) {
    debugger;
    if (val == true) {
        $("#divSignIn").show();
        $("#divRegistration").hide();
    }
    else {
        $("#divSignIn").hide();
        $("#divRegistration").show();
    }


}

    

