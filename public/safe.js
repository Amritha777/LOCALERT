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


// // using SendGrid's v3 Node.js Library
// // https://github.com/sendgrid/sendgrid-nodejs
// const sgMail = require('@sendgrid/mail');
// sgMail.setApiKey(process.env.SENDGRID_API_KEY);
// const msg = {
//   to: 'test@example.com',
//   from: 'test@example.com',
//   subject: 'Sending with SendGrid is Fun',
//   text: 'and easy to do anywhere, even with Node.js',
//   html: '<strong>and easy to do anywhere, even with Node.js</strong>',
// };
// sgMail.send(msg);
//
//
// echo "export SENDGRID_API_KEY='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'" > sendgrid.env
// echo "sendgrid.env" >> .gitignore
// source ./sendgrid.env
