app.controller('dashboardController', ['$scope', '$http', '$window', 'dashboardService', '$localStorage', 'DTOptionsBuilder', 'DTColumnBuilder', 'toaster', 'DTColumnDefBuilder', '$uibModal', '$compile', '$location', function ($scope, $http, $window, dashboardService, $localStorage, DTOptionsBuilder, DTColumnBuilder, toaster, DTColumnDefBuilder, $uibModal, $compile, $location) {



    $scope.checkUserRoles = function () {

        dashboardService.checkUserRoles(0).then(function (response) {

            if (response.data) {
                $scope.UserRoles = response.data;
            }

        }, function (response) {
            toaster.pop('error', 'Failure', 'Failed to load user roles.');
        });
    };
    $scope.checkUserRoles();

    var vm = this;
    vm.dtDataInstance = {};


    //*** PROPERTIES***// 
    var InIt = function () {
        $scope.UserRoles = {};
        $scope.currentPage = 1;
        $scope.pagination = {
            pageCount: 0,
            currentPage: 1,
            PriceFrom: 0,
            PriceTo: 0,
        };
        $scope.PazeIndex = 1;
        $scope.PageSize = 8;
        $scope.Search = "";

        $scope.AllSearch = {};

        vm.Year = "";
        vm.Country = "";
        vm.FoodCategory = "";
        vm.Contaminant = "";
        vm.FoodGroup = "";
        vm.FoodIdentifier = "";
        vm.FoodCode = "";
        vm.FoodOrigin = "";
        vm.FoodName = "";
        vm.FoodAnalyzed = "";
        vm.StudyObjective = "";
        vm.SamplingPlan = "";
        vm.AnalyticalTechnique = "";
        vm.QualityAssurance = "";
        vm.LOD = "";
        vm.LODUnit = "";
        vm.LOQ = "";
        vm.LOQUnit = "";
        vm.Recovery = "";
        vm.Concentration = "";
        vm.ConcentrationRangeMax = "";
        vm.Average = "";
        vm.Median = "";
        vm.Unit = "";
        vm.RSD = "";
        vm.SamplesBelow = "";
        vm.IndividualSampleAverageResults = "";
        vm.Referece = "";

    };
    InIt();
    var buttonHtml = '';

    vm.dtOptions = DTOptionsBuilder.newOptions()
        .withDOM('lrtip')
        .withOption('ajax', {
            url: dashboardService.getDTUrl('getdatatable'),
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            data: function (data) {


                if ($scope.Search != "" && $scope.Search != undefined) {
                    data.search.value = $scope.Search;
                }
                if (data.length == 0 || data.length == "" || data.length == null || data.length == undefined) {
                    data.length = 10;
                }
                if (data.start > 0) {
                    data.start = (data.start / data.length) + 1;
                }

                //for (i = 0; i < data.columns.length; i++) {

                //}


                data.Year = vm.Year;
                data.Country = vm.Country;
                data.FoodCategory = vm.FoodCategory;
                data.Contaminant = vm.Contaminant;
                data.FoodGroup = vm.FoodGroup;
                data.FoodIdentifier = vm.FoodIdentifier;
                data.FoodCode = vm.FoodCode;
                data.FoodOrigin = vm.FoodOrigin;
                data.FoodName = vm.FoodName;
                data.FoodAnalyzed = vm.FoodAnalyzed;
                data.StudyObjective = vm.StudyObjective;
                data.SamplingPlan = vm.SamplingPlan;
                data.AnalyticalTechnique = vm.AnalyticalTechnique;
                data.QualityAssurance = vm.QualityAssurance;
                data.LOD = vm.LOD;
                data.LODUnit = vm.LODUnit;
                data.LOQ = vm.LOQ;
                data.LOQUnit = vm.LOQUnit;
                data.Recovery = vm.Recovery;
                data.Concentration = vm.Concentration;
                data.ConcentrationRangeMax = vm.ConcentrationRangeMax;
                data.Average = vm.Average;
                data.Median = vm.Median;
                data.Unit = vm.Unit;
                data.RSD = vm.RSD;
                data.SamplesBelow = vm.SamplesBelow;
                data.IndividualSampleAverageResults = vm.IndividualSampleAverageResults;
                data.Referece = vm.Referece;

                data.Id = 0;
                data.name = "";
                return JSON.stringify(data);
            }
        })
        .withDataProp('data')
        .withOption('initComplete', function () {
            $scope.loading = false;
        })
        .withButtons([
            {
                extend: "excelHtml5",
                filename: "CodexMinning",
                title: "Codex Minning",
                exportOptions: {
                    columns: ":not(.not-export-column)"
                },
                exportData: { decodeEntities: true }
            },
            {
                extend: "csvHtml5",
                filename: "CodexMinning",
                title: "Codex Minning",
                exportOptions: {
                    columns: ":not(.not-export-column)"
                },
                exportData: { decodeEntities: true }
            },

            {
                extend: 'print',
                filename: "CodexMinning",
                title: "Codex Minning",
                autoPrint: false,
                exportOptions: {
                    columns: ":not(.not-export-column)"
                }
            }
        ])
        //.withOption('processing', true)
        .withOption('serverSide', true)
        .withOption('paging', true)
        .withOption('searchable', true)
        .withOption('retrieve', true)
        .withOption('autoWidth', true)
        .withOption('order', [[0, "desc"]])
        .withOption('responsive', false)
        .withOption('headerCallback', function (thead, data, start, end, display) {

            // Recompiling so we can bind Angular directive to the DT 
            $compile(angular.element(thead).contents())($scope);
        })
        .withOption('createdRow', function (row) {

            // Recompiling so we can bind Angular directive to the DT 
            $compile(angular.element(row).contents())($scope);
        });
    //DTDefaultOptions.setLoadingTemplate('<img src="images/loading_spinner.gif" />');


    vm.dtColumns = [
        /*
        DTColumnBuilder.newColumn('Id').withTitle('Action').withClass('not-export-column').withOption('width', '20%').withOption('white-space', 'nowrap').notSortable().renderWith(function (data, type, row, meta) {

            var html = '';

            //RJ: Commented to bring 
           if ($scope.UserRoles.Admin || !$scope.UserRoles.Read) {
                html = html + '<a ng-click="addEdit(' + row.Id + ',false)" style="cursor:pointer;" uib-tooltip="Edit" class="btn btn-secondry m-btn m-btn--icon m-btn--icon-only btn_edit_data">'
                    + ' <i class="fa fa-edit"></i>'
                    + '</a>';
            }


            html = html + '<a ng-click="addEdit(\'' + row.Id + '\',true)" style="cursor:pointer;" uib-tooltip="View" class="btn btn-secondry m-btn m-btn--icon m-btn--icon-only btn_edit_data">'
                + ' <i class="fa fa-eye" aria-hidden="true"></i>'
                + '</a>   ';
            if (row.IsValueExists == 1) {
                html = html + '<a  href="' + row.HrefReferece + '" target="_blank"  style="cursor:pointer;" uib-tooltip="Reference" >'
                    + ' <i class="fa fa-external-link">R</i>'
                    + '</a>';
            }

            return html;
        }),*/
        //DTColumnBuilder.newColumn('Referece').withTitle('Referece').withOption('width', '10%'),
        DTColumnBuilder.newColumn('Year').withTitle('Year').withOption('width', '10%'),
        //DTColumnBuilder.newColumn('Year').withTitle('Year').withOption('width', '10%')
        //    .renderWith(function (data, type, row, meta) {
        //    var accessor = "['" + data._id + "']";
        //    var directive = 'ng-model="selected' + accessor + '"';
        //    var html = '<input type="checkbox" ' + directve + ' />';
        //    console.log(html);
        //    return html;
        //}),
        DTColumnBuilder.newColumn('Country').withTitle('Country').withOption('width', '10%'),
        DTColumnBuilder.newColumn('FoodCategory').withTitle('Food Category').withOption('width', '10%'),
        DTColumnBuilder.newColumn('Contaminant').withTitle('Contaminant').withOption('width', '10%'),
        DTColumnBuilder.newColumn('FoodGroup').withTitle('Food Group').withOption('width', '10%'),
        DTColumnBuilder.newColumn('FoodIdentifier').withTitle('WHO Food Identifier').withOption('width', '10%'),
        //DTColumnBuilder.newColumn('FoodIdentifier').withTitle('WHO Food Identifier').withOption('visible',false),
        DTColumnBuilder.newColumn('FoodCode').withTitle('WHO Food Code').withOption('width', '8%'),
        DTColumnBuilder.newColumn('FoodName').withTitle('Food Name').withOption('width', '8%'),
        DTColumnBuilder.newColumn('FoodOrigin').withTitle('Food Origin').withOption('width', '8%'),
        DTColumnBuilder.newColumn('FoodAnalyzed').withTitle('State of the Food Analyzed').withOption('width', '10%'),
        DTColumnBuilder.newColumn('StudyObjective').withTitle('Study Objective').withOption('width', '8%'),
        DTColumnBuilder.newColumn('SamplingPlan').withTitle('Sampling Plan').withOption('width', '8%'),
        DTColumnBuilder.newColumn('AnalyticalTechnique').withTitle('Analytical Technique').withOption('width', '8%'),
        DTColumnBuilder.newColumn('QualityAssurance').withTitle('Analytical Quality Assurance').withOption('width', '8%'),
        DTColumnBuilder.newColumn('LOD').withTitle('LOD').withOption('width', '8%'),
        DTColumnBuilder.newColumn('LODUnit').withTitle('LOD Unit').withOption('width', '8%'),
        DTColumnBuilder.newColumn('LOQ').withTitle('LOQ').withOption('width', '8%'),
        DTColumnBuilder.newColumn('LOQUnit').withTitle('LOQ Unit').withOption('width', '8%'),
        DTColumnBuilder.newColumn('Recovery').withTitle('Recovery (%)').withOption('width', '8%'),
        DTColumnBuilder.newColumn('Concentration').withTitle('Concentration Range Min').withOption('width', '8%'),
        DTColumnBuilder.newColumn('ConcentrationRangeMax').withTitle('Concentration Range Max').withOption('width', '8%'),
        DTColumnBuilder.newColumn('Average').withTitle('Average').withOption('width', '8%'),
        DTColumnBuilder.newColumn('Median').withTitle('Median').withOption('width', '8%'),
        DTColumnBuilder.newColumn('Unit').withTitle('Unit').withOption('width', '8%'),
        DTColumnBuilder.newColumn('RSD').withTitle('RSD (%)').withOption('width', '8%'),
        DTColumnBuilder.newColumn('SamplesBelow').withTitle('Percentage of Samples below LOD (%)').withOption('width', '8%'),
        DTColumnBuilder.newColumn('IndividualSampleAverageResults').withTitle('Individual Sample/Average Results').withOption('width', '8%'),
        DTColumnBuilder.newColumn('Referece').withTitle('Reference').withOption('width', '10%').withOption('white-space', 'nowrap'),
        //DTColumnBuilder.newColumn('Referece').withTitle('Referece').withOption('width', '8%').withOption('white-space', 'nowrap').notSortable().renderWith(function (data, type, row, meta) {

        //    var html = '';

        //    if (row.IsValueExists == 1) {
        //        html = html + '<a  href="' + row.Referece + '" target="_blank"  style="cursor:pointer;" uib-tooltip="Edit" >'
        //            + ' <i class="fa fa-external-link">R</i>'
        //            + '</a>';
        //    } else {
        //        html = html + "<span>" + row.Referece + "</span>";
        //    }

        //    return html;
        //}),
        DTColumnBuilder.newColumn('Id').withTitle('Action').withClass('not-export-column').withOption('width', '15%').withOption('white-space', 'nowrap').notSortable().renderWith(function (data, type, row, meta) {

            var html = '';

            if ($scope.UserRoles.Admin || !$scope.UserRoles.Read) {
                html = html + '<a ng-click="addEdit(' + row.Id + ',false)" style="cursor:pointer;" uib-tooltip="Edit" class="btn btn-secondry m-btn m-btn--icon m-btn--icon-only btn_edit_data">'
                    + ' <i class="fa fa-edit"></i>'
                    + '</a>';
            }

            html = html + '<a ng-click="addEdit(\'' + row.Id + '\',true)" style="cursor:pointer;" uib-tooltip="View" class="btn btn-secondry m-btn m-btn--icon m-btn--icon-only btn_edit_data">'
                + ' <i class="fa fa-eye" aria-hidden="true"></i>'
                + '</a>   ';

            if (row.IsValueExists == 1) {
                html = html + '<a  href="' + row.HrefReferece + '" target="_blank"  style="cursor:pointer;" uib-tooltip="Reference" >'
                    + ' <i class="fa fa-external-link">R</i>'
                    + '</a>';
            }

            return html;
        }),
    ];


    vm.dtColumnDefs = [
        
    ];

    $scope.getPagedDataAsync = function () {

        vm.dtDataInstance.DataTable.ajax.reload();
    };

    $scope.search = function () {
        $scope.getPagedDataAsync();
    };
    $scope.redirectUrl = function (url) {

        //window.location.href = url;
        $window.open(url);
    };
    $scope.getData = function () {

        var data = { Id: 0, name: "" };

        //dashboardService.loadData(data).then(function (response) {

        //    if (response.data.recordsTotal > 0) {
        //        $('#datadetails').DataTable().clear().destroy();
        //        $scope.dataList = response.data.data;
        //        $scope.itemsPerPage = response.data.recordsTotal;
        //        setTimeout(function () {
        //            $('#datadetails').DataTable({
        //                paging: true,
        //                //buttons: [
        //                //    'copyHtml5',
        //                //    'excelHtml5',
        //                //    'csvHtml5',
        //                //    'pdfHtml5'
        //                //],
        //                buttons: [
        //                    //{
        //                    //    extend: 'copy',
        //                    //    text: '<i class="fa fa-files-o" style="color:orange;">Copiar</i>',
        //                    //    titleAttr: 'Copiar',
        //                    //    title: 'Codex Minning',
        //                    //    exportOptions: {
        //                    //        columns: ":not(.not-export-column)"
        //                    //    },
        //                    //},
        //                    {
        //                        extend: 'excel',
        //                        text: '<i class="fa fa-file-excel-o" style="color:white;">Excel &nbsp;|</i>',
        //                        titleAttr: 'Excel',
        //                        title: 'Codex Minning',
        //                        exportOptions: {
        //                            columns: ":not(.not-export-column)"
        //                        },

        //                    },
        //                    {
        //                        extend: 'csv',
        //                        text: '<i class="fa fa-file-text-o" style="color:white;">CSV</i>',
        //                        titleAttr: 'CSV',
        //                        title: 'Codex Minning',
        //                        exportOptions: {
        //                            columns: ":not(.not-export-column)"
        //                        },
        //                    },
        //                    //{
        //                    //    extend: 'pdf',
        //                    //    text: '<i class="fa fa-file-pdf-o" style="color:brown;">PDF</i>',
        //                    //    titleAttr: 'PDF',
        //                    //    title: 'Codex Minning',
        //                    //    exportOptions: {
        //                    //        columns: ":not(.not-export-column)"
        //                    //    },
        //                    //},
        //                    //{
        //                    //    extend: 'print',
        //                    //    text: '<i class="fa fa-print" style="color:black;">Print</i>',
        //                    //    titleAttr: 'Print',
        //                    //    title: 'Codex Minning',
        //                    //    exportOptions: {
        //                    //        columns: ":not(.not-export-column)"
        //                    //    },

        //                    //}
        //                ],
        //                dom: 'Blfrtip'
        //            });


        //            $('#datadetails thead tr:nth-child(1) th').each(function () {

        //                var title = $('#datadetails thead th').eq($(this).index()).text();
        //                //$(this).html('&amp;lt;input type=&amp;quot;text&amp;quot; placeholder=&amp;quot;Search ' + title + '&amp;quot; /&amp;gt;');
        //                if (title != "Action/Preview")
        //                    $(this).html(title + '<input type="text" placeholder="' + title + ' Search" />');
        //                else
        //                    $(this).html(title);
        //            });

        //            // DataTable
        //            var table = $('#datadetails').DataTable();

        //            // Apply the search
        //            table.columns().eq(0).each(function (colIdx) {
        //                $('input', table.column(colIdx).header()).on('keyup change', function () {

        //                    table
        //                        .column(colIdx)
        //                        .search(this.value)
        //                        .draw();
        //                });
        //            });

        //            //$('#datadetails_paginate ul li a').each(function () {
        //            //   

        //            //    var data = this.add;
        //            //});

        //        }, 100);

        //    }

        //}, function (response) {
        //    toaster.pop('error', 'Failure', 'Failed to load data.');
        //});

    };
    //$scope.getData();

    $scope.ClearSearch = function () {

        vm.Year = "";
        vm.Country = "";
        vm.FoodCategory = "";
        vm.Contaminant = "";
        vm.FoodGroup = "";
        vm.FoodIdentifier = "";
        vm.FoodCode = "";
        vm.FoodOrigin = "";
        vm.FoodName = "";
        vm.FoodAnalyzed = "";
        vm.StudyObjective = "";
        vm.SamplingPlan = "";
        vm.AnalyticalTechnique = "";
        vm.QualityAssurance = "";
        vm.LOD = "";
        vm.LODUnit = "";
        vm.LOQ = "";
        vm.LOQUnit = "";
        vm.Recovery = "";
        vm.Concentration = "";
        vm.ConcentrationRangeMax = "";
        vm.Average = "";
        vm.Median = "";
        vm.Unit = "";
        vm.RSD = "";
        vm.SamplesBelow = "";
        vm.IndividualSampleAverageResults = "";
        vm.Referece = "";
    };
    $scope.uploadFile = function (files) {

        var fd = new FormData();
        //Take the first selected file
        for (i = 0; i < files.length; i++) {
            fd.append("importFile", files[i]);


            var selectedFile = files[i];
            var idxDot = selectedFile.name.lastIndexOf(".") + 1;
            var extFile = selectedFile.name.substr(idxDot, selectedFile.name.length).toLowerCase();
            //if (extFile == "jpg" || extFile == "jpeg" || extFile == "png" || extFile == "pdf") {
            //} else {
            //    alert("Only jpg/jpeg, png files are allowed!");
            //    return;
            //}
        }


        $http.post("/Dashboard/ImportFile", fd, {
            withCredentials: true,
            headers: { 'Content-Type': undefined },
            transformRequest: angular.identity
        }).then(function (response) {


        }, function (d) {
            alert("Invalid credentials! try again");
        });

    };

    $scope.addEdit = function (id, isEdit) {

        $scope.openAddPopUp(id, isEdit);
    };
    $scope.openAddPopUp = function (Id, isEdit) {
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: '/Dashboard/AddEdit',
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
                    obj.isEdit = isEdit;
                    return obj;
                }
            }
        });

        $scope.modelInstance = modalInstance;
        modalInstance.result.then(function (Id) {

            if (Id != undefined)
                //$scope.getData();
                $scope.getPagedDataAsync();
            return true;
        }, function () {
            return false;
        });
    };
    
    angular.element(document).ready(function () {
        // Setup - add a text input to each footer cell


        $('#datadetailsdiv tfoot th').each(function () {

            var title = $(this).text();
            if (title != "")
                $(this).html(title + '<input type="text" class="textbox" id="' + title + '" ng-model="vm.' + title + '" placeholder="Search ' + title + '" />');
                //$(this).html('<input type="text" class="textbox" id="' + title + '" ng-model="vm.' + title + '" placeholder="Search ' + title + '" />');
            else
                $(this).html('<input type="button" style="width:100px;" class="btn btn-warning btnClearAll" id="btnClearAll" value="clear" />');
            //$(this).html('<button type="button" class="btn btn-info margin_right btnClearAll"><i class="fa fa-sync"></i> <span>Clear</span></button>');
            //$(this).html("");

        });

        $('#datadetailsdiv thead').hide();

        console.log('document ready function, add search by column feature');




        /* earlier angularjs initialize datatable( must add "retrieve": true,) , but don't get a table handle, 
                                                           	
         later here, $('#id').DataTable(); will 1) if existing, will retrieve table handle.
         2) if not exsiting, will create a new table. */

        $('.btnClearAll').click(function () {

            // SEARCH TEXTBOX CONTROLS INSIDE A DIV AND CLEAR THE VALUES.
            //$('#datadetailsdiv tfoot th').find('input:text').each(function () {
            //    $('input:text[id=' + $(this).attr('id') + ']').val('');
            //}
            //);
            $scope.ClearSearch();
            // SEARCH TEXTBOX CONTROLS INSIDE THE TABLE AND CLEAR THE VALUES.
            $('#datadetailsdiv').find('input:text').each(function () {
                $(this).val('');
            }
            );
            $scope.Search = "";
            $scope.getPagedDataAsync();
        });

        var table = $('#datadetailsdiv').DataTable();
        // Apply the search
        table.columns().every(function () {
            var that = this;
            $('input', this.footer()).on('change', function () {
                
                var aa = this;
                $scope.Search = "";
                if (that.search() !== this.value) {
                    //that
                    //    .search(this.value)
                    //    .draw();
                    $scope.Search = this.value;

                    if ($(this).attr('id') == "Year") {
                        vm.Year = this.value;
                    }
                    if ($(this).attr('id') == "Country") {
                        vm.Country = this.value;
                    }
                    if ($(this).attr('id') == "Food Category") {
                        vm.FoodCategory = this.value;
                    }
                    if ($(this).attr('id') == "Contaminant") {
                        vm.Contaminant = this.value;
                    }
                    if ($(this).attr('id') == "Food Group") {
                        vm.FoodGroup = this.value;
                    }
                    if ($(this).attr('id') == "WHO Food Identifier") {
                        vm.FoodIdentifier = this.value;
                    }
                    if ($(this).attr('id') == "WHO Food Code") {
                        vm.FoodCode = this.value;
                    }
                    if ($(this).attr('id') == "Food Origin") {
                        vm.FoodOrigin = this.value;
                    }
                    if ($(this).attr('id') == "Food Name") {
                        vm.FoodName = this.value;
                    }
                    if ($(this).attr('id') == "State of the Food Analyzed") {
                        vm.FoodAnalyzed = this.value;
                    }
                    if ($(this).attr('id') == "Study Objective") {
                        vm.StudyObjective = this.value;
                    }
                    if ($(this).attr('id') == "Sampling Plan") {
                        vm.SamplingPlan = this.value;
                    }
                    if ($(this).attr('id') == "Analytical Technique") {
                        vm.AnalyticalTechnique = this.value;
                    }
                    if ($(this).attr('id') == "Analytical Quality Assurance") {
                        vm.QualityAssurance = this.value;
                    }
                    if ($(this).attr('id') == "LOD") {
                        vm.LOD = this.value;
                    }
                    if ($(this).attr('id') == "LOD Unit") {
                        vm.LODUnit = this.value;
                    }
                    if ($(this).attr('id') == "LOQ") {
                        vm.LOQ = this.value;
                    }
                    if ($(this).attr('id') == "LOQ Unit") {
                        vm.LOQUnit = this.value;
                    }
                    if ($(this).attr('id') == "Recovery (%)") {
                        vm.Recovery = this.value;
                    }
                    if ($(this).attr('id') == "Concentration Range Min") {
                        vm.Concentration = this.value;
                    }
                    if ($(this).attr('id') == "Concentration Range Max") {
                        vm.ConcentrationRangeMax = this.value;
                    }
                    if ($(this).attr('id') == "Average") {
                        vm.Average = this.value;
                    }
                    if ($(this).attr('id') == "Median") {
                        vm.Median = this.value;
                    }
                    if ($(this).attr('id') == "Unit") {
                        vm.Unit = this.value;
                    }
                    if ($(this).attr('id') == "RSD (%)") {
                        vm.RSD = this.value;
                    }
                    if ($(this).attr('id') == "Percentage of Samples below LOD (%)") {
                        vm.SamplesBelow = this.value;
                    }
                    if ($(this).attr('id') == "Individual Sample/Average Results") {
                        vm.IndividualSampleAverageResults = this.value;
                    }
                    if ($(this).attr('id') == "Reference") {
                        vm.Referece = this.value;
                    }

                } else {
                    if ($(this).attr('id') == "Year") {
                        vm.Year = "";
                    }
                    if ($(this).attr('id') == "Country") {
                        vm.Country = "";
                    }
                    if ($(this).attr('id') == "FoodCategory") {
                        vm.FoodCategory = "";
                    }
                    if ($(this).attr('id') == "Contaminant") {
                        vm.Contaminant = "";
                    }
                    if ($(this).attr('id') == "FoodGroup") {
                        vm.FoodGroup = "";
                    }
                    if ($(this).attr('id') == "FoodIdentifier") {
                        vm.FoodIdentifier = "";
                    }
                    if ($(this).attr('id') == "FoodCode") {
                        vm.FoodCode = "";
                    }
                    if ($(this).attr('id') == "FoodOrigin") {
                        vm.FoodOrigin = "";
                    }
                    if ($(this).attr('id') == "FoodAnalyzed") {
                        vm.FoodAnalyzed = "";
                    }
                    if ($(this).attr('id') == "StudyObjective") {
                        vm.StudyObjective = "";
                    }
                    if ($(this).attr('id') == "SamplingPlan") {
                        vm.SamplingPlan = "";
                    }
                    if ($(this).attr('id') == "AnalyticalTechnique") {
                        vm.AnalyticalTechnique = "";
                    }
                    if ($(this).attr('id') == "QualityAssurance") {
                        vm.QualityAssurance = "";
                    }
                    if ($(this).attr('id') == "LOD") {
                        vm.LOD = "";
                    }
                    if ($(this).attr('id') == "LODUnit") {
                        vm.LODUnit = "";
                    }
                    if ($(this).attr('id') == "LOQ") {
                        vm.LOQ = "";
                    }
                    if ($(this).attr('id') == "LOQUnit") {
                        vm.LOQUnit = "";
                    }
                    if ($(this).attr('id') == "Recovery") {
                        vm.Recovery = "";
                    }
                    if ($(this).attr('id') == "Concentration") {
                        vm.Concentration = "";
                    }
                    if ($(this).attr('id') == "Average") {
                        vm.Average = "";
                    }
                    if ($(this).attr('id') == "Median") {
                        vm.Median = "";
                    }
                    if ($(this).attr('id') == "RSD") {
                        vm.RSD = "";
                    }
                    if ($(this).attr('id') == "SamplesBelow") {
                        vm.SamplesBelow = "";
                    }
                    if ($(this).attr('id') == "Reference") {
                        vm.Referece = "";
                    }
                }
                $scope.getPagedDataAsync();
            });
        });


        // Dynamically hide the column

       /* var column = table.column(5);
        column.visible(false);*/

        $('a.toggle-vis').on('click', function (e) {
            e.preventDefault();

            // Get the column API object
            var column = table.column($(this).attr('data-column'));

            // Toggle the visibility
            column.visible(!column.visible());
        });

    }); // document ready	

    

}]);