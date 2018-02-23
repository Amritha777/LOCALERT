window.onload= function(){
  console.log("now we are testing orange mode");
  var place=[];  var add=[];
  navigator.geolocation.getCurrentPosition(function(position) {
  var pos = {
    lat: position.coords.latitude,
    lng: position.coords.longitude
  };
  console.log("my current lattiude and longitude",pos);
  let U=`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${pos.lat},${pos.lng}&radius=1000&type=police&key=YOUR_API_KEY`;
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
       U=`https://maps.googleapis.com/maps/api/place/details/json?placeid=${c}&key=YOUR_PI_KEY`
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
  console.log(place,add);
})
}

//p
//
