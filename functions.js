function syncAjax(u){
        console.log(u);
        var obj=$.ajax(
          {url:u,
           async:false
           }
        );
        console.log(obj.responseText);
        return $.parseJSON(obj.responseText);
    
      }




$(document).ready(function(){
	$("#submit").click(function()
  {
    
    var name = $('#name').val();
    //console.log(name);
    var phonenumber = $('#phonenumber').val();
    var email= $('#email').val();
    var organisation = parseInt($('#organisation').val(), 10);
    
    var username= $('#username').val();
    var password = $('#password').val();
    // var poster=$('#image1').val();

    
   
    
     
      return syncAjax("http://50.63.128.135/~csashesi/class2015/susana-ndede/meeting/meetingPhone/meetingReq.php?cmd=1&name="+name+"&phonenumber="+phonenumber+
      "&email="+email+"&organisation="+organisation+"&username="+username+"&password="+password);
      
 });


$("#signUp").click(function()
  {
    
    var name = $('#eName').val();
    //console.log(name);
    var username = $('#eUsername').val();
    var password= $('#ePassword').val();
    
      return syncAjax("http://50.63.128.135/~csashesi/class2015/susana-ndede/meeting/meetingPhone/meetingReq.php?cmd=4&name="+name+"&username="+username+
      "&password="+password);
      
 });


	$("#list").click(function()
  {
    var u="http://50.63.128.135/~csashesi/class2015/susana-ndede/meeting/meetingPhone/meetingReq.php?cmd=2";
          
      var r=syncAjax(u);
    var i=0;
      for(i=0;i<r.event.length;i++){
        //$("#myList").text(r.person[i].username);
        
           
      
      var name=r.event[i].name;
      var venue=r.event[i].venue;
      var time=r.event[i].time;
      // var location=r.event[i].location;
                        
      
           var item ="Eventname:  "+name+"   "+"Venue:    "+venue+"          "+"Time:      "+time;
            // parent.appendChild(item);
     
         // var list = document.getElementById('listview');
            $('<li>'+item+'</li><br>').appendTo($('#listview'));
          }

     });
	 });



// function refresh(){
//   document.location.reload(true);
// }








jQuery(window).ready(function(){
            jQuery("#btnInit").click(initiate_watchlocation);
            jQuery("#btnStop").click(stop_watchlocation);
        });
 
        var watchProcess = null;
 
        function initiate_watchlocation() {
          if (watchProcess == null) {
        watchProcess = navigator.geolocation.watchPosition(handle_geolocation_query, handle_errors);
          }
        }
 
        function stop_watchlocation() {
          if (watchProcess != null)
            {
                navigator.geolocation.clearWatch(watchProcess);
                watchProcess = null;
          }
        }
 
        function handle_errors(error)
        {
            switch(error.code)
            {
                case error.PERMISSION_DENIED: alert("user did not share geolocation data");
                break;
 
                case error.POSITION_UNAVAILABLE: alert("could not detect current position");
                break;
 
                case error.TIMEOUT: alert("retrieving position timedout");
                break;
 
                default: alert("unknown error");
                break;
            }
        }
 
        function handle_geolocation_query(position) {
          var text = "Latitude: "  + position.coords.latitude  + "<br/>" +
               "Longitude: " + position.coords.longitude + "<br/>" +
               "Accuracy: "  + position.coords.accuracy  + "m<br/>" +
               "Time: " + new Date(position.timestamp);
            jQuery("#info").html(text);
         
            // var image_url = "http://maps.google.com/maps/api/staticmap?sensor=false&center=" + position.coords.latitude + ',' + position.coords.longitude +
            //                 "&zoom=14&size=300x400&markers=color:blue|label:S|" + position.coords.latitude + ',' + position.coords.longitude;
         
            // jQuery("#map").remove();
            // jQuery(document.body).append(
            //     jQuery(document.createElement("img")).attr("src", image_url).attr('id','map')
            // );
        }

  var geocoder;
 
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(successFunction, errorFunction);
} 
//Get the latitude and the longitude;
function successFunction(position) {
    var lat = position.coords.latitude;
    var lng = position.coords.longitude;
    codeLatLng(lat, lng)
}
 
function errorFunction(){
    alert("Geocoder failed");
}
 
  function initialize() {
    geocoder = new google.maps.Geocoder();
 
 
 
  }
 
  function codeLatLng(lat, lng) {
 
    var latlng = new google.maps.LatLng(lat, lng);
    geocoder.geocode({'latLng': latlng}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
      console.log(results)
        if (results[1]) {
         //formatted address
         $('#location').text(results[0].formatted_address)
        //find country name
             for (var i=0; i<results[0].address_components.length; i++) {
            for (var b=0;b<results[0].address_components[i].types.length;b++) {
 
            //there are different types that might hold a city admin_area_lvl_1 usually does in come cases looking for sublocality type will be more appropriate
                if (results[0].address_components[i].types[b] == "administrative_area_level_1") {
                    //this is the object you are looking for
                    city= results[0].address_components[i];
                    break;
                }
            }
        }
        //city data
        //$('#location').text(city.short_name + " " + city.long_name)
 
 
        } else {
          $('#location').text("No results found");
        }
      } else {
        $('#location').text("Geocoder failed due to: " + status);
      }
    });
  }


