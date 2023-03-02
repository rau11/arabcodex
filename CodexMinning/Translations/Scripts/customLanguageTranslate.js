var app = angular.module('APP', ['pascalprecht.translate'])
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
    .controller('languageController', ['$scope', '$translate', function ($scope, $translate) {
        $scope.changeLanguage = function (lang, data) {
            $.post("/DMInspection/Account/UpdateLanguagePreference", { key: data }, function (result) {
                console.log(result)
            });
            $translate.use(lang);            
            if (lang == "ar") {
                $("body").addClass("arabic_language");
                $("body").removeClass("english_language");
                $(".lg-english").show();
                $(".lg-arabic").hide();                
            } else if (lang == "en") {
                $("body").addClass("english_language");
                $("body").removeClass("arabic_language");
                $(".lg-english").hide();
                $(".lg-arabic").show();                
            }

            //debugger;
            //var tables = $.fn.dataTable.tables()
            //for (var i = 0; i < tables.length; i++) {
            //    LanguageTranslateHelper.ChangeDatatableLanguage(tables[i], lang);
            //}
            
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
    //ChangeDatatableLanguage: function (dt, lang) {        
    //    if (lang == "en") {
    //        dt.language = {
    //            "sEmptyTable": "No data available in table",
    //            "sInfo": "Showing _START_ to _END_ of _TOTAL_ entries",
    //            "sInfoEmpty": "Showing 0 to 0 of 0 entries",
    //            "sInfoFiltered": "(filtered from _MAX_ total entries)",
    //            "sInfoPostFix": "",
    //            "sInfoThousands": ",",
    //            "sLengthMenu": "Show _MENU_ entries",
    //            "sLoadingRecords": "Loading...",
    //            "sProcessing": "Processing...",
    //            "sSearch": "Search:",
    //            "sZeroRecords": "No matching records found",
    //            "oPaginate": {
    //                "sFirst": "First",
    //                "sLast": "Last",
    //                "sNext": "Next",
    //                "sPrevious": "Previous"
    //            },
    //            "oAria": {
    //                "sSortAscending": ": activate to sort column ascending",
    //                "sSortDescending": ": activate to sort column descending"
    //            }
    //        }
    //    }
    //    else if (lang == "ar") {
    //        dt.language = {
    //            "sProcessing": "جارٍ التحميل...",
    //            "sLengthMenu": "أظهر _MENU_ مدخلات",
    //            "sZeroRecords": "لم يعثر على أية سجلات",
    //            "sInfo": "إظهار _START_ إلى _END_ من أصل _TOTAL_ مدخل",
    //            "sInfoEmpty": "يعرض 0 إلى 0 من أصل 0 سجل",
    //            "sInfoFiltered": "(منتقاة من مجموع _MAX_ مُدخل)",
    //            "sInfoPostFix": "",
    //            "sSearch": "ابحث:",
    //            "sUrl": "",
    //            "oPaginate": {
    //                "sFirst": "الأول",
    //                "sPrevious": "السابق",
    //                "sNext": "التالي",
    //                "sLast": "الأخير"
    //            }
    //        }
    //    }
    //    debugger;
    //    $.fn.dataTable.ColVis.fnRebuild(dt);
    //},
    SelectDatatableLanguage: function () {        
        languagePreference = $('#userLanguagePreferenceInput').val();
        if (languagePreference == "1" || languagePreference == undefined) {
            return  {
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
            return   {
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