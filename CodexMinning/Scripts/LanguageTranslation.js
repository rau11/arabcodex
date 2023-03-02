var Language = {
    GetPageLabelsFromDB: function (pageName) {
        return $.get('/DMInspection/Account/GetLabels', { page: pageName }, function (data) {
            //debugger 
            if (data != null) {
                $('#dvForLangTable').empty();
                $('#dvForLangTable').html(data);
            }
        });
    },
    ReplaceLabelsEngtoAr: function () {
        //debugger
        var table = $('#tblLang > tbody > tr');
        $.each(table, function (i, value) {
            //debugger
            var searchText = $(value).find('td:eq( 0 )').text();
            var replaceText = $(value).find('td:eq( 1 )').text();
            var text = $('#body-lng').find("span:contains('Dashboard')").text();
            //$('#body-lng').find("span:contains(" + findLabel + ")").text(text.replace(findLabel, replaceLabel));
            //$('#body-lng').find("span:contains('Dashboard')").text(text.replace(findLabel, replaceLabel));

            var elmentType = "";
            $('.translateLng').each(function () {
               // debugger
                try {
                    elementType = $(this).get(0).tagName;
                    switch (elementType) {
                        case "SPAN":
                            if ($.trim(searchText).toLowerCase() == $.trim($(this).text()).toLowerCase()) {
                                $(this).text(replaceText);
                            }
                            break;
                        case "INPUT":
                            if ($.trim(searchText).toLowerCase() == $.trim($(this).val()).toLowerCase()) {
                                $(this).val(replaceText);
                            }
                            break;
                        default:
                            if ($.trim(searchText).toLowerCase() == $.trim($(this).text()).toLowerCase()) {
                                $(this).text(replaceText);
                            }
                            break;
                    }
                } catch (e) { }
            });


        });
    },
    ReplaceLabelsArtoEng: function () {
        //debugger
        var table = $('#tblLang > tbody > tr');
        $.each(table, function (i, value) {
            //debugger
            var replaceText = $(value).find('td:eq( 0 )').text();
            var searchText  = $(value).find('td:eq( 1 )').text();
            var text = $('#body-lng').find("span:contains('Dashboard')").text();
            //$('#body-lng').find("span:contains(" + findLabel + ")").text(text.replace(findLabel, replaceLabel));
            //$('#body-lng').find("span:contains('Dashboard')").text(text.replace(findLabel, replaceLabel));

            var elmentType = "";
            $('.translateLng').each(function () {
                // debugger
                try {
                    elementType = $(this).get(0).tagName;
                    switch (elementType) {
                        case "SPAN":
                            if ($.trim(searchText).toLowerCase() == $.trim($(this).text()).toLowerCase()) {
                                $(this).text(replaceText);
                            }
                            break;
                        case "INPUT":
                            if ($.trim(searchText).toLowerCase() == $.trim($(this).val()).toLowerCase()) {
                                $(this).val(replaceText);
                            }
                            break;
                        default:
                            if ($.trim(searchText).toLowerCase() == $.trim($(this).text()).toLowerCase()) {
                                $(this).text(replaceText);
                            }
                            break;
                    }
                } catch (e) { }
            });


        });
    }
};


var LanguageCommonFuncationality = {
    ChangePageTextAccordingToUserPreference: function (pageName) { 
        var ajaxData = Language.GetPageLabelsFromDB(pageName);
        ajaxData.done(function (e) {
            languagePreference = $('#userLanguagePreferenceInput').val();               
            if (languagePreference == "1") {
                Language.ReplaceLabelsArtoEng();
            }
            else if (languagePreference == "2") {
                Language.ReplaceLabelsEngtoAr();
            }
        });
    }
};