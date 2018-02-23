function red(){
  console.log("now we are testing red mode");
  var place=[];  var add=[];
  navigator.geolocation.getCurrentPosition(function(position) {
  var pos = {
    lat: position.coords.latitude,
    lng: position.coords.longitude
  };
  console.log("my current lattiude and longitude",pos);
  var v=JSON.parse(str.getItem("user"));
  console.log(v);
  if(v==null){
    window.alert("Please sign in first");
    return;
  }
  console.log("fetchuser should be executed");
  console.log("reached here");


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

                setloc(results[0].formatted_address, function(tr,placesuggest){
                  placesuggest();

                  let obj={'text':tr,'mail':v};
                  console.log(tr,"location and text being sent to serer", v);

                  $.post({
                    'url':'/rede',
                    'data':obj,
                    'success':function(result){
                    console.log(result);
                      $('#fb').append(result);

                    }
                  })

                  $.post({
                    'url':'/redsafety',
                    'data':obj,
                    'success':function(err, data){
                      console.log(data);
                    }
                  })
                }
              );

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


      var tr="Dear Recipent, "+"THE USER IS IN DANGER AT LOCATION: "+ myloc+" AND IS CALLING OUT FOR HELP. PLEASE SEND HELP! THANKYOU FOR YOUR CONCERN!";
      console.log(tr);
      call(tr,  function(){
          let U=`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${pos.lat},${pos.lng}&radius=1000&type=police&key=YOUR_API_KEY`;
          $.get({
            url:U,
            success:function(err,status,d){
              //console.log(d);
              //console.log(d.responseJSON.results);
              for(i=0;i<d.responseJSON.results.length;i++)
              {
                if(i==2)
                {
                  break;
                }
              //  console.log("NAME:",d.responseJSON.results[i].name);
              //  console.log("ADDRESS:",d.responseJSON.results[i].vicinity);
                let c=d.responseJSON.results[i].place_id;
                let U=`https://maps.googleapis.com/maps/api/place/details/json?placeid=${c}&key=YOUR_API_KEY`
                $.get({
                  url:U,
                  success:function(err,status,data)
                  {
                  //  console.log(data);
                  //  console.log(data.responseJSON.result.name,   data.responseJSON.result.formatted_address,  data.responseJSON.result.formatted_phone_no);
                    place.push(data.responseJSON.result.name);
                    add.push(data.responseJSON.result.formatted_address);
                  }

              })
            }
            }

          })
          U=`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${pos.lat},${pos.lng}&radius=1000&type=hospital&key=YOUR_API_KEY`;
          $.get({
            url:U,
            success:function(err,status,d){
              //console.log(d);
              //console.log(d.responseJSON.results);
              for(i=0;i<d.responseJSON.results.length;i++)
              {
                if(i==3)
                {
                  break;
                }
              //  console.log("NAME:",d.responseJSON.results[i].name);
              //  console.log("ADDRESS:",d.responseJSON.results[i].vicinity);
                let c=d.responseJSON.results[i].place_id;
                let U=`https://maps.googleapis.com/maps/api/place/details/json?placeid=${c}&key=YOUR_API_KEY`
                $.get({
                  url:U,
                  success:function(err,status,data)
                  {
                  //  console.log(data);
                  //  console.log(data.responseJSON.result.name,   data.responseJSON.result.formatted_address,  data.responseJSON.result.formatted_phone_no);
                    place.push(data.responseJSON.result.name);
                    add.push(data.responseJSON.result.formatted_address);
                  }

              })
            }
            }

          })
          U=`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${pos.lat},${pos.lng}&radius=1000&type=car_repair&key=YOUR_API_KEY`;
          $.get({
            url:U,
            success:function(err,status,d){
              //console.log(d);
              //console.log(d.responseJSON.results);
              for(i=0;i<d.responseJSON.results.length;i++)
              {
                if(i==2)
                {
                  break;
                }
              //  console.log("NAME:",d.responseJSON.results[i].name);
              //  console.log("ADDRESS:",d.responseJSON.results[i].vicinity);
                let c=d.responseJSON.results[i].place_id;
               U=`https://maps.googleapis.com/maps/api/place/details/json?placeid=${c}&key=YUR_API_KEY`
                $.get({
                  url:U,
                  success:function(err,status,data)
                  {
                  //  console.log(data);
                  //  console.log(data.responseJSON.result.name,   data.responseJSON.result.formatted_address,  data.responseJSON.result.formatted_phone_no);
                    place.push(data.responseJSON.result.name);
                    add.push(data.responseJSON.result.formatted_address);
                  }

              })
            }
            }

          })
          U=`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${pos.lat},${pos.lng}&radius=1000&type=shopping&key=YOUR_API_KEY`;
          $.get({
            url:U,
            success:function(err,status,d){
              //console.log(d);
              //console.log(d.responseJSON.results);
              for(i=0;i<d.responseJSON.results.length;i++)
              {
                if(i==3)
                {
                  break;
                }
              //  console.log("NAME:",d.responseJSON.results[i].name);
              //  console.log("ADDRESS:",d.responseJSON.results[i].vicinity);
                let c=d.responseJSON.results[i].place_id;
               U=`https://maps.googleapis.com/maps/api/place/details/json?placeid=${c}&key=YOUR_API_KEY`
                $.get({
                  url:U,
                  success:function(err,status,data)
                  {
                  //  console.log(data);
                  //  console.log(data.responseJSON.result.name,   data.responseJSON.result.formatted_address,  data.responseJSON.result.formatted_phone_no);
                    place.push(data.responseJSON.result.name);
                    add.push(data.responseJSON.result.formatted_address);
                    x++;
                    if(x>=3){
                      console.log(place,add);
                      $('#fb').append('<ul>Nearby Safe Locations:');
                    //  let p="";
                    console.log("apending happening now");
                      for(i=0;i<place.length;i++)
                      {
                          $('#fb').append(`<li>${place[i]}-${add[i]}</li><br>`);
                      }
                    $('#fb').append(`</ul>`);
                     console.log("appending should happen");
                      //$('#fb').append(p);
                      window.location='index.html#fb';

                    }

                  }

                  })
                }
                }

              })

        });


  });

}, function() {
  handleLocationError(true, infoWindow, map.getCenter());
});




}
