window.onload=function(){
  console.log("green js is fucking working");
  function safe()
  {
    //fetchuser will be executed First
    var v=JSON.parse(str.getItem("user"));
    console.log(v);
    if(v==null){
      window.alert("Please sign in first");
      return;
    }
    console.log("fetchuser should be executed");
    console.log("reached here");
    navigator.geolocation.getCurrentPosition(function(position) {
    var pos = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    };
    console.log("my current lattiude and longitude",pos);

     var geocoder = new google.maps.Geocoder;
     function geocodeLatLng(geocoder, setloc) {
      var input = pos;
      var geocoder = new google.maps.Geocoder;
      console.log("value of input",input);

      geocoder.geocode({'location': input}, function(results, status) {
          if (status === 'OK') {
              if (results[0]) {
                console.log("inside call function");
                console.log(results[0].formatted_address);

                  setloc(results[0].formatted_address, function(tr){

                    let obj={'text':tr,'mail':v};
                    console.log(tr,"hduhdudh being sent to server", v);

                    $.post({
                      'url':'/safee',
                      'data':obj,
                      'success':function(result){
                      $('#fb').html(result);
                        window.location='index.html#fb';
                      }
                    })
                  });

              }
              else {
                window.alert('No results found');
              }
            }
        else {
          window.alert('Geocoder failed due to: ' + status);
        }
      });

    }

    geocodeLatLng(geocoder,function(txt,call){
      myloc=txt;
      console.log(myloc);
        var tr="Dear Recipent, "+"The user has safely reached the location: "+ myloc+"  Thank you for your concern!";
        console.log(tr);
        call(tr);

    });

  }, function() {
    handleLocationError(true, infoWindow, map.getCenter());
  });

} //safe function is over

    window.safe= safe;

  //  adduser();\

    let subbut=$('#sub_but');
    subbut.on('click', function(){
      console.log("reached inside adduser");
      let u=$('#user_email');
      console.log(u.val());
      let p=u.val();
      console.log(p);
      str.setItem("user",JSON.stringify(p));

    })

}
