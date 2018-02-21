window.onload=function(){
  $('.carousel.carousel-slider').carousel({fullWidth: true});
  $(".button-collapse").sideNav();
  $('.collapsible').collapsible();
    var str= window.localStorage;
    $('.dropdown-button').dropdown({
         constrainWidth: false, // Does not change width of dropdown to that of the activator

     belowOrigin: true, // Displays dropdown below the button

   }
 );

  let x=0;
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




function orange(){
  console.log("now we are testing orange mode");
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
                    'url':'/orangee',
                    'data':obj,
                    'success':function(result){
                    console.log(result);
                      $('#fb').append(result);

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


      var tr="Dear Recipent, "+"The user is currently at the location: "+ myloc+" And is currently looking for help. The user is sending out a call for help. Thank you for your concern!";
      console.log(tr);
      call(tr,  function(){
          let U=`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${pos.lat},${pos.lng}&radius=1000&type=police&key=AIzaSyChIRBXEQv5CqNtDHv3R0AkQt_zrvbvNU4`;
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
                let U=`https://maps.googleapis.com/maps/api/place/details/json?placeid=${c}&key=AIzaSyChIRBXEQv5CqNtDHv3R0AkQt_zrvbvNU4`
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
          U=`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${pos.lat},${pos.lng}&radius=1000&type=hospital&key=AIzaSyChIRBXEQv5CqNtDHv3R0AkQt_zrvbvNU4`;
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
                let U=`https://maps.googleapis.com/maps/api/place/details/json?placeid=${c}&key=AIzaSyChIRBXEQv5CqNtDHv3R0AkQt_zrvbvNU4`
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
          U=`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${pos.lat},${pos.lng}&radius=1000&type=car_repair&key=AIzaSyChIRBXEQv5CqNtDHv3R0AkQt_zrvbvNU4`;
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
               U=`https://maps.googleapis.com/maps/api/place/details/json?placeid=${c}&key=AIzaSyChIRBXEQv5CqNtDHv3R0AkQt_zrvbvNU4`
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
          U=`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${pos.lat},${pos.lng}&radius=1000&type=shopping&key=AIzaSyChIRBXEQv5CqNtDHv3R0AkQt_zrvbvNU4`;
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
               U=`https://maps.googleapis.com/maps/api/place/details/json?placeid=${c}&key=AIzaSyChIRBXEQv5CqNtDHv3R0AkQt_zrvbvNU4`
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
                    //  console.log(p);
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


// the below is only the index related work rest above need to be same


    }
    window.orange=orange;

    function fetchusercont(){
      let uu=JSON.parse(str.getItem("user"));
      $.post({
      'url':'/gethelpline',
        'data':{'ue':uu},
        success:function(err,st,data){
          console.log(data.responseJSON);
          $('#dropdown1').html(`<li class="ddc">${data.responseJSON.s1}</li><li class="ddc">${data.responseJSON.s2}</li>
    <li class="ddc"><a href="#su">CLick to Edit</a></li>`);
      }
      })
    }

  if(str.getItem("user"))  fetchusercont();





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
            let U=`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${pos.lat},${pos.lng}&radius=1000&type=police&key=AIzaSyChIRBXEQv5CqNtDHv3R0AkQt_zrvbvNU4`;
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
                  let U=`https://maps.googleapis.com/maps/api/place/details/json?placeid=${c}&key=AIzaSyChIRBXEQv5CqNtDHv3R0AkQt_zrvbvNU4`
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
            U=`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${pos.lat},${pos.lng}&radius=1000&type=hospital&key=AIzaSyChIRBXEQv5CqNtDHv3R0AkQt_zrvbvNU4`;
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
                  let U=`https://maps.googleapis.com/maps/api/place/details/json?placeid=${c}&key=AIzaSyChIRBXEQv5CqNtDHv3R0AkQt_zrvbvNU4`
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
            U=`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${pos.lat},${pos.lng}&radius=1000&type=car_repair&key=AIzaSyChIRBXEQv5CqNtDHv3R0AkQt_zrvbvNU4`;
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
                 U=`https://maps.googleapis.com/maps/api/place/details/json?placeid=${c}&key=AIzaSyChIRBXEQv5CqNtDHv3R0AkQt_zrvbvNU4`
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
            U=`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${pos.lat},${pos.lng}&radius=1000&type=shopping&key=AIzaSyChIRBXEQv5CqNtDHv3R0AkQt_zrvbvNU4`;
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
                 U=`https://maps.googleapis.com/maps/api/place/details/json?placeid=${c}&key=AIzaSyChIRBXEQv5CqNtDHv3R0AkQt_zrvbvNU4`
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
    window.red=red;
}
