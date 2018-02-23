window.onload=function(){
  let bt=document.getElementById('green');
  bt.onclick= function()
  {
    consolelog("reached here");
    let em=$('#em');
    let id=em.val();
    console.log(id);
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

                    let obj={'text':tr,'mail':id}
                    console.log(tr,id);

                    $.post({
                      'url':'/safe',
                      'data':obj,
                      'success':function(result){
                        console.log(result);
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
      let b=$('#emailtext');
      b.append(`<p> Dear Recipent</p>
        <p> The user has safely reached the loction: ${myloc} </p>
        <p>Thank you for your concern!</p>`);

        var tr="Dear Recipent, "+"The user has safely reached the location: "+ myloc+"  Thank you for your concern!";
        console.log(tr);
        call(tr);

    });

  }, function() {
    handleLocationError(true, infoWindow, map.getCenter());
  });

    }

  }
