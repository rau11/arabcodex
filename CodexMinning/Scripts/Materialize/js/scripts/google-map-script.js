//$(function() {
//      // Google Maps  
//      $('#map-canvas').addClass('loading');    
//      //var latlng = new google.maps.LatLng(40.6700, -73.9400); // Set your Lat. Log. New York 
//      var latlng = new google.maps.LatLng(25.276987, 55.296249); // Set your Lat. Log. Dubai
//      var settings = {
//          zoom: 10,
//          center: latlng,
//          mapTypeId: google.maps.MapTypeId.ROADMAP,
//          mapTypeControl: false,
//          scrollwheel: false,
//          draggable: true,
//          styles: [{"featureType":"landscape.natural","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#e0efef"}]},{"featureType":"poi","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"hue":"#1900ff"},{"color":"#c0e8e8"}]},{"featureType":"road","elementType":"geometry","stylers":[{"lightness":100},{"visibility":"simplified"}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"transit.line","elementType":"geometry","stylers":[{"visibility":"on"},{"lightness":700}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#7dcdcd"}]}],
//          mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU},
//          navigationControl: false,
//          navigationControlOptions: {style: google.maps.NavigationControlStyle.SMALL},            
//      };
//      var map = new google.maps.Map(document.getElementById("map-canvas"), settings);

//      google.maps.event.addDomListener(window, "resize", function() {
//          var center = map.getCenter();
//          google.maps.event.trigger(map, "resize");
//          map.setCenter(center);
//          $('#map-canvas').removeClass('loading');
//      });

//      var locations = [
//          ['Adil Al Tayib Al Badri', 55.22735595, 25.08062377, 1 , 'Al Barsha'],
//          ['Robert Jones', 55.53222656, 25.1776022, 2, 'Al Awir'],
//          ['Crisyl Hallare Casamina', 55.32485961, 25.27698715, 4, 'Deira'],
//          ['Sohail Ara  Ayyub', 55.41000366, 25.21985073, 2, 'Mirdif'],
//          ['Ajit Kumar', 55.3049469, 25.24718019, 3, 'Karama'],
//          ['Jerry Biddle', 55.27061462, 25.2161235, 4, 'Satwa'],
//          ['Mohammed  Fathi  Alnemer', 55.21568298, 25.15771546, 5, 'Umm Suqeim'],
//          ['Abdalla Hassan Ahmed', 55.30563354, 25.21363863, 3, 'Bur Dubai'],
//          ['Nurul Alam', 55.36331177, 25.1943791, 2, 'Ras al Khor'],
//          ['Tahani Hussain Ahmed', 55.13854979, 25.07627037, 1, 'Dubai Marina']
//      ];

//      var  contentString, markerImage, markerPos, marker;
//      var infowindow = new google.maps.InfoWindow();


//      for (var i = 0; i < locations.length; i++) {
//          contentString =
//              '<div id="info-window">' +
//          '<p><span class="task-cat white red-text">' + locations[i][0] + '</span><br /> <span class="task-cat cyan">' + 1/*locations[i][3]*/ + ' Inspections Assigned</span><br /><span class="task-cat deep-orange">' + locations[i][4] + '</span></p>' +
//              '</div>'; 
//          var markerImage = new google.maps.MarkerImage('../../DMInspection/Content/materialize/images/icon/map-marker.png',
//              new google.maps.Size(36, 62),// Width and height of the marker
//              new google.maps.Point(0, 0),
//              new google.maps.Point(18, 52)// Position of the marker 
//          ); 

//          markerPos = new google.maps.LatLng(locations[i][2], locations[i][1]);

//          marker = new google.maps.Marker({
//              position: markerPos,
//              map: map,
//              icon: markerImage,
//              title: "Today Inspections",
//              zIndex: 3
//          });
//          marker["content"] = contentString;

//          //google.maps.event.addListener(marker, 'click', function () {
//          //    infowindow.open(map, marker);
//          //});

//          google.maps.event.addListener(marker, 'click', (function (marker, i) {
//              return function () {
//                  infowindow.setContent(marker["content"]);
//                  infowindow.open(map, marker);
//              }
//          })(marker, i));
//      }


//      //var contentString =
//      //    '<div id="info-window">'+
//      //    '<p>18 McLuice Road, Vellyon Hills,<br /> New York, NY 10010<br /><a href="https://plus.google.com/102896039836143247306/about?gl=za&hl=en" target="_blank">Get directions</a></p>'+
//      //    '</div>';
//      //var infowindow = new google.maps.InfoWindow({
//      //    content: contentString
//      //}); 
//      //var companyImage = new google.maps.MarkerImage('../../Content/materialize/images/icon/map-marker.png',
//      //    new google.maps.Size(36,62),// Width and height of the marker
//      //    new google.maps.Point(0,0),
//      //    new google.maps.Point(18,52)// Position of the marker 
//      //);

//      //var companyPos = new google.maps.LatLng(40.6700, -73.9400);

//      //var companyMarker = new google.maps.Marker({
//      //    position: companyPos,
//      //    map: map,
//      //    icon: companyImage,
//      //    title:"Shapeshift Interactive",
//      //    zIndex: 3});

//      //google.maps.event.addListener(companyMarker, 'click', function() {
//      //    infowindow.open(map,companyMarker); 
//      //});
//    });



$(function () {
    $.ajax({
        //url: '/DMInspection/api/businessrecord/GetBusinessLatLong',
        url: '/DMInspection/api/inspectionrecord/getScheduleInspectionsLatLong',
        type: 'GET',
        dataType: "json",
        contentType: "application/json; charset=utf-8", 
        success: function (data) {
            // Google Maps  
            $('#map-canvas').addClass('loading');
            //var latlng = new google.maps.LatLng(40.6700, -73.9400); // Set your Lat. Log. New York 
            var latlng = new google.maps.LatLng(25.276987, 55.296249); // Set your Lat. Log. Dubai
            var settings = {
                zoom: 10,
                center: latlng,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                mapTypeControl: false,
                scrollwheel: false,
                draggable: true,
                styles: [{ "featureType": "landscape.natural", "elementType": "geometry.fill", "stylers": [{ "visibility": "on" }, { "color": "#e0efef" }] }, { "featureType": "poi", "elementType": "geometry.fill", "stylers": [{ "visibility": "on" }, { "hue": "#1900ff" }, { "color": "#c0e8e8" }] }, { "featureType": "road", "elementType": "geometry", "stylers": [{ "lightness": 100 }, { "visibility": "simplified" }] }, { "featureType": "road", "elementType": "labels", "stylers": [{ "visibility": "off" }] }, { "featureType": "transit.line", "elementType": "geometry", "stylers": [{ "visibility": "on" }, { "lightness": 700 }] }, { "featureType": "water", "elementType": "all", "stylers": [{ "color": "#7dcdcd" }] }],
                mapTypeControlOptions: { style: google.maps.MapTypeControlStyle.DROPDOWN_MENU },
                navigationControl: false,
                navigationControlOptions: { style: google.maps.NavigationControlStyle.SMALL },
            };
            var map = new google.maps.Map(document.getElementById("map-canvas"), settings);

            google.maps.event.addDomListener(window, "resize", function () {
                var center = map.getCenter();
                google.maps.event.trigger(map, "resize");
                map.setCenter(center);
                $('#map-canvas').removeClass('loading');
            });

            var locations = data;

            var contentString, markerImage, markerPos, marker;
            var infowindow = new google.maps.InfoWindow();


            for (var i = 0; i < locations.length; i++) {
                contentString =
                    '<div id="info-window">' +
                '<p><span class="task-cat white red-text">' + locations[i].BusinessName + '[' + locations[i].DEDLicenceNo + ']' + '</span><br /> <span class="task-cat white black-text "> DM Activity: ' + locations[i].DMActivityName + '</span><br /><span class="task-cat white black-text "> Type: ' + locations[i].InspectionTypeName + '</span><br /><span class="task-cat white black-text "> Inspector Assigned: ' + locations[i].InspectorName + '</span><br /><span class="task-cat white black-text "> Scheduled: ' + locations[i].ScheduleDateString +  '</span></p>' +
                    '</div>';
                var markerImage = new google.maps.MarkerImage('../../DMInspection/Content/materialize/images/icon/map-marker.png',
                    new google.maps.Size(36, 62),// Width and height of the marker
                    new google.maps.Point(0, 0),
                    new google.maps.Point(18, 52)// Position of the marker 
                );

                markerPos = new google.maps.LatLng(locations[i].Lat, locations[i].Long);

                marker = new google.maps.Marker({
                    position: markerPos,
                    map: map,
                    icon: markerImage,
                    title: "Inspections",
                    zIndex: 3
                });
                marker["content"] = contentString;
                google.maps.event.addListener(marker, 'click', (function (marker, i) {
                    return function () {
                        infowindow.setContent(marker["content"]);
                        infowindow.open(map, marker);
                    }
                })(marker, i));
            } 
        },
        error: function (data) {
            
        }
    });  
});